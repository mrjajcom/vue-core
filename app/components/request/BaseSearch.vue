<template>
  <v-col cols="6" class="d-flex text-right align-center">
    <v-text-field
      v-model="request.search_keyword"
      append-icon="mdi-magnify"
      class="flex-grow-1 mr-md-2"
      solo
      hide-details
      dense
      :placeholder="placeholder ? placeholder : __('Search')"
      clearable
      @input="e => $emit('input', e)"
      @keyup.enter="e => $emit('enter', e)"
      @click:clear="e=> $emit('reset', e)"
    ></v-text-field>
    <v-btn
      :disabled="request.isLoading()"
      icon
      small
      @click="e=> $emit('reset', e)"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
import { GetRequest } from '@/models/GetRequest'

export default {
  name: 'BaseSearch',
  props: {
    request: {
      type: GetRequest,
      default: new GetRequest(),
      require: true
    },
    placeholder: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
