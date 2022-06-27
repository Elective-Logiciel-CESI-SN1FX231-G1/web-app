<template>
  <v-card>
    <v-card-title>
      Créer votre restaurant
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" @submit="submit">
        <v-text-field
          name="name"
          v-model="restaurant.name"
          label="Nom du restaurant"
          :rules="[
              v => !!v || 'Le nom du restaurant est requis',
            ]"
        />
        <v-textarea
          v-model="restaurant.description"
          multi-line
          name="description"
          label="Description du restaurant"
          :rules="[
            v => !!v || 'La description du restaurant est requise',
            ]"
        />
        <v-text-field
          v-model="restaurant.address"
          name="address"
          label="Adresse du restaurant"
          :rules="[
            v => !!v || 'L\'adresse du restaurant est requise',
            ]"
        />
        <v-text-field
          v-model="restaurant.image"
          name="image"
          label="Lien vers l'image du restaurant"
          :rules="[
            v => !!v || 'Le lien vers l\'image du restaurant est requis',
            ]"
        />
        <v-select
          v-model="restaurant.types"
          :items="types"
          name="types"
          item-text="name"
          item-value="name"
          chips
          label="Types"
          multiple
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" @click="$emit('cancel')">Annuler</v-btn>
      <v-btn
        color="success"
        :disabled="!valid"
        @click="submit"
      >
        Valider
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import types from '@/assets/types'
import Vue from 'vue'

export default Vue.extend({
  components: {

  },
  props: {
    value: { type: Object, required: false, default: () => ({}) }
  },
  data () {
    return {
      types,
      restaurant: JSON.parse(JSON.stringify(this.value)),
      valid: false
    }
  },
  watch: {
    value () {
      this.restaurant = JSON.parse(JSON.stringify(this.value))
    }
  },
  computed: {

  },
  methods: {
    async submit () {
      if (this.restaurant._id) {
        await this.axios.patch(`/shop/api/restaurants/${this.restaurant._id}`, this.restaurant)
      } else {
        await this.axios.post('/shop/api/restaurants', this.restaurant)
      }
      this.$emit('save')
    }
  }
})
</script>
