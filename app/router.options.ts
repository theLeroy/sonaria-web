import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    let scrollBehavior: Awaited<ReturnType<NonNullable<RouterConfig['scrollBehavior']>>> | null = null

    // Anchor link scroll behavior
    if (to && to.hash) {
      // Apply correct scroll padding from html element
      const top = getComputedStyle(document.documentElement).scrollPaddingTop
      scrollBehavior = {
        el: to.hash,
        top: +top.replace('px', ''),
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      scrollBehavior = savedPosition
    } else {
      scrollBehavior = {
        top: 0,
        left: 0,
        behavior: 'instant',
      }
    }

    /**
     * Immediately apply scroll behavior if the user is navigating in the same page (i.e. anchor links).
     * Otherwise, wait for the page to finish loading.
     */
    if (to.path === from.path) {
      return scrollBehavior
    } else {
      const nuxtApp = useNuxtApp()
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:transition:finish', () => {
          if (!scrollBehavior) return
          resolve(scrollBehavior)
        })
      })
    }
  },
}
