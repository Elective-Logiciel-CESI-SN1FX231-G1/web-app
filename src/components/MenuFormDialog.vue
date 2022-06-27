<template>
  <v-dialog
    width="500"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" dark fab small tile v-bind="attrs" v-on="on">
        <v-icon v-if="value && value._id">mdi-pencil</v-icon>
        <v-icon v-else>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <menu-form
        :value="value"
        @save="dialog.value=false;$emit('update')"
        @cancel="dialog.value=false"
      />
    </template>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuForm from '@/components/MenuForm.vue'

export default Vue.extend({
  components: {
    MenuForm
  },
  props: {
    value: { type: Object, required: false }
  }
})
</script>
