<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable better-tailwindcss/no-unregistered-classes -->
<template>
  <div
    ref="element"
    class="prose"
    v-html="html"
  />
</template>

<script setup lang="ts">
const element = ref<HTMLDivElement>()

defineProps<{
  html?: string | null
}>()

useNuxtLinks(element)
</script>

<style>
@reference "~/assets/css/main.css";

.prose {

  p {
    @apply text-pretty;
  }

  a {
    @apply font-bold transition-opacity duration-300 hover-focus:opacity-75;
  }

  h1 {
    @apply text-2xl mb-[2ex] font-bold;
  }
  h2 {
    @apply text-xl mb-[2ex] font-bold;
  }
  h3 {
    @apply text-lg mb-[2ex] font-bold;
  }
  h4 {
    @apply mb-[2ex] font-bold;
  }

  p + h1,
  p + h2,
  p + h3,
  p + h4 {
    @apply mt-[2ex];
  }

  h1 + p {
    @apply !mt-[2ex];
  }

  p + p {
    @apply mt-4;
  }

  ul:not(:first-child),
  ol:not(:first-child) {
    @apply my-2;
  }

  ul {
    @apply ml-3 list-outside;
    list-style-type: '•';
    li {
      @apply pl-2;
    }
  }
  ol {
    @apply ml-3 list-outside list-decimal;
    li {
      @apply pl-2;
    }
  }
  ul ul,
  ol ul {
    @apply ml-2 list-outside;
    list-style-type: '\26ac';
  }
  ol ol,
  ul ol {
    @apply ml-2 list-outside;
    list-style-type: lower-latin;
  }

  li p {
    @apply inline before:hidden after:hidden;
  }

  blockquote {
    @apply relative p-2 md:p-4 xl:p-6;
  }
}
</style>
