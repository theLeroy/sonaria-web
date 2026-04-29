<template>
  <HeroExample
    :parent-url="parentUrl ?? undefined"
    :heading="data.heading"
    :text="data.text ?? undefined"
    :image="data.image ?? undefined"
    :link-url="data.link?.url ?? undefined"
    :link-title="data.link?.title ?? undefined"
    :link-text="data.link_text ?? undefined"
  />
</template>

<script lang="ts" setup>
import { graphql } from '~/gql/generated'
import type { HeroExampleFragment } from '~/gql/generated/graphql'

graphql(`
  fragment HeroExample on Fieldset_HeroExample {
    heading
    text
    image {
      ...Asset
    }
    link {
      url
      title
    }
    link_text
  }
`)

defineProps<{
  data: HeroExampleFragment
  parentUrl: string | null
}>()
</script>
