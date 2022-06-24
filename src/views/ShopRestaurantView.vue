<template>
  <v-container>
    <v-card class="ma-1" outlined>
      <v-row class="ma-0">
        <v-col>
          <v-card-text>
            <h4 class="text-h4 text--primary" v-text="restaurant.name"/>
            <p v-text="restaurant.address"></p>
            <p v-text="truncatedDescription"></p>
            <p v-if="!restaurant.isClosed">Ouvert</p>
            <p v-else>Fermé</p>
          </v-card-text>
        </v-col>
        <v-col style="min-width:240px" class="col-2">
          <v-img :src="restaurant.image" aspect-ratio="1"></v-img>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="ma-1" outlined>
      <v-row class="ma-0">
        <v-col class="col-1">
          <h1>Filter</h1>
        </v-col>
        <v-col class="col-8">
          <h1>Menus</h1>
          <v-card
          v-for="menu in menus"
          :key="menu._id"
          outlined>
            <v-row class="ma-0">
              <v-col>
                <v-img :src="menu.image" aspect-ratio="1" width="6em"/>
              </v-col>
              <v-col class="col-8">
                <p class="text-h6 font-weight-bold" v-text="menu.name"></p>
                <p v-text="menu.description"></p>
              </v-col>
              <v-col class="text-center">
                <p class="text-h6 font-weight-bold" v-text="menu.price + '€'"></p>
                <v-btn color="green"><v-icon>mdi-cart-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
          <h1>Produits</h1>
          <v-card
          v-for="product in products"
          :key="product._id"
          outlined>
            <v-row class="ma-0">
              <v-col>
                <v-img :src="product.image" aspect-ratio="1" width="6em"/>
              </v-col>
              <v-col class="col-8">
                <p class="text-h6 font-weight-bold" v-text="product.name"></p>
                <p v-text="product.description"></p>
              </v-col>
              <v-col class="text-center">
                <p class="text-h6 font-weight-bold" v-text="product.price + '€'"></p>
                <v-btn color="green"><v-icon>mdi-cart-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="col-3">
          <h1>Panier</h1>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ShopRestaurantView',
  components: {
  },
  data: () => ({
    restaurant: [],
    menus: [],
    products: []
  }),
  computed: {
    truncatedDescription () {
      if (this.restaurant.description?.length > 300) { return this.restaurant.description.substring(0, 297) + '...' }
      return this.restaurant.description
    }
  },
  async mounted () {
    this.restaurant = (await this.axios.get('/shop/api/restaurants/' + this.$route.params.id)).data
    this.menus = (await this.axios.get('/shop/api/menus?restaurant=' + this.$route.params.id)).data.results
    this.products = (await this.axios.get('/shop/api/products?restaurant=' + this.$route.params.id)).data.results
    console.log(this.products)
  }
})
</script>

<style scoped>
/* .colonne {
  width: 20%;
} */
</style>
