<template>
  <v-img src="@/assets/img/logo-text.png" :alt="app_name" v-bind="$attrs"/>
</template>

<script>
import app from '@/tools/App'

export default {
  name: 'Logo',
  props:{
  },
  data() {
    return {
      app_name: app.app_name
    }
  }
}
</script>

<style scoped>

</style>
