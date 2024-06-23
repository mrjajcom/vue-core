<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {Messages} from "@/core/tools/Messages";
import {Directus} from "@/core/tools/Directus";
import ImageLogo from "@/core/components/files/ImageLogo.vue";
import {Configs} from "@/core/tools/Configs";
import {Utils} from "@/core/tools/Utils";

const props = defineProps({
  'request': {
    type: Directus,
    default: Directus.reactive()
  }
})

defineEmits([
  'click:register',
  'click:forgot'
])

const router = useRouter();

const {t} = useI18n();

/**
 * Body
 * @type {*}
 */
const body = reactive({username: '', password: ''})

/**
 * Login
 * @returns {Promise<void>}
 */
async function login() {
  const user = await props.request.login(body.username, body.password);
  if (!props.request.hasResponse()) return;

  Messages.show(t('Welcome'))

  // redirect
  let route = Configs.get('users.redirect_after_login')
  if (Utils.isFunction(route)) route = route(user)
  if (!route) return Utils.devLog('Not found "redirect_after_login"!');
  await router.push(route);
}

</script>

<template>


  <!-- Sign in -->
  <v-card
    :loading="request.loading"
    class="text-center py-8 rounded-lg border-light"
    width="100%"
    variant="outlined"
  >
    <ImageLogo :width="60"/>

    <div class="my-3">
      <h2>{{ $t('SignIn') }}</h2>
      <div>{{ $t('toContinueToGmail') }}</div>
    </div>

    <form v-on:submit.prevent="login">
      <div class="px-8">
        <v-text-field
          :label="$t('UsernameOrEmail')"
          v-model="body.username"
          variant="outlined"
        />
        <v-text-field
          :label="$t('Password')"
          v-model="body.password"
          variant="outlined"
          type="password"
        />
        <v-btn
          type="submit"
          color="primary"
          elevation="0"
          height="48"
          :block="true"
          :loading="request.loading"
          :disabled="request.loading || !body.username || !body.password"
        >
          {{ $t('SignIn') }}
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
          @click="$emit('click:forgot')"
        >
          {{ $t('ForgotPassword') }}
        </v-btn>
        <v-btn
          type="button"
          color="primary"
          elevation="0"
          height="48"
          class="text-transform-none"
          variant="text"
          @click="$emit('click:register')"
        >
          {{ $t('CreateAccount') }}
        </v-btn>
      </div>
    </form>
  </v-card>

</template>

<style scoped>

</style>
