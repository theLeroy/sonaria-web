import { graphql } from '~/gql/generated'
import { useQuery } from '@tanstack/vue-query'

export const Navigation = graphql(`
  query Navigation($site: String!) {
    main: nav(handle: "main") {
      handle
      title
      tree(site: $site) {
        page {
          id
          url
          title
        }
      }
    }
    footer: nav(handle: "footer") {
      handle
      title
      tree(site: $site) {
        page {
          id
          url
          title
        }
      }
    }
  }
`)

export const useQueryStatamicNavigation = () => {
  const { $gql } = useNuxtApp()
  const { lang } = useCurrentRouteInfo()

  return useQuery({
    queryKey: ['statamic', 'navigation', lang],
    staleTime: 0, // hack to force refetch, or putting nexttick in navigation
    queryFn: async () => {
      return $gql(Navigation, {
        site: lang.value,
      })
    },
  })
}
