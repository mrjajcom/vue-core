<script setup>
import {VueDraggableNext} from 'vue-draggable-next'
import {computed} from "vue";
import {Utils} from "@/core/tools/Utils";

const props = defineProps({
  'modelValue': {
    type: [],
    default: []
  },
  'sortKey': {
    type: String,
    default: null,
  }
})

const emits = defineEmits([
  'update:modelValue',
  'change'
])

/**
 * List
 * @type {WritableComputedRef<*>}
 */
const list = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

function changeSort(e) {
  try {
    if (props.sortKey) props.modelValue?.forEach((item, index) => {
      if (!Utils.isObject(item)) return;
      item[props.sortKey] = index + 1
    })

    emits('change', e)
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <VueDraggableNext
    class="dragArea list-group w-full"
    v-model="list"
    @change="e => changeSort(e)"
  >
    <template v-for="(item, index) in modelValue">
      <slot name="item" :item="item" :index="index">
        {{ item }}
      </slot>
    </template>
  </VueDraggableNext>
</template>
