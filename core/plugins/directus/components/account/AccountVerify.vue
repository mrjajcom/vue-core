<script setup>
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {Messages} from "@/core/tools/Messages";
import {Configs} from "@/core/tools/Configs";
import {Utils} from "@/core/tools/Utils";
import {Directus} from "@/core/tools/Directus";
import Loading from "@/core/plugins/vuetify/components/general/Loading.vue";
import {onMounted} from "vue";

const router = useRouter();
const route = useRoute();

const {t} = useI18n();

onMounted(() => {
  submit()
})

/**
 * Request
 * @type {Directus}
 */
const request = Directus.reactive()

/**
 * Verify
 * @returns {Promise<void>}
 */
async function submit() {
  if (!route?.query?.token) return redirect()

  await request.verify(route?.query?.token);
  if (!request.hasResponse()) return;

  Messages.show(t('YourAccountVerified'))
  await redirect()
}

/**
 * Redirect
 * @return {Promise<NavigationFailure|void>}
 */
async function redirect() {
  const path = Configs.get('users.redirect_to_login')
  if (!path) {
    Utils.devLog('Not found "redirect_to_login"!');
    return await router.push('/');
  }
  await router.push(path);
}


</script>

<template>
  <!-- Sign in -->
  <v-card
    class="text-center py-8 rounded-lg"
    width="100%"
    variant="flat"
  >
    <loading/>
  </v-card>
</template>

<style scoped>

</style>
