<template>
  <v-card>
    <v-card-title>
      Créer votre produit
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" @submit="submit">
        <v-text-field
          name="name"
          v-model="product.name"
          label="Nom du produit"
          :rules="[
              v => !!v || 'Le nom du produit est requis',
            ]"
        />
        <v-textarea
          v-model="product.description"
          multi-line
          name="description"
          label="Description du produit"
          :rules="[
            v => !!v || 'La description du produit est requise',
            ]"
        />
        <v-text-field
          v-model="product.image"
          name="image"
          label="Lien vers l'image du produit"
          :rules="[
            v => !!v || 'Le lien vers l\'image du produit est requis',
            ]"
        />
        <v-text-field
          v-model="product.price"
          suffix="€"
          name="price"
          type="number"
          label="Prix du produit"
          :rules="[
            v => !!v || 'Le prix du produit est requis',
            ]"
        />
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
      product: JSON.parse(JSON.stringify(this.value)),
      valid: false
    }
  },
  computed: {

  },
  methods: {
    async submit () {
      if (this.product._id) {
        await this.axios.patch(`/shop/api/products/${this.product._id}`, this.product)
      } else {
        await this.axios.post('/shop/api/products', this.product)
      }
      this.$emit('save')
    }
  }
})
</script>
