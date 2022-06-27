<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="text-center mt-10 text-h5">
          <p>Votre commande est validée, nous vous remercions d'utiliser notre plateforme et nous vous prions de patienter les instructions du livreur.</p>
          <v-btn
          :to="{name: 'home'}"
          outlined
          color="black">
            Retourner à l'accueil
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Validation',

  components: {

  }
})
</script>
