<template>
 <v-container>
      <v-card outlined>
        <v-row class="ma-0">
          <v-col class="col-12">
          <v-simple-table width="100%">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-h6 font-weight-bold">
                    Image
                  </th>
                  <th class="text-left text-h6 font-weight-bold">
                    Intitulé
                  </th>
                  <th class="text-left text-h6 font-weight-bold">
                    Description
                  </th>
                  <th class="text-left text-h6 font-weight-bold">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="menu in order.menus"
                  :key="menu._id"
                >
                  <td width="13em"><v-img :src="menu.image" aspect-ratio="1" width="13em"/></td>
                  <td><p class="text-h5 font-weight-bold ma-0" v-text="menu.name"></p></td>
                  <td><p v-text="menu.description" class="text-h6"></p>
                    <span class="ma-0">Contient : </span>
                    <div style="display: inline;">
                      {{menu.products.map(p => p.name).join(', ')}}
                    </div>
                  </td>
                  <td>
                    <p class="text-h5 font-weight-bold"><span v-text="menu.price"></span>€
                      <v-btn color="red" @click="tryRemoveMenu(menu)" class="ml-4"><v-icon>mdi-cart-remove</v-icon></v-btn>
                    </p>
                  </td>
                </tr>
                <tr
                v-for="product in order.products"
                :key="product._id"
                >
                  <td width="13em"><v-img :src="product.image" aspect-ratio="1" width="13em"/></td>
                  <td><p class="text-h5 font-weight-bold ma-0" v-text="product.name"></p></td>
                  <td><p class="text-h6" v-text="product.description"></p></td>
                  <td>
                    <p class="text-h5 font-weight-bold"><span v-text="product.price"></span>€
                      <v-btn color="red" @click="tryRemoveProduct(product)" class="ml-6"><v-icon>mdi-cart-remove</v-icon></v-btn>
                    </p>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-col>
        </v-row>
      </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('cart', ['order'])
  },
  methods: {
    ...mapActions('cart', ['createOrder', 'removeProductToCart', 'removeMenuToCart']),
    async startCommand () {
      await this.createOrder()
    },
    async tryRemoveProduct (product) {
      await this.removeProductToCart(product)
    },
    async tryRemoveMenu (menu) {
      await this.removeMenuToCart(menu)
    }
  }
})
</script>
