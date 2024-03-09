<template>
  <span v-bind="$attrs" @click="request.post()">
    <slot>
      <v-btn :disabled="request.isLoading()" v-bind="$attrs" outlined @click="request.post()">
        {{ __('Logout') }}
      </v-btn>
    </slot>
  </span>
</template>

<script>

import { PostRequest } from '@/models/PostRequest'
import auth from '@/tools/Auth'

export default {
  name: 'Logout',
  data() {
    return {
      request: new PostRequest('logout')
    }
  },
  mounted() {
    this.request.setBody({ refresh_token: auth.getRefreshToken() })
    this.request.setFinally(() => this.logout())
  },
  methods: {
    logout() {
      auth.clear()
      this.$store.commit('setUserInfo', null)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

</style>
