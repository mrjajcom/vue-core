<template>
  <div class="text-center my-16" v-bind="$attrs">
    <div class="py-7 pt-3 text-center text-h5 text--disabled">{{ title || Trans.t('NotFoundData') }}</div>
    <div v-if="text" class="text--disabled mx-auto" style="max-width: 600px">{{ text }}</div>
  </div>
</template>

<script>
import Trans from "../../tools/Trans";

export default {
  name: 'NotFoundData',
  methods: {Trans},
  props: {
    title: {
      default: null,
      type: [String]
    },
    text: {
      default: null,
      type: [String]
    }
  }
}
</script>

<style scoped>

</style>
