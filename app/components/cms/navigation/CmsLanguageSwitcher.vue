<template>
  <LanguageSwitcher
    v-model="currentLocale"
    :alternates="alternates"
  />
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const { data, suspense } = useQueryStatamicPage()
await suspense()

const currentLocale = ref(locale.value)

const alternates = computed(() => (data.value?.entry?.alternates?.filter(alt => alt !== null) ?? []))

watch(currentLocale, async (newLocale) => {
  const alt = alternates.value.find(a => a && a.locale.split('-')[0] === newLocale)
  if (alt && alt.url) {
    const locale = alt.locale.split('-')[0]
    setLocale(locale as any)
    await navigateTo(alt.url)
  }
}, { deep: true })
</script>
