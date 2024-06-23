<script setup>
import {Files} from "@/core/models/files/Files.model";
import UploadFile from "@/core/components/files/UploadFile.vue";
import FileCard from "@/core/components/files/FileCard.vue";

const props = defineProps({
  'modelValue': {
    type: Files,
    default: Files.factory()
  },
  'label': String,
})

const emits = defineEmits([
  'update:modelValue'
])

/**
 * Update model value
 * @param data
 */
function update(data = undefined) {
  emits('update:modelValue', data !== undefined ? data : props.modelValue)
}

/**
 * Delete file
 */
function remove(index) {
  props.modelValue.data.remove(index);
}

/**
 * Add file
 * @param data
 */
function add(data) {
  props.modelValue?.add(data);
  update()
}
</script>

<template>
  <slot name="label">
    <div v-if="label" class="mb-2">
      <small class="text-grey-darken-1">{{label}}</small>
    </div>
  </slot>

  <div class="files">
    <!-- Images   -->
    <template v-if="modelValue?.data?.count()">
      <template v-for="(item, index) in modelValue?.data.get()" :key="'file-card-'+index">
        <file-card
          class="float-left mr-2"
          :data="item"
          @remove="remove(index)"
        />
      </template>
    </template>

    <!--  Add  -->
    <upload-file
      @uploaded="add"
      v-bind="$attrs"
      class="float-left"
    />
  </div>
</template>


<style>

</style>
