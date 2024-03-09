<template>
  <div>
    <v-avatar v-if="usage === 'avatar'" :size="width" class="elevation-1 grey lighten-3">
      <v-img
        :src="imageUrl"
        :contain="contain"
        :width="width"
        :class="css_class"
        :height="height"
        v-bind="$attrs"
      />
    </v-avatar>
    <v-img
      v-else
      :contain="contain"
      :src="imageUrl"
      :width="width"
      :class="css_class"
      :height="height"
      v-bind="$attrs"
    >
      <slot></slot>
    </v-img>
  </div>
</template>

<script>
import app from '@/tools/App'
import urls from '@/tools/Urls'

export default {
  name: 'AssetsImage',
  props: {
    usage:{
      type: String,
      default: 'image'
    },
    data: {
      default: null,
      type: String
    },
    css_class: {
      default: null,
      type: String
    },
    width: {
      default: null,
      type: [Number, String]
    },
    height: {
      default: null,
      type: [Number, String]
    },
    crop_width: {
      default: null,
      type: [Number, String]
    },
    crop_height: {
      default: null,
      type: [Number, String]
    },
    contain: {
      default: false,
      type: Boolean
    },
    quality: {
      default: 90,
      type: [Number, String]
    },
    type: {
      default: 'cover',
      type: String
    }
  },
  data() {
    return {
      // image_url: null
    }
  },
  computed:{
    imageUrl() {
      try {
        if (this.data === null) return app.default_image
        else return this.getUrl(this.data)
      } catch (e) {
        return app.default_image
      }
    }
  },
  mounted() {
    // this.setImage()
  },
  methods: {
    setImage() {
      try {

        if (this.data === null) this.image_url = app.default_image
        else this.image_url = this.getUrl(this.data)
      } catch (e) {
        this.image_url = app.default_image
      }
    },
    getUrl(id) {
      try {
        const url = urls.api('assets_url', [id])

        let params = `?fit=${this.type}`

        if (this.crop_width) params += `&width=${this.crop_width}`
        if (this.crop_height) params += `&height=${this.crop_height}`
        if (this.quality) params += `&quality=${this.quality}`

        return url + params
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
