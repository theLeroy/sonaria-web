<!-- eslint-disable vuejs-accessibility/tabindex-no-positive -->
<template>
  <nav
    class="
      fixed -top-full left-[10%] z-[1000] rounded-b-lg border-2 border-[#C5C1B4]
      bg-white px-8 pt-6 pb-5 shadow-lg transition-all
      md:focus-within:-top-1
    "
    aria-label="Accessibility navigation"
  >
    <ul class="space-y-2">
      <li>
        <button
          tabindex="1"
          class="
            focus-visible:ring-focus focus-visible:ring-2
            focus-visible:outline-none
            px-2
            hover:underline
          "
          type="button"
          @click="jumpToNavigation"
        >
          <span>{{ $t('aria.main_navigation') }}</span>
        </button>
      </li>
      <li>
        <button
          tabindex="1"
          class="
            focus-visible:ring-focus focus-visible:ring-2
            focus-visible:outline-none
            px-2
            hover:underline
          "
          type="button"
          @click="jumpToContent"
        >
          <span>{{ $t('aria.skip_to_content') }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { jumpToNavigation, jumpToContent } = useTabHelper()
</script>
