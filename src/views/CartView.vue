<template>
  <div>
    <v-card class="ma-0"
    v-if="order.price > 0">
      <v-row>
        <v-col class="col-12 col-md-8">
          <Commande />
        </v-col>
        <v-col>
          <v-container>
            <v-card class="ma-0">
              <v-row>
                <v-col>
                  <v-simple-table>
                    <template>
                      <tbody>
                        <tr>
                          <td><p class="text-h6">Prix commande</p></td>
                          <td><p class="text-h6"><span v-text="order.price"></span>€</p></td>
                        </tr>
                        <tr>
                          <td><p class="text-h6">Prix livraison</p></td>
                          <td><p class="text-h6"><span v-text="order.deliveryPrice"></span>€</p></td>
                        </tr>
                        <tr>
                          <td><p class="text-h6">Prix commision</p></td>
                          <td><p class="text-h6"><span v-text="order.commissionPrice"></span>€</p></td>
                        </tr>
                        <tr>
                          <td><p class="text-h6">Prix total</p></td>
                          <td><p class="text-h6" ><span v-text="order.price + order.deliveryPrice + order.commissionPrice"></span>€</p></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="green" @click="startCommand()" class="ml-4" width="95%"><v-icon class="mr-2">mdi-credit-card-outline</v-icon>Payer ma commande</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else>
    <v-row>
      <v-col class="text-center mt-10 text-h5">
        <p>Votre panier est vide, commencez par faire votre commande !</p>
        <v-btn
        :to="{name: 'shop'}"
        outlined
        color="black">
          Voir les restaurants
        </v-btn>
      </v-col>
    </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Commande from '../components/Commande.vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'Cart',
  components: {
    Commande
  },
  computed: {
    ...mapState('cart', ['order'])
  },
  methods: {
    ...mapActions('cart', ['createOrder']),
    async startCommand () {
      await this.createOrder()
    }
  }
})
</script>
