<template>
  <Section class="bg-[#F2DD96]">
    <Container>
      <AppImage :src="image" />
    </Container>
  </Section>
</template>

<script setup lang="ts">
import type { Asset } from '~/types/global'
defineProps<{
  image?: Asset
}>()
</script>
