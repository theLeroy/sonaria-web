<template>
  <Component
    :is="tag"
    :data-container-indent="indent"
    class="@container"
    :class="{
      '': indent === 'none',
      'px-container-level-1': indent === 'level-1',
      'px-container-level-2': indent === 'level-2',
      'px-container-level-3': indent === 'level-3',
      'px-container-level-4': indent === 'level-4',
    }"
  >
    <slot />
  </Component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  tag?: keyof HTMLElementTagNameMap
  indent?:
    | 'none'
    | 'level-1'
    | 'level-2'
    | 'level-3'
    | 'level-4'
}>(), {
  indent: 'level-2',
  tag: 'div',
})
</script>
