/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * https://github.com/teamnovu/nuxt-base/blob/eba2d7fd821bb577675f83914dfe6f6b17bfa14f/plugins/livePreview.ts
 */

/**
 * The identifier that will be used to
 * set the element's data attribute via the Vue directive
 */
const targetIdentifier = 'editor-target'

/**
 * Scroll to the given element in the DOM
 */
function scrollTo(element: HTMLElement) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  })
}

/**
 * Look for the closest ancestor with the target identifier
 * of the given element
 */
function getParentIdentifierRecursively(element?: any): any {
  if (!element) return null

  const attrValue = element.getAttribute(`data-${targetIdentifier}`)

  if (!attrValue) {
    return getParentIdentifierRecursively(element.parentElement)
  }

  const ancestorIdentifier = getParentIdentifierRecursively(
    element.parentElement,
  )

  if (!ancestorIdentifier) {
    return attrValue
  }

  return `${ancestorIdentifier}.${attrValue}`
}

/**
 * Find the closest ancestor that matches the given identifier
 */
function findMatchingTargetRecursively(targets: any[], elementIdentifier: string) {
  if (targets.length === 0) return null

  const matchingTarget = targets.find(
    target => elementIdentifier === target.identifier,
  )

  if (matchingTarget) {
    return matchingTarget
  }

  if (!elementIdentifier.includes('.')) {
    return null
  }

  return findMatchingTargetRecursively(
    targets,
    elementIdentifier.split('.').slice(0, -1)
      .join('.'),
  )
}

/**
 * Get the element that matches the given identifier
 * Ultimately, this will be the element that we want to scroll to
 */
function getElement(elementIdentifier: string): any {
  // get all nodes with the target identifier
  let targets: any[] = [...document.querySelectorAll(`[data-${targetIdentifier}]`)]

  targets = targets.map((target) => {
    let identifier = target.getAttribute(`data-${targetIdentifier}`)
    const ancestorIdentifier = getParentIdentifierRecursively(
      target.parentElement,
    )

    // the target might be nested within another target
    // when that is the case, we need to concatenate the ancestor identifier with the element identifier
    if (ancestorIdentifier) {
      identifier = `${ancestorIdentifier}.${identifier}`
    }

    return {
      identifier,
      element: target,
    }
  })

  // filter out the ones that don't match the given identifier
  const matchingTarget = findMatchingTargetRecursively(
    targets,
    elementIdentifier,
  )

  return matchingTarget?.element
}

export default defineNuxtPlugin((nuxt) => {
  if (import.meta.server) return

  window.onmessage = async ({ data }) => {
    if (data.focusedElement) {
      const element = getElement(data.focusedElement)

      if (!element) return

      scrollTo(element)
    }
  }

  window.onmessage = async ({ data }) => {
    const { $queryClient } = useNuxtApp()
    const { updateRouteLivePreviewToken } = useCurrentRouteInfo()

    if (!(typeof data === 'object')) return
    if (data.name !== 'statamic.preview.updated') return
    if (!data.token) return

    updateRouteLivePreviewToken(data.token)

    $queryClient.refetchQueries({
      predicate(query) {
        return query.queryKey.includes('statamic')
          && query.queryKey.includes('page')
      },
    })
  }
})
