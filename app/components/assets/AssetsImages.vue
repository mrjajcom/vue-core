<template>
  <div v-if="data">
    <!--  Slider  -->
    <v-carousel
      v-if="carousel"
      :height="height"
      cycle
      hide-delimiter-background
      :hide-delimiters="hide_delimiters"
      :next-icon="hide_delimiters ? '' : 'chevron-right'"
      :prev-icon="hide_delimiters ? '': 'chevron-left'"
    >
      <v-carousel-item
        v-for="(item, i) in images"
        :key="getUrl(item)+i"
      >
        <v-img
          :height="height"
          :width="width"
          :src="getUrl(item)"
          class="rounded-lg ml-1"
          v-bind="$attrs"
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <!--  Default Images  -->
    <div v-else class="d-flex flex-wrap">
      <v-img
        v-for="(item, index) in images"
        :key="index"
        :max-height="height"
        :max-width="width"
        :src="getUrl(item)"
        class="rounded-lg ma-1 secondary"
        v-bind="$attrs"
      >
        <slot name="image" :item="item" :index="index">
          <template v-if="show_buttons">
            <v-btn class="float-left" icon @click="$emit('remove', index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn class="float-right" icon @click="downloadImage(item)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </slot>
      </v-img>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import app from '@/tools/App'
import urls from '@/tools/Urls'

export default {
  name: 'AssetsImages',
  inheritAttrs: false,
  props: {
    data: {
      default: null,
      type: [Array, Object, String]
    },
    width: {
      default: null,
      type: [Number, String]
    },
    height: {
      default: null,
      type: [Number, String]
    },
    quality: {
      default: 90,
      type: [Number, String]
    },
    type: {
      default: 'cover',
      type: String
    },
    carousel: {
      default: false,
      type: Boolean
    },
    hide_delimiters: {
      default: false,
      type: Boolean
    },
    show_buttons: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed:{
    images() {
      if (this.data === null) return []
      if (typeof this.data === 'string') return [this.data]
      if ((typeof this.data === 'object') && this.data.hasOwnProperty('directus_files_id')) return [this.data]

      return this.data
    }
  },
  mounted() {

  },
  methods: {
    downloadImage(item) {
      let url = ''

      if (typeof item === 'string') url = urls.api('assets_url', [item])
      else url = urls.api('assets_url', [item.directus_files_id])
      if (url.length > 0) window.location = url + '?download'
    },
    getUrl(item) {
      try {
        let url = ''

        if (typeof item === 'string') url = urls.api('assets_url', [item])
        else url = urls.api('assets_url', [item.directus_files_id])

        let params = `?fit=${this.type}`

        if (this.width) params += `&width=${this.width}`
        if (this.height) params += `&height=${this.height}`
        if (this.quality) params += `&quality=${this.quality}`

        return url + params
      } catch (e) {
        return app.default_image
      }
    }
  }
}
</script>

<style scoped>

</style>
