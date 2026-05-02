<template>
  <div class="relative">
    <!-- TEXT -->
    <div
      class="
        pointer-events-none fixed inset-0 z-10 flex h-screen flex-col
        items-center justify-center
      "
    >
      <ClientOnly>
        <HeatDistortImage
          src="/files/sonaria_festival_text.png"
          alt="Sonaria logo image"
          class="pointer-events-none h-48 w-96 max-w-screen"
        />
      </ClientOnly>
      <div
        class="pointer-events-auto z-50 flex items-center justify-center gap-4"
      >
        <Button to="/faq">
          FAQ
        </Button>
        <Button to="https://eventfrog.ch/de/event/7441844412533991522/preview.html">
          Tickets
        </Button>
      </div>
    </div>
    <!-- landscape image -->
    <!-- <template v-if="isLandscape">
      <HeatDistortImageInteractive
        v-if="!isTouchDevice"
        src="/files/sonaria_website_querformat.png"
        alt="Sonaria background image"
        class="absolute inset-0 hidden h-screen w-full object-cover"
      />
      <HeatDistortImage
        v-else
        src="/files/sonaria_website_querformat.png"
        alt="Sonaria background image"
        class="absolute inset-0 hidden h-screen w-full object-cover"
      />
    </template>
    <template v-else>
      <HeatDistortImageInteractive
        v-if="!isTouchDevice"
        src="/files/sonaria_website_hochformat.png"
        alt="Sonaria background image"
        class="absolute inset-0 h-screen w-full object-cover"
      />
      <HeatDistortImage
        v-else
        src="/files/sonaria_website_hochformat.png"
        alt="Sonaria background image"
        class="absolute inset-0 h-screen w-full object-cover"
      />
    </template> -->

    <!-- <div class="max-w-2xl space-y-4">
      <Container class="py-10">
        <h1 class="text-3xl font-semibold">
          {{ siteName }}
        </h1>
        <p class="text-lg">
          This build runs **without any backend/CMS**. Content and navigation are local-only.
        </p>
      </Container>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

useSeoMeta({
  title: siteName.value,
  description: 'Local-only Nuxt build (no backend).',
})

const isTouchDevice = useMediaQuery('(pointer: coarse)')
const isLandscape = useMediaQuery('(orientation: landscape)')
</script>

