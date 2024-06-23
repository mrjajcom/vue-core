<script setup>
defineProps({
  'iconProps': {
    type: Object,
  }
})
</script>

<template>
  <v-btn :icon="true" v-bind="$attrs">
    <v-icon v-bind="iconProps">$close</v-icon>
  </v-btn>
</template>

<style scoped>

</style>
