<template>
  <template
    v-for="hero in filteredHeroes"
    :key="hero.__typename"
  >
    <Component
      :is="getHeroComponent(hero.__typename)"
      v-if="getHeroComponent(hero.__typename)"
      :data="hero"
      :parent-url="parentUrl"
    />

    <!-- DevOnly Fallback -->
    <DebugSomethingNotFound
      v-else
      type="hero"
      :data="hero"
    />
  </template>
</template>

<script lang="ts" setup>
import { graphql } from '~/gql/generated'
import type { HeroesFragment } from '~/gql/generated/graphql'

/**
 * Add your hero fragments here.
 */
graphql(`
  fragment Heroes on Sets_Hero {
    __typename

    ...HeroExample
  }
`)

const props = defineProps<{
  heroes: Array<HeroesFragment | null> | null
  parentUrl: string | null
}>()

const filteredHeroes = computed(() => {
  props.heroes?.forEach((hero: HeroesFragment | null) => {
    if (hero && Object.keys(hero).filter(key => !['__typename'].includes(key)).length === 0) {
      console.warn('Hero with typename ', hero?.__typename, 'has no data. You probably forgot to add the hero fragment to the BlueprintLoader.')
    }
  })

  return props.heroes?.filter(hero => hero !== null) ?? []
})

const getHeroComponent = (typename: HeroesFragment['__typename']) => {
  /**
   * With our patch in Statamic (0006-improve-gql-replicator-types.patch), instead of getting
   * typenames like `Set_Hero_HeroSimple`, we get `Fieldset_HeroSimple`.
   *
   * This regex extracts the component name from the typename.
   *
   * Make sure that your Hero components are following the naming convention and are prefixed with `Cms`.
   *
   * Example:
   *   Statamic Fieldset: `hero_simple`
   *   Statamic Typename: `Fieldset_HeroSimple`
   *   Nuxt Component: `~/components/cms/heroes/CmsHeroSimple.vue`
   */
  const match = typename.match(/^Fieldset_(.*)$/)
  if (!match) {
    return undefined
  }

  return `Cms${match[1]}`
}
</script>
