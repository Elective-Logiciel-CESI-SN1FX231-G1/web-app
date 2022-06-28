<template>
  <v-container>
    <div v-if="orders && orders.length > 0">
      <v-card
        v-for="order of orders"
        :key="order._id"
        class="pa-3">
        <v-row class="text-h6">
          <v-col class="col-8">
            {{ order.restaurant.name }},
            {{ order.restaurant.address}}
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="font-weight-bold">
            <p>Prix de la commande : <span v-text="order.price"></span>€</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-8 text-subtitle">
            Votre adresse : {{ order.address }}
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-subtitle">
            Vos informations : {{ order.client.firstname }}, {{ order.client.phone}}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <p class="text-h6">
              Statut :
              <span v-if="order.status === 'validating'"> En attente de validation</span>
              <span v-else-if="order.status === 'preparating'"> En préparation</span>
              <span v-else-if="order.status === 'cancelled'"> Commande annulé, un remboursement va être effectué</span>
              <span v-else-if="order.status === 'waitingDelivery'"> En attente de récupération par le livreur</span>
              <span v-else-if="order.status === 'delivering'"> En cours de livraison</span>
              <span v-else> En cours de livraison</span>
            </p>
            <p v-if="order.validationCode">Code de validation à fournir au livreur : <span v-text="order.validationCode"></span></p>
          </v-col>
        </v-row>
        <v-btn
          :to="{name: 'home'}"
          outlined
          color="black"
          class="ml-3">
          Retourner à l'accueil
        </v-btn>
      </v-card>
    </div>
    <v-card v-else>
      <v-row>
        <v-col class="text-center mt-10 text-h5">
          <p>Vous n'avez pas de commande en cours</p>
          <v-btn
          :to="{name: 'shop'}"
          outlined
          color="black">
            Voir les restaurants
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Order',
  data: () => ({
    orders: undefined
  }),
  components: {

  },
  methods: {
    async fetchData () {
      this.orders = (await this.axios.get('/orders/api/orders?status=validating,cancelled,preparating,waitingDelivery,delivering')).data.results
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
