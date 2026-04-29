<template>
  <div v-if="page">
    <CmsBlueprintLoader
      :page="page"
    />
  </div>
</template>

<script setup lang="ts">
import { CombinedError } from '@urql/core'

const { data: page, suspense, isError, error, isSuccess } = useQueryStatamicPage()
await suspense()

if (isError.value) {
  const err = error.value
  const isCombinedError = err instanceof CombinedError

  const statusCode = isCombinedError && err.networkError
    ? (err.response?.status ?? 503)
    : 500

  throw createError({
    statusCode,
    statusText: err?.message || 'Server error',
    data: {
      graphQLErrors: isCombinedError ? err.graphQLErrors : undefined,
      networkError: isCombinedError ? err.networkError?.message : undefined,
      stack: import.meta.dev ? err?.stack : undefined,
    },
    fatal: true,
  })
}

if (isSuccess.value && !page.value?.entry) {
  throw createError({
    statusCode: 404,
    statusText: 'Page not found',
    fatal: true,
  })
}

if (page.value?.entry?.seo) {
  useSeoPro(page.value.entry.seo)
}
</script>
