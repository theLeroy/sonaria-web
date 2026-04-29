<template>
  <main
    class="flex min-h-screen items-center justify-center p-6"
  >
    <div class="w-full max-w-2xl">
      <div class="text-center">
        <p class="text-8xl">
          {{ error?.status }}
        </p>
        <p>
          {{ error?.statusText || $t('error.somethingWentWrong') }}
        </p>
      </div>

      <DevOnly>
        <div
          class="my-8 space-y-4 border p-4"
        >
          <p class="">
            {{ error?.statusText }}
          </p>

          <div v-if="(error?.data as any)?.graphQLErrors?.length">
            <p class="mb-1 text-sm opacity-60">
              GraphQL Errors
            </p>
            <pre
              class="
                overflow-x-auto text-xs wrap-break-word whitespace-pre-wrap
              "
            >{{ (error?.data as any).graphQLErrors }}</pre>
          </div>

          <div v-if="(error?.data as any)?.networkError">
            <p class="mb-1 text-sm opacity-60">
              Network Error
            </p>
            <pre
              class="
                overflow-x-auto text-xs wrap-break-word whitespace-pre-wrap
              "
            >{{ (error?.data as any).networkError }}</pre>
          </div>

          <div v-if="error?.stack">
            <p class="mb-1 text-sm opacity-60">
              Stack Trace
            </p>
            <pre
              class="
                overflow-x-auto text-xs wrap-break-word whitespace-pre-wrap
                opacity-50
              "
            >{{ error?.stack }}</pre>
          </div>
        </div>
      </DevOnly>

      <div class="text-center">
        <NuxtLink
          to="/"
          class="p-2"
        >
          {{ $t('error.backToHomepage') }}
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

/**
 *  Handle locale for 404 and 500 pages where SEOTamic doesn't deliver a response
 */
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
})
</script>
