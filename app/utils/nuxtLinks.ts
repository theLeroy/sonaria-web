import type { Router } from 'vue-router'

export function isExternalUrl(url: string): boolean {
  const config = useRuntimeConfig()

  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return true
  }

  if (/^https?:\/\//.test(url)) {
    if (import.meta.client) {
      return !url.startsWith(location.origin)
    }
    if (config.public.APP_URL) {
      return !url.startsWith(config.public.APP_URL)
    }
    return true
  }
  return false
}

export function handleInternalNavigation(event: MouseEvent, router: Router): void {
  const link = event.currentTarget as HTMLAnchorElement
  const href = link?.getAttribute('href')
  if (!href) return
  if (!isExternalUrl(href)) {
    event.preventDefault()
    const path = href.replace(location.origin, '') || '/'
    router.push(path)
  }
}

export function setupLinkListeners(links: HTMLAnchorElement[], router: Router): void {
  links.forEach((link) => {
    const target = link.getAttribute('target')
    const rel = link.getAttribute('rel')
    if (target === '_blank' && !rel) {
      link.setAttribute('rel', 'noopener')
    }
    useEventListener(link, 'click', (event: MouseEvent) =>
      handleInternalNavigation(event, router))
  })
}

export function extractAnchorElements(element: HTMLElement): HTMLAnchorElement[] {
  if (element.tagName === 'A') {
    return [element as HTMLAnchorElement]
  }
  return Array.from(element.querySelectorAll('a'))
}
