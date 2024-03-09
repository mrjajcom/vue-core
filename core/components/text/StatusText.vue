<template>
  <span :class="status.color" v-bind="$attrs">
    <span>{{ Trans.t(data) }}</span>
  </span>
</template>

<script>
import Trans from "../../tools/Trans";

export default {
  name: 'StatusText',
  methods: {Trans},
  props: {
    data: {
      default: null,
      type: String,
      require: true
    },
    color: {
      default: 'transparent',
      type: String
    }
  },
  computed: {
    status() {
      if (this.data === 'active') {
        return {
          value: true,
          color: 'text-success',
          icon: 'mdi-check-circle'
        }
      } else if ((this.data === 'archived') || (this.data === 'expired')) {
        return {
          value: false,
          color: 'text-error',
          icon: 'mdi-close-circle'
        }
      } else {
        return {
          value: null,
          color: 'text-warning',
          icon: 'mdi-pause-circle'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
