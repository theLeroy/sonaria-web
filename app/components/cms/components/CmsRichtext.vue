<template>
  <Richtext
    :richtext="richtext"
  />
</template>

<script setup lang="ts">
import { graphql } from '~/gql/generated'
import type { ComponentRichtextFragment } from '~/gql/generated/graphql'

graphql(`
  fragment ComponentRichtext on Fieldset_ComponentRichtext {
    richtext {
      ... on BardText {
        text
      }
      ...ComponentMoodImage
      ... on Fieldset_RichtextButton {
        id
        link {
          url
          title
        }
        link_text
      }
    }
  }
`)

const props = defineProps<{
  data: ComponentRichtextFragment
}>()

const richtext = computed(() => {
  return props.data.richtext?.filter(item => item !== null) ?? []
})
</script>
