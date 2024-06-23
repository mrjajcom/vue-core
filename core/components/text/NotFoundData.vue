<template>
  <div class="text-center my-16 text-grey-lighten-1" v-bind="$attrs">
    <v-icon size="80" class="mb-1">$creationOutline</v-icon>
    <div class="py-7 pt-3 text-center font-size-20 ">{{ title || $t('NotFoundData') }}</div>
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
