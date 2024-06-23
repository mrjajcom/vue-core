<template>
  <component
    v-bind:is="component  ?? 'img'"
    :src="App.get('logo')"
    :alt="name"
    v-bind="$attrs"
  >
  </component>
</template>

<script setup>
import {App} from "@/core/tools/App";

defineProps(['component'])
const name = App.get('name')
</script>

