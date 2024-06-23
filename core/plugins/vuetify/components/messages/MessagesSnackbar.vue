<script setup>
import {Messages} from "@/core/tools/Messages";
import {ref} from "vue";

const messages = ref({})

/**
 * Update messages
 * @type {function(*): void}
 */
const updated_message_method = Messages.updated;
Messages.updated = function () {
  updated_message_method.apply(this, arguments);
  messages.value = {...(arguments?.[0])};
}
</script>

<template>
  <v-snackbar
    :model-value="true"
    v-for="(item, key) in messages"
    :key="key"
    :timeout="item?.timeout"
    v-bind="item?.options"
  >
    {{ $t(item?.text) }} 
  </v-snackbar>
</template>

<style scoped>

</style>
