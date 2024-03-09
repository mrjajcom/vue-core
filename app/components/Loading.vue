<template>
  <v-row>
    <v-col class="text-center">
      <div :style="'margin:' + margin + ';'">
        <slot></slot>
        <v-progress-circular :size="50" indeterminate color="primary"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    margin: {
      default: '190px auto',
      type: String
    }
  }
}
</script>

<style scoped>

</style>
