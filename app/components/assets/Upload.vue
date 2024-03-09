<template>
  <form ref="upload-form" @submit.prevent="submit">
    <input
      v-show="false"
      id="upload-file"
      ref="file"
      type="file"
      required
      :accept="accept"
      @input="setFile"
    >
    <div @click="$refs.file.click()">
      <slot>
        <div style="display: flex;">
          <v-card
            :loading="request.isLoading()"
            class="rounded-lg ma-1 overflow-hidden pointer"
            elevation="0"
            style="border:3px dashed rgba(0, 0, 0, 0.08); width: 190px; height: 188px"
          >

            <v-card-text>
              <div class="px-3 pt-7 align-center text-center">
                <div class="font-weight-bold subtitle-1">{{ __('UploadFile') }}</div>
                <div>{{ subtitle ? subtitle : __('ClickForUpload') }}</div>
              </div>
            </v-card-text>

          </v-card>
        </div>
      </slot>
    </div>

  </form>
</template>

<script>
import { PostRequest } from '@/models/PostRequest'

export default {
  name: 'Upload',
  props: {
    accept: {
      default: null,
      type: String
    },
    subtitle: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      request: new PostRequest('upload_file'),
      file: null
    }
  },
  mounted() {

  },
  methods: {
    setFile() {
      this.file = this.$refs.file.files[0]
      this.submit()
    },
    submit() {
      const formData = new FormData()

      formData.append('file', this.file)

      this.request.setHeaders({ 'Content-Type': 'multipart/form-data' })
      this.request.setBody(formData)
      this.request.setThen((data) => {
        this.reset()
        this.$emit('then', data)

      })
      this.request.post()
    },
    reset() {
      try {
        this.file = null
        this.$refs['upload-form'].reset()
        this.request.reset()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
