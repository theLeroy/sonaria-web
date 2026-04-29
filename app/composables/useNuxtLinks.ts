/**
 * Composable that enhances anchor elements with Nuxt routing capabilities
 */
export const useNuxtLinks = (element: MaybeRef<HTMLAnchorElement | HTMLElement | null | undefined>): void => {
  const router = useRouter()

  onMounted(() => {
    const targetElement = unref(element)
    if (!targetElement) {
      return
    }
    const anchorElements = extractAnchorElements(targetElement)
    setupLinkListeners(anchorElements, router)
  })
}
