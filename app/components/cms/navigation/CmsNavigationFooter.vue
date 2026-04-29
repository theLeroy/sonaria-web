<template>
  <Container
    tag="footer"
    class="bg-[#F2DD96]"
  >
    <ul class="flex gap-2">
      <li
        v-for="item in data?.footer?.tree"
        :key="item?.page?.id"
      >
        <NuxtLink
          v-if="item?.page?.url"
          :to="item?.page?.url"
          class="
            block p-1 transition-colors
            hover-focus:bg-[#D5C283]
          "
          active-class="bg-[#D5C283] text-black"
        >
          {{ item?.page?.title }}
        </NuxtLink>

        <span v-else>
          {{ item?.page?.title }}
        </span>
      </li>
    </ul>
  </Container>
</template>

<script setup lang="ts">
/**
 * Note: This component is not following the convention of separating Cms and App.
 * This is because the navigation is tightly coupled to the CMS and abstracting the
 * navigation data structure is more difficult than it's worth.
 */

const { data, suspense } = useQueryStatamicNavigation()
await suspense()
</script>
