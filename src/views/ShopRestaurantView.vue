<template>
  <v-container>
    <v-card>
      <v-alert
          v-if="error"
          color="error"
          text
          dismissible
          @click="error = false"
        >
          Votre commande ne peut contenir que les menus et les produits d'un seul restaurant.
        </v-alert>
      </v-card>
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
        <v-col class="col-md-5 col-12">
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
                <p class="text-h6 font-weight-bold ma-0" v-text="menu.name"></p>
                <p v-text="menu.description"></p>
                <span class="ma-0">Contient : </span>
                <div style="display: inline;">
                  {{menu.products.map(p => p.name).join(', ')}}
                </div>
              </v-col>
              <v-col class="text-center">
                <p class="text-h6 font-weight-bold" v-text="menu.price + '€'"></p>
                <v-btn color="green" @click="tryAddMenu(menu)"><v-icon>mdi-cart-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="col-md-5 col-12">
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
                <p class="text-h6 font-weight-bold ma-0" v-text="product.name"></p>
                <p v-text="product.description"></p>
              </v-col>
              <v-col class="text-center">
                <p class="text-h6 font-weight-bold" v-text="product.price + '€'"></p>
                <v-btn color="green" @click="tryAddProduct(product)"><v-icon>mdi-cart-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="col-md-2 col-12">
          <h1>Panier</h1>
          <v-card outlined>
             <v-row
            v-for="(menu, id) in order.menus"
            :key="menu._id + id"
            class="ma-0">
              <v-col>
                <p class="text-h6 font-weight-bold" v-text="menu.name"></p>
                <div class="d-flex justify-space-around">
                  <p class="text-h6 font-weight-bold" v-text="menu.price + '€'"></p>
                  <v-btn color="red" @click="tryRemoveMenu(menu)"><v-icon>mdi-cart-remove</v-icon></v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row
            v-for="(product, id) in order.products"
            :key="product._id + id"
            class="ma-0">
              <v-col>
                <p class="text-h6 font-weight-bold" v-text="product.name"></p>
                <div class="d-flex justify-space-around">
                  <p class="text-h6 font-weight-bold" v-text="product.price + '€'"></p>
                  <v-btn color="red" @click="tryRemoveProduct(product)"><v-icon>mdi-cart-remove</v-icon></v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col v-if="(order.products && order.products.length > 0) || (order.menus && order.menus.length > 0)">
                <p>Livraison : <span v-text="order.deliveryPrice"></span>€</p>
                <p>Commission : <span v-text="order.commissionPrice"></span>€</p>
                <p class="text-h5 font-weight-bold">Prix final : <span v-text="(order.price + order.deliveryPrice + order.commissionPrice).toFixed(2)"></span>€</p>
              </v-col>
              <v-col v-else>
                <p class="text-h5 font-weight-bold">Prix final : 0€</p>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col>
                <v-btn color="green" class="font-weight-bold" width="100%" :to="{ name: 'cart' }">Payer</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'ShopRestaurantView',
  components: {
  },
  data: () => ({
    restaurant: [],
    menus: [],
    products: [],
    error: false
  }),
  computed: {
    truncatedDescription () {
      if (this.restaurant.description?.length > 300) { return this.restaurant.description.substring(0, 297) + '...' }
      return this.restaurant.description
    },
    ...mapState('cart', ['order'])
  },
  methods: {
    ...mapActions('cart', ['addProductToCart', 'removeProductToCart', 'addMenuToCart', 'removeMenuToCart']),
    async tryAddProduct (product) {
      try {
        this.addProductToCart(product)
      } catch (error) {
        this.error = true
      }
    },
    async tryAddMenu (menu) {
      try {
        this.addMenuToCart(menu)
      } catch (error) {
        this.error = true
      }
    },
    async tryRemoveProduct (product) {
      this.removeProductToCart(product)
    },
    async tryRemoveMenu (menu) {
      this.removeMenuToCart(menu)
    }
  },
  async mounted () {
    this.restaurant = (await this.axios.get('/shop/api/restaurants/' + this.$route.params.id)).data
    this.menus = (await this.axios.get('/shop/api/menus?restaurant=' + this.$route.params.id)).data.results
    this.products = (await this.axios.get('/shop/api/products?restaurant=' + this.$route.params.id)).data.results
  }
})
</script>

<style scoped>
/* .colonne {
  width: 20%;
} */
</style>
