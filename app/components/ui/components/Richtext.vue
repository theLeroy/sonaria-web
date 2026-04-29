<template>
  <Section
    class="bg-[#F2DD96]"
  >
    <Container>
      <div
        v-for="(item, index) in richtext"
        :key="item?.__typename === 'BardText' ? index : item?.id ?? index"
        class="mx-8 my-2 bg-[#F1EFEA]"
      >
        <span class="pb-1 pl-2 text-xs font-bold text-black">
          {{ item?.__typename }}
        </span>
        <template v-if="item?.__typename === 'BardText'">
          <Bard :html="item?.text" />
        </template>
        <template v-else-if="item?.__typename === 'Fieldset_ComponentMoodImage'">
          <AppImage :src="item?.image" />
        </template>
        <template v-else-if="item?.__typename === 'Fieldset_RichtextButton'">
          <Button
            :to="item?.link?.url"
          >
            {{ item?.link_text }}
          </Button>
        </template>
        <template v-else>
          <pre class="pl-8 text-xs whitespace-pre-wrap">{{ JSON.stringify(item, null, 2) }}</pre>
        </template>
      </div>
    </Container>
  </Section>
</template>

<script setup lang="ts">
import type { ComponentRichtextFragment } from '~/gql/generated/graphql'

defineProps<{
  richtext: ComponentRichtextFragment['richtext']
}>()

</script>
