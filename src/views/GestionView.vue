<template>
  <v-container  class="col-xl-8 offset-xl-2">
    <h1>
      Gestion
    </h1>
    <v-card :loading="loading">
      <v-card-title>
        Mon restaurant
        <v-spacer></v-spacer>
        <restaurant-form-dialog :value="restaurant" @update="fetchRestaurant"></restaurant-form-dialog>
      </v-card-title>
      <v-card-text>
        <v-alert type="warning" text v-if="!restaurant">
          Votre restaurant n'a pas encore été enregistré
        </v-alert>
        <template v-else>
          <restaurant :value="restaurant"></restaurant>
          <v-row class="mx-n2 mt-4">
            <v-col>
              <v-card outlined>
                <v-card-title>
                  Mes produits
                  <v-spacer></v-spacer>
                  <delayed-search-bar @input="productQuery=$event;fetchProducts()"></delayed-search-bar>
                  <product-form-dialog @update="fetchProducts"></product-form-dialog>
                </v-card-title>
                <v-card-text>
                  <v-alert type="warning" text v-if="(!products || !products.length) && !productQuery">
                    Aucun produit n'a été enregisté
                  </v-alert>
                  <v-data-iterator
                    v-else
                    :items="products"
                    @pagination="fetchProducts"
                    :page.sync="productPage"
                    :items-per-page.sync="productItemPerPage"
                    :server-items-length="productCount"
                  >
                    <template v-slot:default="props">
                      <v-list>
                        <template v-for="product in props.items">
                          <v-list-item  :key="product._id">
                            <v-list-item-avatar tile size="64">
                              <v-img :src="product.image" aspect-ratio="1"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="mr-4" >
                              <v-list-item-title>
                                <v-row>
                                  <v-col>
                                    {{ product.name }}
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col style="flex-grow: 0;">
                                    {{ product.price }}€
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                              <v-list-item-subtitle v-html="product.description"></v-list-item-subtitle>
                            </v-list-item-content>
                            <product-form-dialog @update="fetchProducts" :value="product"></product-form-dialog>
                          </v-list-item>
                          <v-divider  :key="'d'+product._id"></v-divider>
                        </template>
                      </v-list>
                    </template>
                  </v-data-iterator>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined>
                <v-card-title>
                  Mes menus
                </v-card-title>
                <v-card-text>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import RestaurantFormDialog from '@/components/RestaurantFormDialog.vue'
import ProductFormDialog from '@/components/ProductFormDialog.vue'
import Restaurant from '@/components/Restaurant.vue'
import DelayedSearchBar from '@/components/DelayedSearchBar.vue'

export default Vue.extend({
  name: 'Gestion',

  components: {
    ProductFormDialog,
    RestaurantFormDialog,
    Restaurant,
    DelayedSearchBar
  },
  data: () => ({
    productQuery: '',
    restaurant: undefined,
    products: undefined,
    menus: undefined,
    loading: true,
    productPage: 1,
    productItemPerPage: 10,
    productCount: 0
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async fetchRestaurant () {
      const restaurants = (await this.axios.get(`/shop/api/restaurants?owner=${this.user._id}`)).data
      this.restaurant = restaurants.results[0]
    },
    async fetchProducts () {
      const products = (await this.axios.get(`/shop/api/products?owner=${this.user._id}&q=${this.productQuery}&page=${this.productPage}&size=${this.productItemPerPage === -1 ? 0 : this.productItemPerPage}`)).data
      this.products = products.results
      this.productCount = products.count
    },
    async fetchMenus () {
      const menus = (await this.axios.get(`/shop/api/menus?owner=${this.user._id}`)).data
      this.menus = menus.results
    }
  },
  async mounted () {
    try {
      await Promise.all([
        this.fetchRestaurant(),
        this.fetchProducts(),
        this.fetchMenus()
      ])
    } finally {
      this.loading = false
    }
  }
})
</script>
