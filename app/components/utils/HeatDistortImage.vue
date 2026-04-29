<template>
  <div
    ref="rootEl"
    class="relative overflow-hidden"
  >
    <canvas
      ref="canvasEl"
      class="absolute inset-0 h-full w-full"
    />

    <!-- Fallback / SEO: keep an <img> in the DOM (hidden visually) -->
    <img
      v-if="resolvedSrc"
      :src="resolvedSrc"
      :alt="alt"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
      decoding="async"
      loading="lazy"
    >
  </div>
</template>

<script setup lang="ts">
import {
  Camera,
  Clock,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'

type Props = {
  src: string
  alt?: string
  /**
   * 0..1 — higher values increase heat haze strength.
   */
  intensity?: number
  /**
   * 0..1 — higher values increase blur strength.
   */
  blur?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  intensity: 0.35,
  blur: 0.25,
})

const resolvedSrc = computed(() => props.src)

const rootEl = shallowRef<HTMLDivElement | null>(null)
const canvasEl = shallowRef<HTMLCanvasElement | null>(null)

const prefersReducedMotion = usePreferredReducedMotion()
const isReducedMotion = computed(() => prefersReducedMotion.value === 'reduce')

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Heat distortion inspired by https://github.com/SaijoGeorge/HeatDistortionEffect
const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform float uTime;
uniform float uIntensity;
uniform float uBlur;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec2 coverUv(vec2 uv, vec2 container, vec2 tex) {
  float containerRatio = container.x / container.y;
  float texRatio = tex.x / tex.y;

  vec2 scale = vec2(1.0);
  if (texRatio > containerRatio) {
    scale.x = texRatio / containerRatio;
  } else {
    scale.y = containerRatio / texRatio;
  }

  vec2 centered = uv - 0.5;
  centered /= scale;
  return centered + 0.5;
}

vec4 blur9(sampler2D tex, vec2 uv, vec2 texel, float strength) {
  vec2 o = texel * (1.0 + 3.0 * strength);

  vec4 c = texture2D(tex, uv) * 4.0;
  c += texture2D(tex, uv + vec2(-o.x, 0.0));
  c += texture2D(tex, uv + vec2(o.x, 0.0));
  c += texture2D(tex, uv + vec2(0.0, -o.y));
  c += texture2D(tex, uv + vec2(0.0, o.y));
  c += texture2D(tex, uv + vec2(-o.x, -o.y));
  c += texture2D(tex, uv + vec2(o.x, -o.y));
  c += texture2D(tex, uv + vec2(-o.x, o.y));
  c += texture2D(tex, uv + vec2(o.x, o.y));
  return c / 12.0;
}

void main() {
  vec2 uv = coverUv(vUv, uResolution, uTextureSize);

  // animated heat haze displacement
  float t = uTime * 0.35;
  float n1 = noise(uv * 6.0 + vec2(t, -t));
  float n2 = noise(uv * 18.0 + vec2(-t * 1.5, t * 1.2));

  float strength = uIntensity;
  vec2 disp = vec2(n1 - 0.5, n2 - 0.5);
  disp *= (0.004 + 0.01 * strength);

  vec2 uv2 = uv + disp;
  vec2 texel = 1.0 / max(uTextureSize, vec2(1.0));

  vec4 col = blur9(uTexture, uv2, texel, uBlur);
  gl_FragColor = col;
}
`

type HeatUniforms = {
  uTexture: { value: Texture }
  uResolution: { value: Vector2 }
  uTextureSize: { value: Vector2 }
  uTime: { value: number }
  uIntensity: { value: number }
  uBlur: { value: number }
}

const state = shallowRef<{
  renderer: WebGLRenderer
  scene: Scene
  camera: Camera
  mesh: Mesh
  material: ShaderMaterial
  uniforms: HeatUniforms
  geometry: PlaneGeometry
  texture: Texture
  clock: Clock
  rafId: number
} | null>(null)

const getSize = () => {
  const el = rootEl.value
  if (!el) return null
  const { width, height } = el.getBoundingClientRect()
  const w = Math.max(1, Math.floor(width))
  const h = Math.max(1, Math.floor(height))
  return { w, h }
}

const setRendererSize = (next: { w: number; h: number }) => {
  const s = state.value
  if (!s) return

  const dpr = Math.min(2, window.devicePixelRatio || 1)
  s.renderer.setPixelRatio(dpr)
  s.renderer.setSize(next.w, next.h, false)
  s.uniforms.uResolution.value.set(next.w, next.h)
}

const dispose = () => {
  const s = state.value
  if (!s) return

  cancelAnimationFrame(s.rafId)
  s.texture.dispose()
  s.geometry.dispose()
  s.material.dispose()
  s.renderer.dispose()
  state.value = null
}

const start = async () => {
  if (!import.meta.client) return
  if (!rootEl.value || !canvasEl.value) return
  if (!resolvedSrc.value) return

  const canvas = canvasEl.value
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new Camera()
  camera.position.z = 1

  const loader = new TextureLoader()
  const texture = await new Promise<Texture>((resolve, reject) => {
    loader.load(
      resolvedSrc.value,
      (t: Texture) => resolve(t),
      undefined,
      (err: unknown) => {
        reject(err instanceof Error ? err : new Error('Failed to load texture'))
      },
    )
  })
  texture.colorSpace = 'srgb'

  const geometry = new PlaneGeometry(2, 2, 1, 1)

  const uniforms: HeatUniforms = {
    uTexture: { value: texture },
    uResolution: { value: new Vector2(1, 1) },
    uTextureSize: { value: new Vector2(1, 1) },
    uTime: { value: 0 },
    uIntensity: { value: clamp01(props.intensity) },
    uBlur: { value: clamp01(props.blur) },
  }

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms,
  })

  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const clock = new Clock()
  const s = {
    renderer,
    scene,
    camera,
    mesh,
    material,
    uniforms,
    geometry,
    texture,
    clock,
    rafId: 0,
  }
  state.value = s

  const img = texture.image as HTMLImageElement | undefined
  if (img?.naturalWidth && img.naturalHeight) {
    uniforms.uTextureSize.value.set(img.naturalWidth, img.naturalHeight)
  }

  const size = getSize()
  if (size) setRendererSize(size)

  const renderFrame = () => {
    const current = state.value
    if (!current) return

    current.uniforms.uIntensity.value = clamp01(props.intensity)
    current.uniforms.uBlur.value = clamp01(props.blur)
    current.uniforms.uTime.value = isReducedMotion.value ? 0 : current.clock.getElapsedTime()

    current.renderer.render(current.scene, current.camera)
    current.rafId = requestAnimationFrame(renderFrame)
  }

  renderFrame()
}

onMounted(() => {
  void start()
})

useResizeObserver(rootEl, () => {
  const size = getSize()
  if (size) setRendererSize(size)
})

watch(resolvedSrc, () => {
  dispose()
  void start()
})

onBeforeUnmount(() => {
  dispose()
})
</script>
