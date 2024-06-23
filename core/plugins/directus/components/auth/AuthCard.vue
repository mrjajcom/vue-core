<script setup>
import { Directus } from "@/core/tools/Directus";
import AuthGoogle from "@/core/plugins/directus/components/auth/AuthGoogle.vue";
import AuthGithub from "@/core/plugins/directus/components/auth/AuthGithub.vue";
import AuthRegister from "@/core/plugins/directus/components/auth/AuthRegister.vue";
import AuthLogin from "@/core/plugins/directus/components/auth/AuthLogin.vue";
import AuthForgot from "@/core/plugins/directus/components/auth/AuthForgot.vue";
import { Messages } from "@/core/tools/Messages";
import { useRoute, useRouter } from "vue-router";

defineProps({
  'request': {
    type: Directus,
    default: Directus.reactive()
  }
})

/**
 * Mode
 */
const mode = ref('login');

/**
 * Route
 */
const route = useRoute()
const router = useRouter()

if (route?.query?.reason) {
  Messages.show('errors.' + route?.query?.reason, { timeout: 10000 })
  const query = Object.assign({}, route.query);
  delete query.reason;
  router.replace({ query });
}

</script>

<template>
  <auth-register
    v-if="mode === 'register'"
    :request="request"
    @click:login="mode = 'login'"
  />

  <auth-forgot
    v-else-if="mode === 'forgot'"
    :request="request"
    @click:login="mode = 'login'"
  />

  <auth-login
    v-else
    :request="request"
    @click:register="mode = 'register'"
    @click:forgot="mode = 'forgot'"
  />

  <v-row
    class="mt-3"
    no-gutters
  >
    <v-col cols="12">
      <AuthGoogle
        class="mb-2"
        :request="request"
      />
    </v-col>
    <v-col cols="12">
      <AuthGithub :request="request" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
