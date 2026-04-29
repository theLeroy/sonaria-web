<template>
  <Section
    spacing="hero"
    class="bg-[#F2DD96]"
  >
    <Container>
      <Button
        v-if="parentUrl"
        :to="parentUrl"
      >
        Backlink
      </Button>
      <ul class="pl-8">
        <li>
          heading:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ heading }}</pre>
        </li>
        <li>
          text:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ text }}</pre>
        </li>
        <li>
          image:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ image }}</pre>
        </li>
        <li>
          link:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ linkUrl }}</pre>
        </li>
        <li>
          linkTitle:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ linkTitle }}</pre>
        </li>
        <li>
          linkText:
          <pre class="pl-4 text-xs whitespace-pre-wrap">{{ linkText }}</pre>
        </li>
      </ul>
    </Container>
  </Section>
</template>

<script lang="ts" setup>
import type { Asset } from '~/types/global'

defineProps<{
  parentUrl?: string
  heading: string
  text?: string
  image?: Asset
  linkUrl?: string
  linkTitle?: string
  linkText?: string
}>()
</script>
