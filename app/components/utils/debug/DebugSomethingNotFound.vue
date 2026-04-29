<template>
  <DevOnly>
    <div
      class="border-2 border-[#D5C283] bg-[#F2DD96] p-2"
    >
      <b>{{ title }}</b>
      <div>{{ data }}</div>
    </div>
  </DevOnly>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: 'component' | 'page' | 'hero' | 'richtext'
  data?: string | object | number | null
}>()

const title = computed(() => {
  if (props.type === 'component') return 'Component not found'
  if (props.type === 'page') return 'Page not found'
  if (props.type === 'hero') return 'Hero not found'
  if (props.type === 'richtext') return 'Richtext set component not found'

  return 'Something not found'
})
</script>
