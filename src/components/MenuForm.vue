<template>
  <v-card>
    <v-card-title>
      Créer votre menu
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" @submit="submit">
        <v-text-field
          name="name"
          v-model="menu.name"
          label="Nom du menu"
          :rules="[
              v => !!v || 'Le nom du menu est requis',
            ]"
        />
        <v-textarea
          v-model="menu.description"
          multi-line
          name="description"
          label="Description du menu"
          :rules="[
            v => !!v || 'La description du menu est requise',
            ]"
        />
        <v-text-field
          v-model="menu.image"
          name="image"
          label="Lien vers l'image du menu"
          :rules="[
            v => !!v || 'Le lien vers l\'image du menu est requis',
            ]"
        />
        <v-text-field
          v-model="menu.price"
          suffix="€"
          name="price"
          type="number"
          label="Prix du menu"
          :rules="[
            v => !!v || 'Le prix du menu est requis',
            ]"
        />
        <v-select
          :items="products"
          v-model="menu.products"
          label="Produits"
          :rules="[
            v => !!v || 'Les produits du menu sont requis',
            ]"
          item-text="name"
          item-value="_id"
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
    const menu = JSON.parse(JSON.stringify(this.value))
    if (menu?.products?.length && typeof (menu.products[0]) === 'object') menu.products = menu.products.map(p => p._id)
    return {
      types,
      menu,
      valid: false,
      products: []
    }
  },
  computed: {

  },
  methods: {
    async submit () {
      if (this.menu._id) {
        await this.axios.patch(`/shop/api/menus/${this.menu._id}`, this.menu)
      } else {
        await this.axios.post('/shop/api/menus', this.menu)
      }
      this.$emit('save')
    }
  },
  async mounted () {
    this.products = (await this.axios.get('/shop/api/products?size=0')).data.results
  }
})
</script>
