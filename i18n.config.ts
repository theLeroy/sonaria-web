import { defineI18nConfig } from '@nuxtjs/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  messages: {
    de: {
      aria: {
        main_navigation: 'Hauptnavigation',
        skip_to_content: 'Zum Inhalt springen',
      },
    },
    fr: {
      aria: {
        main_navigation: 'Navigation principale',
        skip_to_content: 'Aller au contenu',
      },
    },
  },
}))

