<template>
  <v-container>
    <v-card outlined>
      <v-alert type="error" text v-if="error" @click="error = false">
            Le code de validation n'est pas correct, veuillez réessayer
      </v-alert>
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
                        <v-list-item-subtitle v-if="order.comment !== ''"
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
          <h2>Commandes acceptée(s)</h2>
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
                                <span v-else-if="order.status === 'waitingDelivery'"> Prêt à être récupérer</span>
                                <span v-else> En cours de livraison</span>
                              </p>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-btn color="green" @click="deliverOrder(order._id)" :disabled="order.status !== 'waitingDelivery'">
                                <span class="mr-2">J'ai récupéré la commande</span>
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                              </v-btn>
                            </v-col>
                            <v-col>
                              <v-dialog v-model="codeConfirmation">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn color="green" v-on="on" v-bind="attrs" :disabled="order.status !== 'delivering'">
                                    <span class="mr-2">J'ai livré la commande</span>
                                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                                  </v-btn>
                                </template>
                                <v-card class="d-flex flex-column align-center">
                                  <v-card-title class="text-h5 grey lighten-2">Code de confirmation</v-card-title>
                                  <v-card-text class="text-center text-h6">
                                    Veuillez inscrire le code de confirmation donné par votre client pour valider votre commande
                                  </v-card-text>
                                  <v-form v-model="valid">
                                    <v-text-field style="max-width: 600px"
                                    v-model="code"
                                    label="Code"
                                    name="Code"
                                    :rules="[
                                      v => !!v || 'Un code est requis',
                                      v => v.match(/^\d{6}$/) || 'Un code est requis']">
                                    </v-text-field>
                                  </v-form>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="green"
                                      text
                                      :disabled="!valid"
                                      @click="codeConfirmation = false; deliveredOrder(order._id, code)"
                                    >
                                      Valider
                                    </v-btn>
                                    <v-btn
                                      color="red"
                                      text
                                      @click="codeConfirmation = false"
                                    >
                                      Je n'ai pas le code de confirmation
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-col>
                          </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle v-if="order.comment !== ''"
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
    acceptedOrdersPerPage: 5,
    codeConfirmation: false,
    code: undefined,
    valid: false,
    error: false
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
    async deliverOrder (id) {
      await this.axios.post('/orders/api/orders/' + id + '/deliver')
      await this.fetchData()
    },
    async deliveredOrder (id, code) {
      const currentOrder = (await this.axios.get('/orders/api/orders/' + id)).data
      if (currentOrder.validationCode === code) {
        await this.axios.post('/orders/api/orders/' + id + '/completed')
        await this.fetchData()
      } else this.error = true
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
