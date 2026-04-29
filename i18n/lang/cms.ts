export default defineI18nLocale(async (locale) => {
  const config = useRuntimeConfig()

  try {
    return await $fetch(`${config.public.API_URL}/localize/${locale}`)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Sprache nicht gefunden.',
      data: error,
      fatal: true,
    })
  }
})
