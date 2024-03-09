<template>
  <div>

    <div v-if="images.length > 0">
      <div v-if="multiple && images.length > 1" class="d-flex" @click="openModalImage">
        <v-hover v-if="left_images" v-slot="{hover}">
          <div
            :class="(hover ? 'custom-images-list-hover' : 'custom-images-list')+ ' overflow-y-auto mr-2'"
            :style="'max-height:'+height+'px'"
          >

            <v-img
              v-for="(item, index) in images"
              :key="'photo-item'+index"
              class="mb-1"
              :width="70"
              :src="item.url"
              aspect-ratio="1"
            />

          </div>
        </v-hover>

        <v-carousel
          :style="'width:'+width+'px'"
          :height="height"
          cycle
          :class="css_class"
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
          :next-icon="hide_delimiters ? '' : 'mdi-chevron-right'"
          :prev-icon="hide_delimiters ? '': 'mdi-chevron-left'"
        >
          <v-carousel-item
            v-for="item in images"
            :key="'photos-' + item.directus_files_id"
            :width="width"
            :height="height"
          >
            <v-img
              :width="width"
              :height="height"
              :contain="contain"
              :src="item.url"
            >
              <slot></slot>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </div>

      <v-img
        v-else
        :src="images[0].url"
        :contain="contain"
        :width="width"
        :height="height"
        :class="css_class"
        v-bind="$attrs"

        @click="openModalImage"
      >
        <slot></slot>
      </v-img>
    </div>

    <images-modal
      v-if="data && (data.length > 0)"
      v-model="modal_images"
      :data="images"
    ></images-modal>
  </div>
</template>

<script>
import app from '@/tools/App'
import urls from '@/tools/Urls'
import ImagesModal from '@/components/modal/ImagesModal'

export default {
  name: 'Photo',
  components: { ImagesModal },
  props: {
    data: {
      default: null,
      type: [Object, String, Array]
    },
    hide_delimiters: {
      default: false,
      type: Boolean
    },
    modal_disabled: {
      default: false,
      type: Boolean
    },
    css_class: {
      default: 'rounded-lg',
      type: String
    },
    contain: {
      default: false,
      type: Boolean
    },
    left_images: {
      default: false,
      type: Boolean
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
    }
  },
  data() {
    return {
      images: [],
      modal_images: false
    }
  },
  computed: {
    multiple() {
      if (this.data === null) return false

      return !((typeof this.data === 'string') || (typeof data === 'object'))
    },
    default_image() {
      return app.default_image
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    openModalImage(e) {
      if (!this.modal_disabled)
        this.modal_images = !this.modal_images
    },
    init() {
      try {
        if (this.data === null) {
          this.images = this.setDefaultImage()
        } else {
          if (this.multiple) {
            this.images = this.setImages()
          } else {
            this.images = this.setImage()
          }
        }
      } catch (e) {
        this.images = this.setDefaultImage()
        console.error(e)
      }
    },

    setDefaultImage() {
      return [{
        url: this.default_image,
        directus_files_id: 'null'
      }]
    },
    setImage() {
      if (typeof this.data === 'string') {
        return [
          {
            url: this.getUrl(this.data),
            directus_files_id: this.data
          }
        ]
      } else {
        return null
      }
    },
    setImages() {
      try {
        const result = []

        this.data.forEach((image) => {
          if (image.hasOwnProperty('directus_files_id')) {
            return result.push({
              url: this.getUrl(image.directus_files_id),
              directus_files_id: image.directus_files_id
            })
          }
        })
        if (result.length < 1) {
          return this.setDefaultImage()
        } else {
          return result
        }
      } catch (e) {
        console.error(e)

        return this.setDefaultImage()
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
        return this.default_image
      }
    }
  }
}
</script>

<style>
.custom-images-list::-webkit-scrollbar {
  width: 1px !important;
}

.custom-images-list-hover::-webkit-scrollbar {
  width: 7px !important;
}

</style>
