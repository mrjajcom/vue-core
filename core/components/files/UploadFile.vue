<script setup>

import {Directus} from "@/core/tools/Directus";
import {ref} from "vue";
import {File} from "@/core/models/files/File.model";
import {useI18n} from "vue-i18n";
import FileCard from "@/core/components/files/FileCard.vue";

const props = defineProps({
  'modelValue': File,
  'accept': String,
  'options': {},
  'fileInput': Boolean,
  'showResult': Boolean,
})

const emits = defineEmits([
  'uploaded',
  'update:modelValue'
])

const {t} = useI18n()

/**
 * Request
 * @type {Directus}
 */
const request = Directus.reactive()

/**
 * File
 * @type {Ref<any>}
 */
const file = ref()

/**
 * Reset
 * @return {Promise<void>}
 */
function reset() {
  file.value = null;
  emits('update:modelValue', File.factory())
}

/**
 * Upload
 */
async function upload() {
  const data = await request.withMessage(t('Uploaded')).withAuth().upload([file.value], props.options)
  if (!props.fileInput) file.value = null;
  if (!data) return;

  emits('uploaded', data)
  emits('uploaded:id', data?.id)
  emits('update:modelValue', File.factory(data))
}
</script>

<template>

  <!--  Show result  -->
  <file-card
    v-if="modelValue?.id && showResult"
    :data="modelValue"
    @remove="reset"
  />


  <label v-else>
    <!-- Card button   -->
    <slot v-if="!fileInput" :request="request">
      <file-card>
        <v-sheet class="file-add w-100 h-100 overflow-hidden">
          <v-progress-linear v-if="request?.loading" color="primary" :model-value="true" indeterminate/>
          <v-sheet class="w-100 h-100 d-flex align-center justify-center">
            <v-icon size="40" color="grey">$plus</v-icon>
          </v-sheet>
        </v-sheet>
      </file-card>
    </slot>

    <!--  Input  -->
    <v-file-input
      v-bind="$attrs"
      v-model="file"
      :loading="request?.loading"
      :accept="accept ?? 'image/*'"
      :class="!fileInput ? 'visibility-hidden' : ''"
      @change="upload"
    />
  </label>
</template>

<style scoped>
.file-add {
  border: 2px dashed rgba(var(--v-theme-darken-500));
}
</style>
