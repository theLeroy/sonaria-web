<template>
  <MoodImage
    :image="data.image ?? undefined"
  />
</template>

<script setup lang="ts">
import { graphql } from '~/gql/generated'
import type { ComponentMoodImageFragment } from '~/gql/generated/graphql'

graphql(`
  fragment ComponentMoodImage on Fieldset_ComponentMoodImage {
    id
    image {
      ... Asset
    }
  }
`)

defineProps<{
  data: ComponentMoodImageFragment
}>()
</script>
