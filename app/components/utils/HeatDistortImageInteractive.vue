<template>
  <div
    ref="rootEl"
    class="relative overflow-hidden"
  >
    <canvas
      ref="canvasEl"
      class="absolute inset-0 size-full"
    />

    <!-- Fallback / SEO: keep an <img> in the DOM (hidden visually) -->
    <img
      v-if="resolvedSrc"
      :src="resolvedSrc"
      :alt="alt"
      class="
        pointer-events-none absolute inset-0 size-full object-cover opacity-0
      "
      decoding="async"
      loading="lazy"
    >
  </div>
</template>

<script setup lang="ts">
import type { Texture } from 'three'
import {
  Camera,
  Clock,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'

type Props = {
  src: string
  alt?: string
  /**
   * When false, pauses the animation loop (renders a single static frame).
   */
  play?: boolean
  /**
   * 0..1 — baseline heat haze strength (when pointer is idle).
   */
  intensity?: number
  /**
   * 0..1 — baseline blur strength.
   */
  blur?: number
  /**
   * 0..1 — how much pointer movement boosts the effect.
   */
  pointerBoost?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  play: true,
  intensity: 0.35,
  blur: 0.25,
  pointerBoost: 0.8,
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
uniform vec2 uPointer;          // 0..1 in container space
uniform float uPointerStrength; // 0..1

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

  // pointer field (strongest near pointer)
  vec2 p = coverUv(uPointer, uResolution, uTextureSize);
  float d = distance(uv, p);
  float pointerField = smoothstep(0.55, 0.0, d) * uPointerStrength;

  // animated heat haze displacement, sped up by pointer movement
  float t = uTime * mix(0.18, 0.9, pointerField);
  float n1 = noise(uv * 6.0 + vec2(t, -t));
  float n2 = noise(uv * 18.0 + vec2(-t * 1.5, t * 1.2));

  float strength = uIntensity + 0.9 * pointerField;
  vec2 disp = vec2(n1 - 0.5, n2 - 0.5);
  disp *= (0.003 + 0.014 * strength);

  // add a radial push/pull around pointer for interactivity
  vec2 dir = normalize(uv - p + 1e-5);
  disp += dir * (0.012 * pointerField) * (0.5 - d);

  vec2 uv2 = uv + disp;
  vec2 texel = 1.0 / max(uTextureSize, vec2(1.0));

  vec4 col = blur9(uTexture, uv2, texel, uBlur + 0.35 * pointerField);

  // Prevent dark fringes / black background when source has transparency.
  if (col.a > 0.0) {
    col.rgb /= col.a;
  }

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
  uPointer: { value: Vector2 }
  uPointerStrength: { value: number }
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
  time: number
} | null>(null)

const pointer = shallowRef<{
  x: number
  y: number
}>({
  x: 0.5,
  y: 0.5,
})
const pointerStrength = shallowRef(0)
const lastPointerAt = shallowRef<number | null>(null)
const lastPointer = shallowRef<{
  x: number
  y: number
} | null>(null)

const getSize = () => {
  const el = rootEl.value
  if (!el) return null
  const { width, height } = el.getBoundingClientRect()
  const w = Math.max(1, Math.floor(width))
  const h = Math.max(1, Math.floor(height))
  return {
    w,
    h,
  }
}

const setRendererSize = (next: {
  w: number
  h: number
}) => {
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

const renderOnce = () => {
  const current = state.value
  if (!current) return

  // decay pointer strength smoothly
  const decay = isReducedMotion.value ? 0.22 : 0.08
  pointerStrength.value = Math.max(0, pointerStrength.value - decay)

  const baseIntensity = clamp01(props.intensity)
  const baseBlur = clamp01(props.blur)
  const boost = clamp01(props.pointerBoost)

  const boostedStrength = clamp01(pointerStrength.value * boost)
  current.uniforms.uPointerStrength.value = boostedStrength
  current.uniforms.uPointer.value.set(pointer.value.x, pointer.value.y)
  current.uniforms.uIntensity.value = baseIntensity
  current.uniforms.uBlur.value = baseBlur

  // advance time continuously while playing; pointer movement boosts speed
  if (!isReducedMotion.value) {
    const dt = current.clock.getDelta()
    const baseSpeed = 0.22
    const boostedSpeed = 1.25 * boostedStrength
    current.time = current.time + dt * (baseSpeed + boostedSpeed)
  }
  current.uniforms.uTime.value = current.time

  current.renderer.render(current.scene, current.camera)
}

const ensureRaf = () => {
  const current = state.value
  if (!current) return
  if (!props.play) return
  if (current.rafId) return

  const loop = () => {
    const s = state.value
    if (!s) return
    if (!props.play) {
      s.rafId = 0
      return
    }

    renderOnce()
    s.rafId = requestAnimationFrame(loop)
  }

  current.rafId = requestAnimationFrame(loop)
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
    premultipliedAlpha: false,
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setClearAlpha(0)

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
    uPointer: { value: new Vector2(pointer.value.x, pointer.value.y) },
    uPointerStrength: { value: 0 },
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
    time: 0,
  }
  state.value = s

  const img = texture.image as HTMLImageElement | undefined
  if (img?.naturalWidth && img.naturalHeight) {
    uniforms.uTextureSize.value.set(img.naturalWidth, img.naturalHeight)
  }

  const size = getSize()
  if (size) setRendererSize(size)

  // render at least once, then start the loop if enabled
  renderOnce()
  ensureRaf()
}

const updatePointerFromEvent = (event: PointerEvent) => {
  const el = rootEl.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const x = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5
  const y = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5

  const next = {
    x: clamp01(x),
    y: clamp01(y),
  }

  const now = performance.now()
  const prev = lastPointer.value
  const prevAt = lastPointerAt.value

  pointer.value = next
  lastPointer.value = next
  lastPointerAt.value = now

  if (!prev || !prevAt) {
    pointerStrength.value = clamp01(pointerStrength.value + 0.35)
    return
  }

  const dt = Math.max(8, now - prevAt)
  const dx = next.x - prev.x
  const dy = next.y - prev.y
  const speed = Math.sqrt(dx * dx + dy * dy) / dt

  // scale tuned for typical pointer rates
  const boost = clamp01(speed * 90)
  pointerStrength.value = clamp01(pointerStrength.value + 0.25 + 0.75 * boost)

  // if paused, still allow a single "boosted" render
  if (!props.play) renderOnce()
}

const onPointerLeave = () => {
  lastPointer.value = null
  lastPointerAt.value = null
}

onMounted(() => {
  void start()
})

useResizeObserver(rootEl, () => {
  const size = getSize()
  if (size) setRendererSize(size)
})

useEventListener(rootEl, 'pointermove', updatePointerFromEvent, { passive: true })
useEventListener(rootEl, 'pointerenter', updatePointerFromEvent, { passive: true })
useEventListener(rootEl, 'pointerleave', onPointerLeave, { passive: true })

watch(resolvedSrc, () => {
  dispose()
  void start()
})

watch(
  () => props.play,
  (next) => {
    const s = state.value
    if (!s) return

    if (!next) {
      cancelAnimationFrame(s.rafId)
      s.rafId = 0
      renderOnce()
      return
    }

    // reset delta accumulation so resume doesn't "jump"
    s.clock.getDelta()
    ensureRaf()
  },
)

onBeforeUnmount(() => {
  dispose()
})
</script>
