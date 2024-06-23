<template>
  <v-text-field
    v-if="Utils.isObject(request)"
    v-bind="$attrs"
    v-model="request.keyword"
    @input="search"
    @keyup.enter="search"
  />
</template>

<script setup>
import {Directus} from "@/core/tools/Directus";
import {Utils} from "@/core/tools/Utils";

const props = defineProps({
  'request': {
    type: [Directus]
  }
})

const emits = defineEmits([
  'search'
])


const timer = ref(null)

/**
 * Search
 */
function search() {
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    props.request?.search()
    emits('search')
  }, 500)
}
</script>
