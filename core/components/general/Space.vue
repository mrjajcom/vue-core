<template>
  <div :style="'padding-left: ' + width +'px;' + (height ? 'height:'+height+'px':'')"></div>
</template>

<script>
export default {
  name: 'Space',
  props: {
    width: {
      type: [String, Number],
      default: 15
    },
    height: {
      type: [String, Number],
      default: ''
    }
  }

}
</script>

<style scoped>

</style>
