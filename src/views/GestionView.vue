<template>
  <v-container  class="col-xl-8 offset-xl-2">
    <!-- <h1>
      Gestion
    </h1> -->
    <v-card :loading="loading" flat>
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
                            <delete-dialog label="un produit" @delete="deleteProduct(product._id)"></delete-dialog>
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
                  <v-spacer></v-spacer>
                  <delayed-search-bar @input="menuQuery=$event;fetchMenus()"></delayed-search-bar>
                  <menu-form-dialog @update="fetchMenus"></menu-form-dialog>
                </v-card-title>
                <v-card-text>
                  <v-alert type="warning" text v-if="(!menus || !menus.length) && !menuQuery">
                    Aucun menu n'a été enregisté
                  </v-alert>
                  <v-data-iterator
                    v-else
                    :items="menus"
                    @pagination="fetchMenus"
                    :page.sync="menuPage"
                    :items-per-page.sync="menuItemPerPage"
                    :server-items-length="menuCount"
                  >
                    <template v-slot:default="props">
                      <v-list>
                        <template v-for="menu in props.items">
                          <v-list-item  :key="menu._id">
                            <v-list-item-avatar tile size="64">
                              <v-img :src="menu.image" aspect-ratio="1"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="mr-4" >
                              <v-list-item-title>
                                <v-row>
                                  <v-col>
                                    {{ menu.name }}
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col style="flex-grow: 0;">
                                    {{ menu.price }}€
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                              <v-list-item-subtitle v-html="menu.description"></v-list-item-subtitle>
                            </v-list-item-content>
                            <menu-form-dialog @update="fetchMenus" :value="menu"></menu-form-dialog>
                            <delete-dialog label="un menu" @delete="deleteMenu(menu._id)"></delete-dialog>
                          </v-list-item>
                          <v-divider  :key="'d'+menu._id"></v-divider>
                        </template>
                      </v-list>
                    </template>
                  </v-data-iterator>
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
import MenuFormDialog from '@/components/MenuFormDialog.vue'
import Restaurant from '@/components/Restaurant.vue'
import DelayedSearchBar from '@/components/DelayedSearchBar.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'

export default Vue.extend({
  name: 'Gestion',

  components: {
    ProductFormDialog,
    RestaurantFormDialog,
    Restaurant,
    DelayedSearchBar,
    MenuFormDialog,
    DeleteDialog
  },
  data: () => ({
    restaurant: undefined,
    products: undefined,
    menus: undefined,
    loading: true,
    productPage: 1,
    productItemPerPage: 5,
    productCount: 0,
    productQuery: '',
    menuPage: 1,
    menuItemPerPage: 5,
    menuCount: 0,
    menuQuery: ''
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async fetchRestaurant () {
      const restaurants = (await this.axios.get('/shop/api/restaurants')).data
      this.restaurant = restaurants.results[0]
    },
    async fetchProducts () {
      const products = (await this.axios.get(`/shop/api/products?q=${this.productQuery}&page=${this.productPage}&size=${this.productItemPerPage === -1 ? 0 : this.productItemPerPage}`)).data
      this.products = products.results
      this.productCount = products.count
    },
    async fetchMenus () {
      const menus = (await this.axios.get(`/shop/api/menus?q=${this.menuQuery}&page=${this.menuPage}&size=${this.menuItemPerPage === -1 ? 0 : this.menuItemPerPage}`)).data
      this.menus = menus.results
      this.menuCount = menus.count
    },
    async deleteMenu (_id: string) {
      await this.axios.delete(`/shop/api/menus/${_id}`)
      await this.fetchMenus()
    },
    async deleteProduct (_id: string) {
      await this.axios.delete(`/shop/api/products/${_id}`)
      await this.fetchProducts()
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
