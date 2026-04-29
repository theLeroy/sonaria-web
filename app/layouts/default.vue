<template>
  <div
    class="grid min-h-screen grid-rows-[auto_1fr_auto]"
  >
    <TabNavigation />
    <AppNavigationMain />

    <main class="mt-navbar-height">
      <slot />
    </main>

    <AppNavigationFooter />
  </div>
</template>

<script setup lang="ts">
</script>
