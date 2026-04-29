<!-- eslint-disable better-tailwindcss/no-unregistered-classes -->
<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
  <ClientOnly>
    <div
      ref="breakyEl"
      :style="ancorStyle"
      :class="isDragging ? `transition-none` : `transition-all`"
      aria-label="hidden"
      class="
        group fixed z-50 flex w-max cursor-grab gap-0 rounded-full bg-[#111]
        px-3 py-1.5 text-[0.8rem] text-[#F5F5F5] duration-300 select-none
        open:gap-2
      "
      :open="isOpen || isDragging || isHovering ? true : undefined"
      @mouseenter="isOpen = true, isHovering = true"
      @mouseleave="isHovering = false"
      @focusin="isOpen = true, isHovering = true"
      @focusout="isHovering = false"
    >
      <span
        class="
          w-0 overflow-hidden opacity-60 transition-all duration-300
          group-open:inline group-open:w-20 group-open:max-w-max
        "
      >
        Breakpoints:
      </span>
      <span
        class="
          inline
          group-open:inline
          xs:hidden!
        "
      >
        -
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          xs:max-sm:min-w-max xs:max-sm:opacity-100
        "
      >
        xs
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          sm:max-md:min-w-max sm:max-md:opacity-100
        "
      >
        sm
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          md:max-lg:min-w-max md:max-lg:opacity-100
        "
      >
        md
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          lg:max-xl:min-w-max lg:max-xl:opacity-100
        "
      >
        lg
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          xl:max-2xl:min-w-max xl:max-2xl:opacity-100
        "
      >
        xl
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          2xl:max-3xl:min-w-max 2xl:max-3xl:opacity-100
        "
      >
        2xl
      </span>
      <span
        class="
          w-0 overflow-hidden opacity-50 transition-all duration-300
          group-open:inline group-open:w-5 group-open:max-w-max
          3xl:min-w-max 3xl:opacity-100
        "
      >
        3xl
      </span>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useScreenSafeArea, useDraggable, refAutoReset, useWindowSize, useStorage } from '@vueuse/core'

const safeArea = useScreenSafeArea()
const breakyEl = useTemplateRef<HTMLDivElement>('breakyEl')
const { width: windowWidth, height: windowHeight } = useWindowSize()
const isHovering = ref(false)
const isOpen = refAutoReset(false, 2000)
const { x, y, isDragging } = useDraggable(breakyEl)

const store = useStorage('debug-breaky', {
  horizontalAnchor: 'right',
  verticalAnchor: 'bottom',
})

// Distance from the edge of the safe area
const padding = 8
const ancorStyle = reactive({
  left: padding as number | string,
  top: padding as number | string,
  right: padding as number | string,
  bottom: padding as number | string,
})

watch([x, y], () => {
  if (y.value < windowHeight.value / 2) store.value.verticalAnchor = 'top'
  else store.value.verticalAnchor = 'bottom'

  if (x.value < windowWidth.value / 2) store.value.horizontalAnchor = 'left'
  else store.value.horizontalAnchor = 'right'
})

const panelMargins = reactive({
  left: toNumber(safeArea.left.value) + padding,
  top: toNumber(safeArea.top.value) + padding,
  right: toNumber(safeArea.right.value) + padding,
  bottom: toNumber(safeArea.bottom.value) + padding,
})

watchEffect(() => {
  if (isDragging.value) {
    ancorStyle.left = x.value + 'px'
    ancorStyle.top = y.value + 'px'
    ancorStyle.right = 'unset'
    ancorStyle.bottom = 'unset'
  } else {
    ancorStyle.left = store.value.horizontalAnchor === 'left' ? `${panelMargins.left}px` : 'unset'
    ancorStyle.top = store.value.verticalAnchor === 'top' ? `${panelMargins.top}px` : 'unset'
    ancorStyle.right = store.value.horizontalAnchor === 'right' ? `${panelMargins.right}px` : 'unset'
    ancorStyle.bottom = store.value.verticalAnchor === 'bottom' ? `${panelMargins.bottom}px` : 'unset'
  }
})

function toNumber(value: string) {
  const num = +value
  if (Number.isNaN(num)) return 0
  return num
}
</script>

<style scoped>
</style>
