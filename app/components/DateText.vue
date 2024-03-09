<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span
        v-if="data"
        v-bind="attrs"
        v-on="on"
      >{{ date }}</span>
    </template>
    <span>{{ title }}</span>
  </v-tooltip>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateText',
  props: {
    data: {
      default: null,
      type: [String, Object]
    },
    normal: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    date() {
      try {
        if (this.normal) return this.dateTime();
        return moment(this.data).fromNow()
      } catch (e) {
        return '-'
      }
    },
    title(){
      if (this.normal) return moment(this.data).fromNow();
      return this.dateTime();
    }

  },
  methods:{
    dateTime(){
        try {
          const created_at = new Date(this.data)
          const date = created_at.getFullYear() + '-' + (created_at.getMonth() + 1) + '-' + created_at.getDate()
          const time = created_at.getHours() + ':' + created_at.getMinutes() + ':' + created_at.getSeconds()

          return date + ' ' + time
        } catch (e) {
          return '-'
        }

    }
  }

}
</script>

<style scoped>

</style>
