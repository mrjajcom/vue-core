<template>
  <div class="full-width">
    <!--    <div v-if="!hide_label" class="font-weight-bold">{{ title || __('Status') }}</div>-->
    <v-select
      :label="!hide_label ? (title || __('Status')) : ''"
      :items="items"
      :value="value"
      :class="css_class"
      dense
      outlined
      v-bind="$attrs"
      @input="(e) => $emit('input', e)"
    ></v-select>
  </div>
</template>

<script>

export default {
  name: 'StatusSelector',
  props: {
    value: {
      default: null,
      type: String
    },
    items: {
      default: null,
      type: Array
    },
    hide_label: {
      default: false,
      type: Boolean
    },
    css_class: {
      default: 'custom-selector-border rounded-lg',
      type: String
    },
    title: {
      default: null,
      type: String
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
