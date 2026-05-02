<template>
  <div
    class="grid min-h-screen grid-rows-[auto_1fr_auto]"
  >
    <!-- <TabNavigation /> -->
    <!-- <AppNavigationMain /> -->

    <main>
      <slot />
    </main>
    <!-- landscape image -->
    <div class="fixed inset-0 h-screen w-full object-cover">
      <template v-if="isLandscape">
        <HeatDistortImage
          src="/files/sonaria_website_querformat.png"
          alt="Sonaria background image"
          class="absolute inset-0 hidden h-screen w-full object-cover"
        />
      </template>
      <template v-else>
        <HeatDistortImage
          src="/files/sonaria_website_hochformat.png"
          alt="Sonaria background image"
          class="absolute inset-0 h-screen w-full object-cover"
        />
      </template>
    </div>
    <!-- <AppNavigationFooter /> -->
  </div>
</template>

<script setup lang="ts">
const isLandscape = useMediaQuery('(orientation: landscape)')

</script>
