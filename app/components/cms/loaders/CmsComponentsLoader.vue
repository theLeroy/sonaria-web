<template>
  <template
    v-for="(component, index) in filteredComponents"
    :key="component.__typename"
  >
    <Component
      :is="getComponent(component.__typename)"
      v-if="getComponent(component.__typename)"
      :data-component-type="getComponent(component.__typename)"
      :index="index"
      :data="component"
    />

    <!-- DevOnly Fallback -->
    <DebugSomethingNotFound
      v-else
      type="component"
      :data="component"
    />
  </template>
  <Dev v-if="filteredComponents.length === 0">
    no components defined
  </Dev>
</template>

<script lang="ts" setup>
import { graphql } from '~/gql/generated'
import type { ComponentsFragment } from '~/gql/generated/graphql'

/**
 * Add your components fragments here.
 */
graphql(`
  fragment Components on Sets_Components {
    __typename

    ...ComponentMoodImage
    ...ComponentRichtext
  }
`)

const props = defineProps<{
  components: Array<ComponentsFragment | null> | null
}>()

const filteredComponents = computed(() => {
  props.components?.forEach((component: ComponentsFragment | null) => {
    if (component && Object.keys(component).filter(key => !['__typename'].includes(key)).length === 0) {
      console.warn(`Component with typename ${component?.__typename} has no data. You probably forgot to add the respective component fragment to the CmsComponentsLoader.vue`)
    }
  })

  return props.components?.filter(component => component !== null) ?? []
})

const getComponent = (typename: ComponentsFragment['__typename']) => {
  /**
   * With our patch in Statamic (0006-improve-gql-replicator-types.patch), instead of getting
   * typenames like `Set_Components_ComponentImage`, we get `Fieldset_ComponentImage`.
   *
   * This regex extracts the component name from the typename.
   *
   * Make sure that your components are following the naming convention and are prefixed with `Cms`.
   *
   * Example:
   *   Statamic Fieldset: `component_image`
   *   Statamic Typename: `Fieldset_ComponentImage`
   *   Nuxt Component: `~/components/cms/components/CmsImage.vue`
   */
  const match = typename.match(/^Fieldset_Component(.*)$/)
  if (!match) {
    return undefined
  }

  return `Cms${match[1]}`
}
</script>
