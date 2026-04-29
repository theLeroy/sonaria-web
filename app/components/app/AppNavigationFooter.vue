<template>
  <Container
    tag="footer"
    class="bg-[#F2DD96]"
  >
    <ul class="flex gap-2">
      <li
        v-for="item in nav.footer"
        :key="item.to"
      >
        <NuxtLink
          :to="localePath(item.to)"
          class="
            block p-1 transition-colors
            hover-focus:bg-[#D5C283]
          "
          active-class="bg-[#D5C283] text-black"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </Container>
</template>

<script setup lang="ts">
const nav = useAppNavigation()
const localePath = useLocalePath()
</script>

