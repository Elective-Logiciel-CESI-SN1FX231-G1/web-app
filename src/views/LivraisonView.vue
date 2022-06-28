<template>
  <v-container>
    <v-card outlined>
      <v-row>
        <v-col class="col-12 col-md-6 text-center">
          <h2>Commandes sans livreur</h2>
          <v-alert type="warning" text v-if="preparatingOrders.length === 0">
            Aucune commande à livrer
          </v-alert>
          <v-card outlined v-else>
            <v-data-iterator
              :items="preparatingOrders"
              @pagination="fetchpreparatingOrders"
              :page.sync="preparatingOrdersPage"
              :items-per-page.sync="preparatingOrdersPage"
              :server-items-length="preparatingOrdersCount"
            >
              <template v-slot:default="props">
                <v-list>
                  <template v-for="order in props.items">
                    <v-list-item :key="order._id">
                      <v-list-item-content class="mr-4">
                        <v-list-item-title>
                          <v-row>
                            <v-col>
                              {{ order.restaurant.name }},
                              {{ order.restaurant.address}}
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col style="flex-grow: 0" class="font-weight-bold">
                              {{ order.deliveryPrice }}€
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              Livré à : {{ order.address }}
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                              <p>
                                Statut :
                                <span v-if="order.status === 'preparating'">
                                  En préparation</span
                                >
                                <span v-else> Prêt à être récupérer</span>
                              </p>
                              <v-btn @click="acceptDelivererOrder(order._id)">
                                <span class="mr-2">Accepter la commande</span>
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-html="'Commentaire : ' + order.comment"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="'d' + order._id"></v-divider>
                  </template>
                </v-list>
              </template>
            </v-data-iterator>
          </v-card>
        </v-col>
        <v-col class="col-12 col-md-6 text-center">
          <h2>Commandes acceptées</h2>
          <v-alert type="warning" text v-if="acceptedOrders.length === 0">
            Aucune commande n'a été acceptée
          </v-alert>
          <v-card outlined v-else>
            <v-data-iterator
              :items="acceptedOrders"
              @pagination="fetchAcceptedOrders"
              :page.sync="acceptedOrdersPage"
              :items-per-page.sync="acceptedOrdersPerPage"
              :server-items-length="acceptedOrdersCount"
            >
              <template v-slot:default="props">
                <v-list>
                  <template v-for="order in props.items">
                    <v-list-item :key="order._id">
                      <v-list-item-content class="mr-4">
                        <v-list-item-title>
                          <v-row>
                            <v-col>
                              {{ order.restaurant.name }},
                              {{ order.restaurant.address}}
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col style="flex-grow: 0" class="font-weight-bold">
                              {{ order.deliveryPrice }}€
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              Livré à : {{ order.address }}
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                              Contact : {{ order.client.firstname }}, {{ order.client.phone}}
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <p>
                                Statut :
                                <span v-if="order.status === 'preparating'">
                                  En préparation</span
                                >
                                <span v-else> Prêt à être récupérer</span>
                              </p>
                            </v-col>
                          </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-html="'Commentaire : ' + order.comment"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="'d' + order._id"></v-divider>
                  </template>
                </v-list>
              </template>
            </v-data-iterator>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Livraison',
  data: () => ({
    interval: undefined,
    preparatingOrders: [],
    preparatingOrdersCount: 0,
    preparatingOrdersPage: 1,
    preparatingOrdersPerPage: 10,
    acceptedOrders: [],
    acceptedOrdersCount: 0,
    acceptedOrdersPage: 1,
    acceptedOrdersPerPage: 5
  }),
  components: {},
  methods: {
    async acceptDelivererOrder (id) {
      await this.axios.post('/orders/api/orders/' + id + '/delivererAccept')
      await this.fetchData()
    },
    async fetchPreparatingOrder () {
      const prepaOrders = (await this.axios.get('/orders/api/orders?status=preparating,waitingDelivery&deliverer=none')).data
      this.preparatingOrders = prepaOrders.results
      this.preparatingOrdersCount = prepaOrders.count
    },
    async fetchAcceptedOrders () {
      const acceptOrders = (await this.axios.get('/orders/api/orders?status=preparating,waitingDelivery,delivering&deliverer=me')).data
      this.acceptedOrders = acceptOrders.results
      this.acceptedOrdersCount = acceptOrders.count
    },
    async fetchData () {
      await Promise.all([this.fetchPreparatingOrder(), this.fetchAcceptedOrders()])
    }
  },
  async mounted () {
    await this.fetchData()
    this.interval = setInterval(() => {
      this.fetchData()
    }, 10000)
  },
  async destroyed () {
    clearInterval(this.interval)
  }
})
</script>
