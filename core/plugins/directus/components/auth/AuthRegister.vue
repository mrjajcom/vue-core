<script setup>
import {reactive} from "vue";
import {useI18n} from "vue-i18n";
import {Messages} from "@/core/tools/Messages";
import {Directus} from "@/core/tools/Directus";
import ImageLogo from "@/core/components/files/ImageLogo.vue";
import {Configs} from "@/core/tools/Configs";

const props = defineProps({
  'request': {
    type: Directus,
    default: Directus.reactive()
  }
})
const emits = defineEmits([
  'click:login'
])

const {t} = useI18n();

/**
 * Body
 * @type {*}
 */
const body = reactive({email: '', password: '', first_name: '', last_name: ''})


/**
 * Register
 * @returns {Promise<void>}
 */
async function register() {
  const redirect = window.location.origin + Configs.get('users.redirect_after_verify', '/account/verify')
  const result = await props.request.register({
    email: body.email,
    password: body.password,
    first_name: body.first_name,
    last_name: body.last_name,
  }, redirect);
  if (!result) return;
  Messages.show(t('AccountVerificationEmailSent'))
  emits('click:login', result)
}

</script>

<template>
  <v-card
    :loading="request.loading"
    class="text-center py-8 rounded-lg border-light"
    width="100%"
    variant="outlined"
  >
    <ImageLogo :width="60"/>

    <div class="my-3">
      <h2>{{ $t('SignUp') }}</h2>
      <div>{{ $t('toContinueToGmail') }}</div>
    </div>

    <form v-on:submit.prevent="register">
      <div class="px-8">
        <v-text-field
          :label="$t('Email')+' *'"
          v-model="body.email"
          variant="outlined"
          type="email"
          required
        />
        <v-text-field
          :label="$t('Password')+' *'"
          v-model="body.password"
          variant="outlined"
          type="password"
          required
        />
        <v-text-field
          :label="$t('FirstName')"
          v-model="body.first_name"
          variant="outlined"
        />
        <v-text-field
          :label="$t('LastName')"
          v-model="body.last_name"
          variant="outlined"
        />
        <v-btn
          type="submit"
          color="primary"
          elevation="0"
          height="48"
          :block="true"
          :loading="request.loading"
          :disabled="request.loading || !body.email || !body.password"
        >
          {{ $t('SignUp') }}
        </v-btn>
      </div>
      <div class="d-flex mt-3 px-4 align-center justify-space-between">
        <v-btn
          type="button"
          color="primary"
          elevation="0"
          height="48"
          class="text-transform-none"
          variant="text"
          :block="true"
          @click="$emit('click:login')"
        >
          {{ $t('SignIn') }}
        </v-btn>
      </div>
    </form>
  </v-card>
</template>

<style scoped>

</style>
