<template>
 <v-container>
      <v-card outlined>
        <v-row class="ma-0">
          <v-col class="col-12">
          <v-simple-table width="100%">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-subtitle text-md-h6 font-weight-bold">
                    Image
                  </th>
                  <th class="text-left text-subtitle text-md-h6 font-weight-bold">
                    Intitulé
                  </th>
                  <th class="text-left text-subtitle text-md-h6 font-weight-bold">
                    Description
                  </th>
                  <th class="text-left text-subtitle text-md-h6 font-weight-bold">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="menu in value.menus"
                  :key="menu._id"
                >
                  <td class="image"><v-img :src="menu.image" aspect-ratio="1" class="image"/></td>
                  <td><p class="text-subtitle text-md-h6 font-weight-bold ma-0" v-text="menu.name"></p></td>
                  <td><p v-text="menu.description" class="text-subtitle text-md-h6"></p>
                    <span class="ma-0">Contient : </span>
                    <div style="display: inline;">
                      {{menu.products.map(p => p.name).join(', ')}}
                    </div>
                  </td>
                  <td>
                    <p class="text-subtitle text-md-h6 font-weight-bold"><span v-text="menu.price"></span>€
                      <v-btn color="red" @click="tryRemoveMenu(menu)" class="ml-4" v-if="editable"><v-icon>mdi-cart-remove</v-icon></v-btn>
                    </p>
                  </td>
                </tr>
                <tr
                  v-for="product in value.products"
                  :key="product._id"
                >
                  <td class="image"><v-img :src="product.image" aspect-ratio="1" class="image"/></td>
                  <td><p class="text-subtitle text-md-h6 font-weight-bold ma-0" v-text="product.name"></p></td>
                  <td><p class="text-subtitle text-md-h6" v-text="product.description"></p></td>
                  <td>
                    <p class="text-subtitle text-md-h6 font-weight-bold"><span v-text="product.price"></span>€
                      <v-btn color="red" @click="tryRemoveProduct(product)" class="ml-6" v-if="editable"><v-icon>mdi-cart-remove</v-icon></v-btn>
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
import { mapActions } from 'vuex'

export default Vue.extend({
  components: {
  },
  props: {
    value: { type: Object, required: true },
    editable: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
    }
  },
  computed: {
    // ...mapState('cart', ['order'])
  },
  methods: {
    ...mapActions('cart', ['removeProductToCart', 'removeMenuToCart']),
    async tryRemoveProduct (product) {
      await this.removeProductToCart(product)
    },
    async tryRemoveMenu (menu) {
      await this.removeMenuToCart(menu)
    }
  }
})
</script>

<style scoped>
.image {
  width: 7em;
}
@media (min-width: 900px) {
  .image {
    width: 13em;
  }
}
</style>
