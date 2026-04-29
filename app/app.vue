<script setup lang="ts">
const i18nHead = useLocaleHead({ seo: false })

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
})
</script>

<template>
  <NuxtLoadingIndicator
    color="#D5C283"
    :height="4"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <DebugBreaky />
</template>
