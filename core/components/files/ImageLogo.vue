<script setup>
import {App} from "@/core/tools/App";
import {ref} from "vue";

const src = ref(App.get('logo'));
const alt = ref(App.get('name'))
</script>

<template>
  <img :src="src" :alt="alt" v-bind="$attrs"/>
</template>

<style scoped>

</style>
