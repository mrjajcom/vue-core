<template>
  <div>
    <div :class="['font-weight-bold',(disabled ? 'text--disabled' : '')]">{{ title ? title : __('DateTime') }}</div>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :disabled="disabled"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="date + ' '+ time"
          outlined
          dense
          append-icon="mdi-calendar"
          readonly
          :disabled="disabled"
          v-bind="attrs"
          @click="modal = true"
          v-on="on"
        ></v-text-field>
      </template>

      <v-date-picker v-if="!showTimePicker" v-model="date" scrollable>
        <v-btn
          text
          small
          color="primary"
          @click="showTimePicker = !showTimePicker"
        >
          <v-icon x-small>mdi-clock</v-icon> &shy;
          {{ time }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small text color="default" @click="$refs.dialog.save(date)">
          {{ __('Cancel') }}
        </v-btn>
        <v-btn small color="primary" @click="select">
          {{ __('OK') }}
        </v-btn>
      </v-date-picker>

      <v-time-picker
        v-if="showTimePicker"
        v-model="time"
        scrollable
        use-seconds
        format="24hr"
      >
        <v-btn
          text
          small
          color="primary"
          @click="showTimePicker = !showTimePicker"
        >
          <v-icon x-small>mdi-calendar</v-icon>&shy;
          {{ date }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small text color="default" @click="$refs.dialog.save(date)">
          {{ __('Cancel') }}
        </v-btn>
        <v-btn small color="primary" @click="select">
          {{ __('OK') }}
        </v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'DateTimeSelector',
  components: {},
  props: {
    value: {
      default: null,
      type: String
    },
    title: {
      default: null,
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
  },

  data() {
    return {
      date: null,
      dialog: null,
      modal: null,
      time: '00:00:00',
      showTimePicker: false
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      this.dateSetter(newVal)
    }
  },

  mounted() {
    this.dateSetter(this.value);
  },
  methods: {
    dateSetter(date) {

      this.showTimePicker = false;
      if (date !== null) {
        if (date.includes('T')) {
          const dateTime = date.split('T')

          this.date = dateTime[0]
          this.time = dateTime[1]
        } else {
          this.date = date
        }
      }
    },
    select() {
      let result = this.date

      if (this.time !== null) {
        result = result + 'T' + this.time
      }
      this.$emit('input', result)
      this.$emit('input-time', this.time)
      this.$emit('input-date', this.date)
      this.$refs.dialog.save(this.date)
    }
  }
}
</script>

<style>
</style>
