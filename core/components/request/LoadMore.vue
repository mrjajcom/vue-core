<template>
  <div
      v-if="request.hasMore()"
      @click="request.loadMore()"
      v-bind="$attrs"
  >
    <span v-if="!request.loading">{{ Trans.t('LoadMore') }}</span>
    <span v-else>...</span>
  </div>
</template>

<script>
import {Directus} from "../../tools/Directus";
import Trans from "../../tools/Trans";

export default {
  name: 'LoadMore',
  props: {
    request: {
      type: Directus,
      default: Directus.factory()
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    Trans
  }

}
</script>

<style scoped>

</style>
