<template>
  <v-chip :color="color" outlined class="none_space">
    <v-icon
      class="none_space"
      small
      :color="status.color"
    >
      {{ status.icon }}
    </v-icon>&nbsp;
    <span style="color: black">&shy;{{ __(data) | capitalize }}</span>
  </v-chip>
</template>

<script>
export default {
  name: 'StatusIcon',
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
      if (this.data === 'active' || this.data === 'published') {
        return {
          value: true,
          color: 'success',
          icon: 'mdi-check-circle'
        }
      } else if ((this.data === 'archived') || (this.data === 'expired')) {
        return {
          value: false,
          color: 'error',
          icon: 'mdi-close-circle'
        }
      } else {
        return {
          value: null,
          color: 'warning',
          icon: 'mdi-pause-circle'
        }
      }
    }
  }
}
</script>

<style scoped>
.none_space {
  padding: 0;
  margin: 0;
}
</style>
