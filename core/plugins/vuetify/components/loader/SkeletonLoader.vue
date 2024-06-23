<script setup>
const props = defineProps({
  'count': {
    default: 6,
    type: [Number, String]
  }
})
</script>

<template>
  <v-skeleton-loader
    v-for="n in parseInt(count.toString())"
    class="without-margin"
    :key="'skeleton-loader-'+n"
    v-bind="$attrs"
  />
</template>

<style scoped>

</style>
