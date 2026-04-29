import type { PageAlternateFragment, SeotamicMetaFragment, SeotamicSocialFragment } from '~/gql/generated/graphql'

export const useSeotamic = (
  options: {
    seotamicSocial?: SeotamicSocialFragment | null
    seotamicMeta?: SeotamicMetaFragment | null
    alternates?: (PageAlternateFragment | null)[] | null
  },
) => {
  const config = useRuntimeConfig()

  const { seotamicSocial: social, seotamicMeta: meta } = options

  const { lang } = useCurrentRouteInfo()

  useSeoMeta({
    title: meta?.title,
    description: meta?.description,

    // Open Graph
    ogTitle: meta?.title,
    ogLocale: lang.value,
    ogDescription: meta?.description,
    ogImage: social?.image,
    ogUrl: meta?.canonical,
    ogType: 'website',
    ogSiteName: social?.site_name,

    // Twitter
    twitterTitle: social?.title,
    twitterDescription: social?.description,
    twitterImage: social?.image,
    twitterCard: 'summary_large_image',

    robots: {
      noindex: meta?.robots?.includes('noindex'),
      nofollow: meta?.robots?.includes('nofollow'),
    },
  })

  useHead({
    htmlAttrs: {
      lang: lang.value,
    },
    link: [
      {
        rel: 'canonical',
        href: meta?.canonical,
      },
      ...(options.alternates
        ? options.alternates.map(alt => ({
            rel: 'alternate',
            hreflang: alt?.locale,
            href: alt?.permalink,
          }))
        : []),
    ],
  })
}
