<template>
  <div>
    <assets-images
      v-if="value"
      :data="value"
      class="rounded-lg"
      height="188"
      width="190"
      show_buttons
      @remove="removed"
    >
      <upload accept="image/*" @then="uploaded"></upload>
    </assets-images>

    <upload v-else accept="image/*" @then="uploaded"></upload>

  </div>
</template>

<script>

import InputSelector from "@/components/selectors/InputSelector";
import AssetsImages from "@/components/assets/AssetsImages";
import Upload from "@/components/assets/Upload";

export default {
  name: 'UploadPhoto',
  components: {Upload, AssetsImages, InputSelector},
  props: {
    value: {
      default: null,
      type: String
    },
  },
  methods: {
    uploaded(result) {
      try {
        if (!result.hasOwnProperty('data')) return;
        this.$emit('input', result.data.id)
      } catch (e) {
      }
    },
    removed() {
      try {
        this.$emit('input', null)
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

</style>
