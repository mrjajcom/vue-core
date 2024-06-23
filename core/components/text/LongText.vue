<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span
        v-if="data"
        :class="css_class"
        v-bind="attrs"
        v-on="on"
      >{{ data.length > max ? (data.substring(0, max) + '...') : data }}</span>
    </template>
    <span>{{ data }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'LongText',
  components: {  },
  props: {
    data: {
      default: null,
      type: String
    },
    css_class: {
      default: null,
      type: String
    },
    max: {
      default: 20,
      type: Number
    }
  },
}
</script>

<style scoped>

</style>
