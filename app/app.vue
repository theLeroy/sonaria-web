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
    color="#425c7e"
    :height="4"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <DebugBreaky /> -->
</template>
