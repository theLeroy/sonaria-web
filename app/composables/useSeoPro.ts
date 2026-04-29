import { graphql } from '~/gql/generated'
import type { SeoFragment } from '~/gql/generated/graphql'

graphql(`
  fragment SEO on SeoPro {
    compiled_title
    description
    robots
    og_title
    canonical_url
    site_name
    twitter_card
    twitter_handle
    twitter_title
    twitter_description
    robots_indexing
    home_url
    prev_url
    next_url
    current_hreflang
    is_default_site
    humans_txt
    json_ld
    site {
      locale
    }
    alternate_locales {
      url
      site {
        locale
      }
    }
    image {
      __typename
      permalink
      width
      height
      ... on Asset_Assets {
        alt_de
        alt_fr
      }
    }
  }
`)

type MetaEntry = | {
  name: string
  content: string
}
| {
  property: string
  content: string
}

type LinkEntry = {
  rel: string
  href: string
  hreflang?: string
  type?: string
}

function imageAlt(image: SeoFragment['image']): string | undefined {
  if (!image?.__typename) return undefined
  if (image.__typename === 'Asset_Assets') {
    const asset = image as {
      alt_de?: string
      alt_fr?: string
    }
    return asset.alt_de ?? asset.alt_fr
  }
  return undefined
}

export const useSeoPro = (seo: SeoFragment | null) => {
  if (!seo) return

  const meta: MetaEntry[] = []
  const link: LinkEntry[] = []

  if (seo.description) {
    meta.push({
      name: 'description',
      content: seo.description,
    })
  }

  if (seo.robots?.length) {
    meta.push({
      name: 'robots',
      content: seo.robots.join(', '),
    })
  }

  meta.push({
    property: 'og:type',
    content: 'website',
  })

  if (seo.og_title) {
    meta.push({
      property: 'og:title',
      content: seo.og_title,
    })
  }

  if (seo.description) {
    meta.push({
      property: 'og:description',
      content: seo.description,
    })
  }

  if (seo.canonical_url) {
    meta.push({
      property: 'og:url',
      content: seo.canonical_url,
    })
  }

  if (seo.site_name) {
    meta.push({
      property: 'og:site_name',
      content: seo.site_name,
    })
  }

  if (seo.site?.locale) {
    meta.push({
      property: 'og:locale',
      content: seo.site.locale,
    })
  }

  if (seo.alternate_locales?.length) {
    for (const alt of seo.alternate_locales) {
      if (alt?.site?.locale) {
        meta.push({
          property: 'og:locale:alternate',
          content: alt.site.locale,
        })
      }
    }
  }

  if (seo.twitter_card) {
    meta.push({
      name: 'twitter:card',
      content: seo.twitter_card,
    })
  }

  if (seo.twitter_handle) {
    const handle = seo.twitter_handle
    meta.push({
      name: 'twitter:site',
      content: handle?.startsWith('@') ? handle : `@${handle}`,
    })
  }

  if (seo.twitter_title) {
    meta.push({
      name: 'twitter:title',
      content: seo.twitter_title,
    })
  }

  if (seo.twitter_description) {
    meta.push({
      name: 'twitter:description',
      content: seo.twitter_description,
    })
  }

  const img = seo.image
  if (img) {
    if (img.permalink) {
      meta.push({
        property: 'og:image',
        content: img.permalink,
      })
      if (img.width !== null) {
        meta.push({
          property: 'og:image:width',
          content: String(Math.round(img.width)),
        })
      }
      if (img.height !== null) {
        meta.push({
          property: 'og:image:height',
          content: String(Math.round(img.height)),
        })
      }
    }
    const alt = imageAlt(seo.image)
    if (alt) {
      meta.push({
        property: 'og:image:alt',
        content: alt,
      })
    }
    if (img.permalink) {
      meta.push({
        name: 'twitter:image',
        content: img.permalink,
      })
    }
    if (alt) {
      meta.push({
        name: 'twitter:image:alt',
        content: alt,
      })
    }
  }

  const noIndex = seo.robots_indexing === 'noindex'
  if (!noIndex) {
    if (seo.home_url) {
      link.push({
        rel: 'home',
        href: seo.home_url,
      })
    }
    if (seo.canonical_url) {
      link.push({
        rel: 'canonical',
        href: seo.canonical_url,
      })
    }
    if (seo.prev_url) {
      link.push({
        rel: 'prev',
        href: seo.prev_url,
      })
    }
    if (seo.next_url) {
      link.push({
        rel: 'next',
        href: seo.next_url,
      })
    }
    if (seo.alternate_locales?.length && seo.canonical_url && seo.current_hreflang) {
      link.push({
        rel: 'alternate',
        href: seo.canonical_url,
        hreflang: seo.current_hreflang,
      })
      if (seo.is_default_site) {
        link.push({
          rel: 'alternate',
          href: seo.canonical_url,
          hreflang: 'x-default',
        })
      }
      for (const alt of seo.alternate_locales) {
        if (alt?.url && alt?.site?.locale) {
          link.push({
            rel: 'alternate',
            href: alt.url,
            hreflang: alt.site.locale,
          })
        }
      }
    }
  }

  if (seo.humans_txt) {
    link.push({
      rel: 'author',
      href: seo.humans_txt,
      type: 'text/plain',
    })
  }

  const head: Record<string, unknown> = {
    title: seo.compiled_title ?? undefined,
    meta: meta.filter(m => m.content !== undefined && m.content !== ''),
    link: link.filter(l => l.href !== ''),
  }

  if (seo.json_ld?.length) {
    head.script = seo.json_ld.map(value => ({
      type: 'application/ld+json',
      innerHTML: value ?? '',
    }))
  }

  useHead(head)
}
