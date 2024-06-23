<script setup>
import {Configs} from "@/core/tools/Configs";

const props = defineProps(['configPath', 'default'])
const component = Configs.get(props.configPath, props.default);

</script>

<template>
  <component v-bind:is="component" v-bind="$attrs"/>
</template>

<style scoped>

</style>
