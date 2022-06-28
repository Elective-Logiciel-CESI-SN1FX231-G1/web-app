<template>
  <div>
    <div v-if="user && user.role === 'deliverer'">
      <v-container>
        <v-card outlined>
          <v-row>
            <v-col class="col-12 text-center">
              <h2>Historique des livraisons effectuées</h2>
              <v-alert type="warning" text v-if="orders.length === 0">
                Vous n'avez pas encore fait de commande
              </v-alert>
              <v-card outlined v-else>
                <v-data-iterator
                  :items="orders"
                  @pagination="fetchData"
                  :page.sync="ordersPage"
                  :items-per-page.sync="ordersPerPage"
                  :server-items-length="ordersCount"
                >
                  <template v-slot:default="props">
                    <v-list>
                      <template v-for="order in props.items">
                        <v-list-item  :key="order._id">
                          <v-list-item-content class="mr-4" >
                            <v-list-item-title>
                              <v-row>
                                <v-col>
                                  Pour : {{ order.client.firstname }}
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col style="flex-grow: 0;">
                                  {{ order.price }}€
                                </v-col>
                              </v-row>
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-dialog
                            transition="dialog-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn  text fab small v-bind="attrs" v-on="on">
                                <v-icon>mdi-eye</v-icon>
                              </v-btn>
                            </template>
                            <template v-slot:default="dialog">
                              <v-card class="pa-3 text-h6">
                                <v-row>
                                  <v-col>
                                    Restaurant : {{ order.restaurant.name }}, {{ order.restaurant.address}}
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col class="font-weight-bold">
                                    <p>Gain : <span v-text="order.deliveryPrice"></span>€</p>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <p>Livré à : <span v-text="order.client.firstname"></span></p>
                                    <p>Le : <span v-text="order.deliveringDate"></span></p>
                                  </v-col>
                                </v-row>
                                <v-card-actions>
                                  <v-btn color="secondary" @click="dialog.value=false">Fermer la fenêtre</v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                        </v-list-item>
                        <v-divider  :key="'d'+order._id"></v-divider>
                      </template>
                    </v-list>
                  </template>
                </v-data-iterator>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
    <div v-if="user && user.role === 'client'">
      <v-container>
        <v-card outlined>
          <v-row>
            <v-col class="col-12 text-center">
              <h2>Historique des commandes effectuées</h2>
              <v-alert type="warning" text v-if="orders.length === 0">
                Vous n'avez pas encore fait de commande
              </v-alert>
              <v-card outlined v-else>
                <v-data-iterator
                  :items="orders"
                  @pagination="fetchData"
                  :page.sync="ordersPage"
                  :items-per-page.sync="ordersPerPage"
                  :server-items-length="ordersCount"
                >
                  <template v-slot:default="props">
                    <v-list>
                      <template v-for="order in props.items">
                        <v-list-item :key="order._id">
                          <v-list-item-content class="mr-4" >
                            <v-list-item-title>
                              <v-row>
                                <v-col>
                                  <p>{{ order.restaurant.name }}, {{ order.restaurant.address }}</p>
                                </v-col>
                                <v-col>
                                  <p>{{ order.deliveringDate }}</p>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col style="flex-grow: 0;">
                                  {{ order.price }}€ + {{ order.deliveryPrice + order.commissionPrice }}€ (Frais)
                                </v-col>
                              </v-row>
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-dialog
                            transition="dialog-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn text fab small v-bind="attrs" v-on="on">
                                <v-icon>mdi-eye</v-icon>
                              </v-btn>
                            </template>
                            <template v-slot:default="dialog">
                              <v-card>
                                <Commande :value="order"/>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="secondary" @click="dialog.value=false">Fermer la fenêtre</v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                        </v-list-item>
                        <v-divider  :key="'d'+order._id"></v-divider>
                      </template>
                    </v-list>
                  </template>
                </v-data-iterator>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Commande from '../components/Commande.vue'

export default Vue.extend({
  name: 'Historique',
  data: () => ({
    orders: [],
    ordersCount: 0,
    ordersPage: 1,
    ordersPerPage: 15
  }),
  components: {
    Commande
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async fetchData () {
      const OrdersResult = (await this.axios.get('/orders/api/orders?status=completed')).data
      this.orders = OrdersResult.results
      this.ordersCount = OrdersResult.count
    }
  },
  async mounted () {
    await this.fetchData()
  }
})
</script>
