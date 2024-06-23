<script setup>

import {useI18n} from "vue-i18n";
import {Utils} from "@/core/tools/Utils";

const props = defineProps({
  'modelValue': {
    default: null,
  },
  'customItems': {
    type: [],
    default: [],
  }
})
defineEmits(['update:modelValue'])

const {t} = useI18n()

const items = [
  {
    title: t('Published'),
    value: 'published'
  },
  {
    title: t('Draft'),
    value: 'draft'
  },
  {
    title: t('Archived'),
    value: 'archived'
  },
  ...(props.customItems)
]
</script>

<template>
  <v-select
    :items="items"
    :model-value="modelValue"
    @update:model-value="e => $emit('update:modelValue', e)"
  >
    <template #prepend-inner>
      <v-icon
        :color="Utils.getColor(modelValue)"
        :title="`${Utils.capitalize(modelValue)}`"
        class="text-capitalize bg-white rounded-md"
        size="12"
      >
        $circle
      </v-icon>
    </template>
  </v-select>
</template>

<style scoped>

</style>
