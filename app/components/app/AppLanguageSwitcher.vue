<template>
  <LanguageSwitcher
    v-model="currentLocale"
  />
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const supportedLocales = ['de', 'fr'] as const
type SupportedLocale = (typeof supportedLocales)[number]

const currentLocale = ref<SupportedLocale>(
  supportedLocales.includes(locale.value as SupportedLocale)
    ? (locale.value as SupportedLocale)
    : 'de',
)

watch(currentLocale, async (newLocale) => {
  setLocale(newLocale)
  const to = switchLocalePath(newLocale)
  if (to) {
    await navigateTo(to)
  }
})
</script>

