<template>
  <div class="full-width">
    <div v-if="!hide_label" class="font-weight-bold">{{ title || __('Hours') }}</div>
    <v-autocomplete
      v-if="!readonly"
      v-model="result"
      auto-select-first
      chips
      :clearable="!readonly"
      :deletable-chips="!readonly"
      multiple
      small-chips
      :disabled="disabled"
      :readonly="readonly"
      :outlined="!readonly"
      :solo="readonly"
      v-bind="$attrs"
      :items="items"
      :append-icon="readonly? '' :'mdi-plus'"
      @click:append="dialog=!dialog"
    ></v-autocomplete>

    <v-chip-group
      v-else-if="readonly"
      show-arrows
    >
      <v-chip
        v-for="(tag, index) in items"
        :key="'tag-hours-' + index"
        outlined
        small
      >
        {{ tag.text }}
      </v-chip>
    </v-chip-group>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      hide-overlay
      persistent
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>{{ __('SelectHours') }}</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col class="col-dense" cols="12">
              <div class="font-weight-bold">{{ __('SelectDay') }}</div>
            </v-col>
          </v-row>
          <v-row dense class="mt-1">
            <v-col class="col-dense" cols="12">
              <v-select
                v-model="day"
                :label="__('Day')"
                return-object
                :items="days"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="col-dense" cols="12">
              <div class="font-weight-bold">{{ __('OpenAt') }}</div>
            </v-col>
          </v-row>
          <v-row dense class="mt-1">
            <v-col class="col-dense" cols="6">
              <v-select
                v-model="times.open_hour"
                :items="hours"
                :label="__('Hour')"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col class="col-dense" cols="6">
              <v-select
                v-model="times.open_minute"
                :items="minutes"
                :label="__('Minute')"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="col-dense" cols="12">
              <div class="font-weight-bold">{{ __('CloseAt') }}</div>
            </v-col>
          </v-row>
          <v-row dense class="mt-1">
            <v-col class="col-dense" cols="6">
              <v-select
                v-model="times.close_hour"
                :items="hours"
                :label="__('Hour')"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col class="col-dense" cols="6">
              <v-select
                v-model="times.close_minute"
                :items="minutes"
                :label="__('Minute')"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text small color="default" @click="dialog = false">{{ __('Close') }}</v-btn>
          <v-btn small color="primary" @click="addTime">{{ __('Select') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

export default {
  name: 'HourSelector',
  props: {
    value: {
      type: Array,
      default: null
    },
    readonly: {
      default: false,
      type: Boolean
    },
    hide_label: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    title: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      dialog: false,
      times: {
        open_hour: '00',
        close_hour: '00',
        open_minute: '00',
        close_minute: '00'
      },
      day: null,
      result: [],
      items: []
    }
  },
  computed: {
    hours() {
      const hours = []

      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? '0' + i : i.toString()

        hours.push(hour)
      }

      return hours
    },
    minutes() {
      const minutes = []

      for (let i = 0; i < 60; i++) {
        const minute = i < 10 ? '0' + i : i.toString()

        minutes.push(minute)
      }

      return minutes
    },
    days() {
      return [
        {
          text: this.__('Monday'),
          value: 0
        },
        {
          text: this.__('Tuesday'),
          value: 1
        },
        {
          text: this.__('Wednesday'),
          value: 2
        },
        {
          text: this.__('Thursday'),
          value: 3
        },
        {
          text: this.__('Friday'),
          value: 4
        },
        {
          text: this.__('Saturday'),
          value: 5
        },
        {
          text: this.__('Sunday'),
          value: 6
        }
      ]
    }
  },
  watch: {
    result(newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted() {
    this.init()
    this.day = this.days[0]
  },
  methods: {
    init() {
      //{ "open": { "day": 0, "time": "1200" }, "close": { "day": 0, "time": "2100" } }
      if (this.value) {
        for (const time of this.value) {
          if (time.hasOwnProperty('open')) {
            this.day = this.days.filter((d) => d.value === time.open.day)[0]
            this.times.open_hour = time.open.time.substr(0, 2)
            this.times.open_minute = time.open.time.substr(2, 2)
          }
          if (time.hasOwnProperty('close')) {
            this.day = this.days.filter((d) => d.value === time.close.day)[0]
            this.times.close_hour = time.close.time.substr(0, 2)
            this.times.close_minute = time.close.time.substr(2, 2)
          }
          this.addTime()
        }
      }
    },
    addTime() {
      const tmpText = this.day.text + ':' + this.times.open_hour.toString() + '-' + this.times.close_hour.toString()
      let duplicated = false

      this.items.forEach((i) => {
        if (i.text === tmpText) duplicated = true
      })
      const result = {
        'open': {
          'day': this.day.value,
          'time': this.times.open_hour.toString() + this.times.open_minute.toString()
        },
        'close': {
          'day': this.day.value,
          'time': this.times.close_hour.toString() + this.times.close_minute.toString()
        }
      }

      if (duplicated) {
        result.duplicated = Math.random()
      }

      this.items.push({
        text: tmpText,
        value: result
      })
      this.returnResult(result)

      this.dialog = false
    },
    returnResult(result) {
      this.result.push(result)
    }
  }
}
</script>

<style scoped>
  .col-dense {
    padding-top: 0;
    padding-bottom: 0
  }
</style>
