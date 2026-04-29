<template>
  <CmsHeroLoader
    :heroes="page.hero"
    :parent-url="page.parent?.url ?? null"
  />
  <CmsComponentsLoader
    :components="page.components"
  />
</template>

<script setup lang="ts">
import { graphql } from '~/gql/generated'
import type { BlueprintPageFragment } from '~/gql/generated/graphql'

defineProps<{
  page: BlueprintPageFragment
}>()

graphql(`
  fragment BlueprintPage on Entry_Pages_Page {
    title
    blueprint

    parent {
      url
    }

    hero {
      ...Heroes
    }

    components {
      ...Components
    }
  }
`)
</script>
