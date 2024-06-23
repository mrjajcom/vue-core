<script setup>

import {Urls} from "../../../../tools/Urls";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {Directus} from "@/core/tools/Directus";
import {Configs} from "@/core/tools/Configs";
import {Auth} from "@/core/tools/Auth";
import {Utils} from "@/core/tools/Utils";

const props = defineProps({
  'request':{
    type: Directus,
    default: Directus.reactive()
  }
})

const router = useRouter();

const route = useRoute()

const provider = computed(() => route?.query?.provider);
if (provider.value) refresh()

/**
 * Refresh with
 */
async function refresh() {
  await props.request.refresh()
  if (!Auth.isLogin()) return;

  const user = await props.request.setFields('*, role.name, role.id').withAuth().getUser()
  if (!user) return Utils.devLog('Not found user data after refresh token!');

  // Redirect
  let route = Configs.get('users.redirect_after_login')
  if (Utils.isFunction(route)) route = route(user)
  if (!route) return Utils.devLog('Not found "redirect_after_login"!');
  await router.push(route);
}

/**
 * Click
 */
function click() {
  const redirect = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname)
  redirect.searchParams.set('provider', 'google')
  const url = Urls.api() + '/auth/login/google?redirect=' + redirect.href
  open(url, '_self')
}
</script>

<template>
  <v-card class="d-flex align-center pa-4 border-light   rounded-lg" @click="click" variant="outlined" :disabled="request?.loading">
    <img src="../../../../assets/img/google.png" class="mr-2" width="30" alt="google"/>
    {{ $t('SingInByGoogle') }}
  </v-card>
</template>

