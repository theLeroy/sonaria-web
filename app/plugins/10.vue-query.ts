import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

/**
 * https://tanstack.com/query/latest/docs/framework/vue/guides/ssr#nuxt-3
 */
export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query-statamic')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 0,
        staleTime: 60 * 1000, // 60 second,
        // staleTime: 3 * 1000, // 3 seconds dev
        // refetchOnWindowFocus: isInLivePreview.value,
        retry: false,
      },
    },
  })

  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }

  return {
    provide: {
      queryClient,
    },
  }
})
