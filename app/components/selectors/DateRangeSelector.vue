<template>
  <div>
    <v-dialog
      ref="dialog"
      v-model="dialog"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :label="title ? title : __('DateRange')"
          :value="start === '-' ? __('All') : start + '/' + end"
          class="custom-selector-border rounded-lg"
          outlined
          readonly
          dense
          v-bind="attrs"
          v-on="on"
          @click="dialog = true"
          @input="(e) => $emit('input', e)"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        elevation="1"
        :value="value"
        range
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn text small color="default" @click="$refs.dialog.save(value)">
          {{ __('Cancel') }}
        </v-btn>
        <v-btn small color="primary" @click="pick">
          {{ __('OK') }}
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'DateRangeSelector',
  components: {},
  props: {
    title: {
      default: null,
      type: String
    },
    value: {
      default: null,
      type: [Array, Object]
    },
    custom: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      date: null,
      dialog: null
    }
  },
  computed: {
    start() {
      try {
        return this.value[0]
      } catch (e) {
        return '-'
      }
    },
    end() {
      try {
        return this.value[1]
      } catch (e) {
        return '-'
      }
    }
  },
  mounted() {

  },
  methods: {
    pick(e) {
      try {
        if (this.date.length === 1) this.date.push(this.date[0])
        this.dialog = false
        this.$emit('input', this.date)
      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>

<style>
</style>
