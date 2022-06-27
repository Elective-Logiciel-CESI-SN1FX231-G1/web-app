<template>
  <v-dialog
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" fab small tile v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
    <v-card>
      <v-card-title>
        Supprimer {{ label }}
      </v-card-title>
      <v-card-text>
        <v-alert type="error">
          Cette actions est définitive
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="dialog.value=false">
          Annuler
        </v-btn>
        <v-btn color="error" @click="dialog.value=false;$emit('delete')">
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {

  },
  props: {
    label: { type: String, required: true }
  }
})
</script>
