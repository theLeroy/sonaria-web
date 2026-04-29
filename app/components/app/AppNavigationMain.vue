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
            v-for="item in nav.main"
            :key="item.to"
          >
            <NuxtLink
              :to="localePath(item.to)"
              class="
                flex h-full items-center px-4 transition-colors
                hover-focus:bg-[#D5C283]
              "
              active-class="bg-[#D5C283] text-black"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </menu>
      </li>

      <li>
        <AppLanguageSwitcher />
      </li>
    </ul>
  </Container>
</template>

<script setup lang="ts">
const nav = useAppNavigation()
const localePath = useLocalePath()
</script>

