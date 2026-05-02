<template>
  <NuxtLink
    v-if="to"
    class="
      text-shadow-xl rounded-full bg-black/10 px-5 py-2.5 text-white
      backdrop-blur-md backdrop-saturate-150 transition-all duration-300
      text-shadow-current
      hover:bg-white/20
    "
    :to="to"
    v-bind="$attrs"
    :target="target ? target : isExternalUrl(to as string) ? '_blank' : '_self'"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="
      text-shadow-xl rounded-full bg-black/10 px-5 py-2.5 text-white
      backdrop-blur-md backdrop-saturate-150 transition-all duration-300
      text-shadow-current
      hover:bg-white/20
    "
    v-bind="$attrs"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string | RouteLocationRaw | null
    target?: string | null
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    to: null,
    target: null,
    type: 'button',
  },
)
</script>
