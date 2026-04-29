export const useTabHelper = () => {
  const jumpToNavigation = () => {
    // find first focusable element in navigation
    const navigation = document.getElementById('main-navigation')
    const focusableElements = navigation?.querySelector('a, button, input, textarea, select, details, summary, [tabindex]:not([tabindex="-1"])')

    if (focusableElements) {
      (focusableElements as HTMLElement)?.focus?.()
      navigation?.scrollIntoView?.({ behavior: 'smooth' })
      return true
    }

    return false
  }

  const jumpToContent = () => {
    // find first focusable element in mein
    const main = document.getElementsByTagName('main')[0]
    const focusableElements = main?.querySelector('a, button, input, textarea, select, details, summary, [tabindex]:not([tabindex="-1"])')

    if (focusableElements) {
      (focusableElements as HTMLElement)?.focus?.()
      main?.scrollIntoView?.({ behavior: 'smooth' })
      return true
    }

    return false
  }

  return {
    jumpToNavigation,
    jumpToContent,
  }
}
