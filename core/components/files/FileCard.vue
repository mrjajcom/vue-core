<script setup>


import {File} from "@/core/models/files/File.model";
import ImageServer from "@/core/components/files/ImageServer.vue";
import BtnClose from "@/core/plugins/vuetify/components/buttons/btn-close.vue";

defineProps({
  'data': File,
  'title': String,
})

defineEmits([
  'remove'
])

</script>

<template>
  <!-- With data -->
  <div v-if="data">
    <v-card v-bind="$attrs" color="darken-100" width="120" height="120" variant="flat">
      <div class="position-absolute" style="z-index: 1;right:0;">
        <btn-close
          :icon-props="{'color':'grey', 'size':20}"
          density="compact"
          variant="flat"
          @click="$emit('remove', data)"
        />

      </div>
      <!-- Image   -->
      <template v-if="data?.type?.indexOf('image/') !== -1">
        <image-server :data="data" width="120" height="120"/>
      </template>

      <v-sheet v-else color="darken-100" class="bg-grey h-100 d-flex align-center justify-center" >
        {{ data?.type ?? $t('File') }}
      </v-sheet>
    </v-card>

  </div>

  <!-- Without data  -->
  <template v-else>
    <v-card class="pointer" v-bind="$attrs" width="120" height="120" variant="flat">
      <slot></slot>
    </v-card>
  </template>
</template>

