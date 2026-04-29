<template>
  <DevOnly>
    <pre
      class="
        mx-container-level-1 my-4 border border-[currentColor] bg-[#f4f4f4] p-2
        text-[0.75rem]
      "
    >
    <span class="text-[0.56rem]">Debug only:</span>
      <slot />
   </pre>
  </DevOnly>
</template>

