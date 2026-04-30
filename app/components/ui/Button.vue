<template>
  <NuxtLink
    v-if="to"
    class="text-shadow-xl rounded-full px-4 text-white text-shadow-current"
    :to="to"
    v-bind="$attrs"
    :target="target ? target : isExternalUrl(to as string) ? '_blank' : '_self'"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="text-shadow-xl rounded-full px-4 text-white text-shadow-current"
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
