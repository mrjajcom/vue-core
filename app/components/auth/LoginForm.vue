<template>
  <div>
    <v-form ref="form" v-model="isFormValid" @submit.prevent="submit">

      <v-text-field
        v-model="request.body.email"
        :rules="[rules.required]"
        :label="__('loginEmail')"
        validate-on-blur
        :name="__('email')"
        outlined
        required
        type="email"
      ></v-text-field>

      <v-text-field
        v-model="request.body.password"
        validate-on-blur
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.containsSpecial, rules.containsLowercase,
                 rules.containsNumber, rules.maxLength,
                 rules.minLength, rules.containsUppercase]"
        :type="showPassword ? 'text' : 'password'"
        :label="__('loginPassword')"
        :name="__('password')"
        outlined
        required
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        :loading="request.isLoading()"
        type="submit"
        :disabled="request.isLoading() || !request.body.email  || !request.body.password"
        block
        x-large
        color="primary"
      >{{ __('Login') }}
      </v-btn>

      <div v-if="false" class="mt-5">
        <router-link to="/auth/forgot-password">
          {{ __('ForgotPassword') }}
        </router-link>
      </div>
    </v-form>
  </div>
</template>

<script>
import { PostRequest } from '@/models/PostRequest'
import auth from '@/tools/Auth'

export default {
  name: 'LoginForm',
  components: {},
  props: {
    request: {
      type: PostRequest,
      default: new PostRequest()
    }
  },
  data() {
    return {
      // sign in buttons
      isSignInDisabled: false,

      // form
      isFormValid: true,
      showPassword: false

    }
  },
  computed:{

    rules() {
      return {
        required: (value) => (value && Boolean(value)) || 'Required',
        match: (value) => (value === this.request.body.password) || this.__('PasswordNotMatch'),
        containsUppercase: (value) => /[A-Z]/.test(value) || this.__('PasswordMustHaveUppercaseLetter'),
        containsLowercase: (value) => /[a-z]/.test(value) || this.__('PasswordMustHaveLowercaseLetter'),
        containsNumber: (value) => /[0-9]/.test(value) || this.__('PasswordMustHaveNumber'),
        containsSpecial: (value) => /[#?!@$%^&*-]/.test(value) || this.__('PasswordMustHaveSpecialCharacter'),
        minLength: (value) => (value && value.length > 7) || this.__('PasswordMustMoreSevenCharacters'),
        maxLength: (value) => (value && value.length < 32) || this.__('PasswordMustLessTenCharacters')
      }
    }
  },
  methods: {
    submit() {
      auth.clear()
      this.request.post()
    }
  }
}
</script>
