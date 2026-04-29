<template>
  <Container class="py-10">
    <div class="max-w-2xl space-y-4">
      <h1 class="text-3xl font-semibold">
        {{ siteName }}
      </h1>
      <p class="text-lg">
        This build runs **without any backend/CMS**. Content and navigation are local-only.
      </p>
    </div>
  </Container>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

useSeoMeta({
  title: siteName.value,
  description: 'Local-only Nuxt build (no backend).',
})
</script>

