export const useCurrentRouteInfo = () => {
  const route = useRoute()
  const { $i18n } = useNuxtApp()
  const lang = computed(() => $i18n.locale.value)
  const languageCodes = computed(() =>
    $i18n.locales.value.map(
      lang => lang.code,
    ))

  const livePreview = computed(() => route.query['live-preview'] ? String(route.query['live-preview']) : undefined)
  const livePreviewToken = computed(() => route.query.token)

  const updateRouteLivePreviewToken = (token: string) => {
    route.query.token = token
  }

  const uri = computed(() => stripLangFromPath(route.path || '/', languageCodes.value))

  return {
    lang,
    uri,
    livePreview,
    livePreviewToken,
    updateRouteLivePreviewToken,
  }
}
