<script setup>

import ImageServer from "@/core/components/files/ImageServer.vue";
import {Directus} from "@/core/tools/Directus";
import {Configs} from "@/core/tools/Configs";
import {useRouter} from "vue-router";

defineProps({
  'data': {
    type: Object,
  },
  'hideMenu': {
    type: Boolean,
    default: false,
  }
})

/**
 * Router
 * @type {Router}
 */
const router = useRouter();

/**
 * Logout
 */
async function logout() {
  const directus = Directus.reactive();
  await directus.logout()
  await router.push(Configs.get('plugins.router.auth.login_route'))
}


</script>

<template>
  <v-list class="py-0">
    <v-list-item>
      <template #prepend>
        <v-avatar :title="data?.role?.name">
          <v-icon v-if="!data?.avatar">$account</v-icon>
          <image-server v-else :data="data?.avatar" width="60" height="60"/>
        </v-avatar>
      </template>
      <template #title>
        {{ data?.first_name }} {{ data?.last_name }}
      </template>
      <template #subtitle> 
        <span>{{ data?.email }}</span>
      </template>
      <template #append>
        <v-btn v-if="!hideMenu" :icon="true" @click="logout()" :title="$t('Logout')" :flat="true">
          <v-icon color="grey">$exitToApp</v-icon>
        </v-btn>
        <slot name="append"></slot>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped>

</style>
