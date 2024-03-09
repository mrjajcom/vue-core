<template>
  <div>
    <v-card class="text-center" :loading="request.isLoading()">
      <div class=" pa-3">
        <v-card-title class="justify-center display-1">{{ __('Welcome') }}</v-card-title>
        <v-card-subtitle class="mb-3">{{ __('SignInToYourAccount') }}</v-card-subtitle>

        <!-- sign in form -->
        <v-card-text>
          <LoginForm :request="request"/>
        </v-card-text>
      </div>
    </v-card>

  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm'
import { PostRequest } from '@/models/PostRequest'
import { GetRequest } from '@/models/GetRequest'
import auth from '@/tools/Auth'

export default {
  name: 'Login',
  components: { LoginForm },
  data() {
    return {

      request: new PostRequest('login'),
      user_info_request: new GetRequest('get_current_user')

    }
  },

  mounted() {
    this.setBody()
    this.request.setMessage(this.__('Welcome'))
    this.request.setThen(this.then)
  },
  methods: {

    then(response) {
      try {
        if (!response || !response.data || !response.data.access_token) throw new Error('Login failed!')

        // save token
        auth.saveToken(response.data.access_token)
        auth.saveRefreshToken(response.data.refresh_token)
        auth.saveExpiration(response.data.expires)

        this.getUser()

      } catch (e) {
        console.error(`${e.name}: ${e.message}`)
      }
    },
    setBody() {
      this.request.setBody({
        email: null,
        password: null
      })
    },

    getUser() {
      try {
        this.user_info_request.setThen(this.afterGetUser)
        this.user_info_request.setFields('*, role.*')
        this.user_info_request.get()
      } catch (e) {
        console.error(`${e.name}: ${e.message}`)
      }
    },

    redirect() {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect)
      } else {
        this.$router.push({ name: 'Dashboard' })
      }
    },

    afterGetUser(response) {
      if (!response || !response.data || !response.data.id) throw new Error('Can not get user info!')
      auth.setUserInfo(response.data)
      this.$store.commit('setUserInfo', response.data)
      this.$emit('authorised', true)
      this.redirect()
    }
  }
}
</script>
