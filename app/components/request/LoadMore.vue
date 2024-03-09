<template>
  <v-row>
    <v-col cols="12">

      <!-- Pagination -->
      <div v-if="pagination" class="full-width d-flex align-center">
        <v-btn
          v-if="1 < request.page"
          color="primary"
          class="border-light rounded-lg"
          :disabled="request.is_loading"
          text
          large
          @click="back"
        >
          <span v-if="!request.is_loading">{{ __('Back') }}</span>
          <span v-else>...</span>
        </v-btn>

        <v-spacer/>

        <div v-if="1 < request.maxPage()" class="text--disabled mt-1">
          {{ request.page }} / {{ request.maxPage() }}
        </div>

        <v-spacer/>

        <v-btn
          v-if="request.hasMore()"
          color="primary"
          class="border-light rounded-lg"
          :disabled="request.isLoading() || !request.hasPage()"
          text
          large
          @click="next"
        >
          <span v-if="!request.is_loading">{{ __('Next') }}</span>
          <span v-else>...</span>
        </v-btn>
      </div>

      <!--   Load more button   -->
      <div v-else>
        <v-btn
          v-if="request.hasMore()"
          color="primary"
          class="border-light rounded-lg"
          :disabled="request.is_loading"
          block
          @click="request.loadMore()"
        >
          <span v-if="!request.is_loading">{{ __('LoadMore') }}</span>
          <span v-else>...</span>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { GetRequest } from '@/models/GetRequest'

export default {
  name: 'LoadMore',
  props: {
    request: {
      type: GetRequest,
      default: new GetRequest()
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    next() {
      this.request.nextPage()
      this.route()
    },
    back() {
      this.request.backPage()
      this.route()
    },
    route() {
      this.request.reload(false)
    }
  }

}
</script>

<style scoped>

</style>
