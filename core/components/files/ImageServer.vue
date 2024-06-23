<script setup>
import {computed} from "vue";
import {Directus} from "@/core/tools/Directus";
import {Utils} from "@/core/tools/Utils";

const props = defineProps(['data', 'alt', 'index', 'cropWidth', 'cropHeight', 'quality', 'type']);

const directus = Directus.reactive()

const url = computed(() => {
  let data = props.data;
  if (Utils.isArray(props.data)) data = {...props.data?.[props.index ?? 0]}
  const url = directus.asset(data)

  let params = ''
  if (props.type) `&fit=${props.type}`
  if (props.cropWidth) params += `&width=${props.cropWidth}`
  if (props.cropHeight) params += `&height=${props.cropHeight}`
  if (props.quality) params += `&quality=${props.quality}`

  return url + params
})
</script>

<template>
  <v-img :src="url" :alt="alt" v-bind="$attrs">
    <slot></slot>
  </v-img>
</template>

