<template>
  <div>
    <select
      v-model="currentLocale"
      aria-label="Sprache wählen"
    >
      <option
        v-for="lang in locales"
        :key="lang.code"
        :value="lang.code"
        :disabled="!hasAlternate(lang.code)"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  alternates?: Array<{
    locale: string
    url: string
  }>
}>()

const { locales } = useI18n()

const currentLocale = defineModel<string>()

const hasAlternate = (localeCode: string) => {
  if (!props.alternates?.length) return true

  // alternates from Statamic come in the form of de-CH (see sites.yaml)
  // nuxt-i18n locales are set as de (see nuxt.config.ts)
  return props.alternates.some((a) => {
    if (!a || !a.locale) return false
    return a.locale.split('-')[0] === localeCode
  })
}
</script>
