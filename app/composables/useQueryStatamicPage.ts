import { graphql } from '~/gql/generated'
import { useQuery } from '@tanstack/vue-query'

export const PageAlternate = graphql(`
  fragment PageAlternate on AlternateEntry {
    locale
    url
    permalink
  }
`)

export const Page = graphql(`
  query Page($uri: String!, $site: String!) {
    entry(uri: $uri, site: $site) {
      # blueprints
      ...Blueprints

      # alternates for language switching
      alternates {
        ...PageAlternate
      }

      # SEO Pro
      seo {
        ...SEO
      }
    }
  }
`)

export const useQueryStatamicPage = () => {
  const { $gql } = useNuxtApp()
  const { uri, lang } = useCurrentRouteInfo()

  const route = useRoute()
  const routeKey = computed(() => route.path)

  return useQuery({
    queryKey: ['statamic', 'page', routeKey],
    queryFn: async () => {
      return $gql(Page, {
        uri: uri.value,
        site: lang.value,
      })
    },
  })
}
