<script setup lang="ts">
useSeoMeta({
  title: 'Tickets',
})

// on opeing of the page, check if the url contains a token direct to eventfrog
const link = 'https://eventfrog.ch/de/p/festivals/electronic/sonaria-festival-7441844412533991522.html'

onMounted(() => {
  // redirect to eventfrog
  window.location.href = link
})

</script>

<template>
  <div>
    <h1>Tickets</h1>
  </div>
</template>
