<template>
  <Container
    id="main-navigation"
    class="fixed z-50 h-navbar-height w-full border-b bg-[#F2DD96]"
    tag="nav"
  >
    <ul class="flex h-full items-center justify-between">
      <li class="h-full">
        <menu class="flex h-full">
          <li

            v-for="item in data?.main?.tree"
            :key="item?.page?.id"
          >
            <NuxtLink
              v-if="item?.page?.url"
              :to="item?.page?.url"
              class="
                flex h-full items-center px-4 transition-colors
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
        </menu>
      </li>

      <li>
        <CmsLanguageSwitcher />
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
