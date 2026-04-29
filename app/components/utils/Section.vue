<template>
  <Component
    :is="tag"
    class="border-b"
    :class="{
      '': spacing === 'none',
      'py-8': spacing === 'md',
      'py-16': spacing === 'lg',
      'pt-18 pb-16': spacing === 'hero',
    }"
  >
    <slot />
  </Component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  tag?: string
  spacing?: 'none' | 'md' | 'lg' | 'hero'
}>(), {
  tag: 'section',
  spacing: 'md',
})
</script>
