<template>
  <span v-if="data && typeof data === 'object' && data.first_name">
    {{ data.first_name }} {{ data.last_name }}
  </span>
</template>

<script>
export default {
  name: 'FullName',
  props: {
    data: {
      default: null,
      type: Object
    }
  },
}
</script>

<style scoped>

</style>
