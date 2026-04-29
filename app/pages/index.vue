<template>
  <div class="relative">
    <!-- Desktop image -->
    <NuxtImg
      src="/files/sonaria_website_querformat.png"
      alt="Sonaria background image"
      class="
        absolute inset-0 hidden h-screen w-full object-cover
        lg:block
      "
    />
    <!-- MOBILE IMAGE -->
    <NuxtImg
      src="/files/sonaria_website_hochformat.png"
      alt="Sonaria background image"
      class="
        absolute inset-0 h-screen w-full object-cover
        lg:hidden
      "
    />
    <div class="max-w-2xl space-y-4">
      <Container class="py-10">
        <h1 class="text-3xl font-semibold">
          {{ siteName }}
        </h1>
        <p class="text-lg">
          This build runs **without any backend/CMS**. Content and navigation are local-only.
        </p>
      </Container>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

useSeoMeta({
  title: siteName.value,
  description: 'Local-only Nuxt build (no backend).',
})
</script>

