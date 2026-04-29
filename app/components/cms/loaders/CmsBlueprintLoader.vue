<template>
  <Component
    :is="getBlueprint(page.entry?.__typename)"
    v-if="getBlueprint(page.entry?.__typename)"
    :page="page.entry"
  />

  <!-- DevOnly Fallback -->
  <DevOnly v-else>
    <DebugSomethingNotFound
      type="page"
      :data="page"
    />
  </DevOnly>
</template>

<script lang="ts" setup>
import { graphql } from '~/gql/generated'
import type { PageQuery } from '~/gql/generated/graphql'

const props = defineProps<{
  page: PageQuery
}>()

/**
 * Add your blueprint fragments here.
 */
graphql(`
  fragment Blueprints on EntryInterface {
    __typename

    ...BlueprintPage
  }
`)

if (props.page && props.page.entry && Object.keys(props.page.entry).filter(key => !['__typename', 'alternates', 'seotamic_meta', 'seotamic_social'].includes(key)).length === 0) {
  console.warn(`Page with typename ${props.page.entry?.__typename} has no data. You probably forgot to add the respective blueprint fragment to the CmsBlueprintLoader.vue`)
}

const getBlueprint = (typename: NonNullable<PageQuery['entry']>['__typename'] | null | undefined) => {
  if (!typename) {
    return undefined
  }

  /**
   * Make sure that your blueprints are following the naming convention and are prefixed with `Blueprint`.
   *
   * Example:
   *   Statamic Blueprint: `page`
   *   Statamic Typename: `Entry_Pages_Page
   *   Nuxt Component: `~/components/cms/blueprints/CmsPage.vue`
   */
  const match = typename.match(/^Entry_(.*)_(.*)$/)
  if (!match) {
    return undefined
  }

  return `CmsBlueprint${match[2]}`
}
</script>
