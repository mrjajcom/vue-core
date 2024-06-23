<script setup>

import {Urls} from "../../../../tools/Urls";

/**
 * Click
 */
function click() {
  const redirect = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname)
  redirect.searchParams.set('provider', 'github')
  console.error(redirect.href)
  const url = Urls.api() + '/auth/login/github?redirect=' + redirect.href
  open(url)
}
</script>

<template>
  <v-card class="d-flex align-center pa-4 border-light rounded-lg" @click="click" variant="outlined">
    <img src="../../../../assets/img/github.png" class="mr-2" width="30" alt="google"/>
    {{ $t('SingInByGithub') }}
  </v-card>
</template>

