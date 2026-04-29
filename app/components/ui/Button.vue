<template>
  <NuxtLink
    v-if="to"
    :to="to"
    v-bind="$attrs"
    :target="target ? target : isExternalUrl(to as string) ? '_blank' : '_self'"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
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
