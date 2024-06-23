<template>
  <div>
    <div :class="['font-weight-bold',(disabled ? 'text--disabled' : '')]">{{ title ? title : __('Date') }}</div>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :disabled="disabled"
      :return-value.sync="result"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="result"
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

      <v-date-picker v-model="result" scrollable>
        <v-spacer></v-spacer>
        <v-btn small text color="default" @click="$refs.dialog.save(result)">
          {{ __('Cancel') }}
        </v-btn>
        <v-btn small color="primary" @click="select">
          {{ __('OK') }}
        </v-btn>
      </v-date-picker>

    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'DateSelector',
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
      result: null,
      dialog: null,
      modal: null,
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
    dateSetter(result) {
      if (result === null) return;
      if (!result.includes('T'))  return this.result = result;
      const dateTime = result.split('T')
      this.result = dateTime[0];
    },
    select() {
      this.$emit('input', this.result)
      this.$refs.dialog.save(this.result)
    },
  },

}
</script>

<style>
</style>
