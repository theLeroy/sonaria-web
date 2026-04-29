<template>
  <div
    class="grid min-h-screen grid-rows-[auto_1fr_auto]"
  >
    <TabNavigation />
    <CmsNavigationMain />

    <main class="mt-navbar-height">
      <slot />
    </main>

    <CmsNavigationFooter />
  </div>
</template>

<script setup lang="ts">
</script>
