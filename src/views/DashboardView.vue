<template>
  <v-container  class="col-xl-10 offset-xl-1">
    <v-card flat>
      <v-card-title>
        Tableau de bord
        <!-- <v-spacer></v-spacer> -->
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card outlined>
              <v-card-title>
                Commandes en attente
              </v-card-title>
              <v-card-text>
                <v-data-iterator
                  :items="validatingOrders"
                  @pagination="fetchValidatingOrders"
                  :page.sync="validatingOrdersPage"
                  :items-per-page.sync="validatingOrdersItemPerPage"
                  :server-items-length="validatingOrdersCount"
                >
                  <template v-slot:default="props">
                    <v-list>
                      <template v-for="order in props.items">
                        <v-list-item  :key="order._id">
                          {{order}}
                        </v-list-item>
                        <v-divider  :key="'d'+order._id"></v-divider>
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
                Commandes en cours de préparation
                <!-- <v-spacer></v-spacer> -->
              </v-card-title>
              <v-card-text>
                <v-data-iterator
                  :items="acceptedOrders"
                  @pagination="fetchAcceptedOrders"
                  :page.sync="acceptedOrdersPage"
                  :items-per-page.sync="acceptedOrdersItemPerPage"
                  :server-items-length="acceptedOrdersCount"
                >
                  <template v-slot:default="props">
                    <v-list>
                      <template v-for="order in props.items">
                        <v-list-item  :key="order._id">
                          {{order}}
                        </v-list-item>
                        <v-divider  :key="'d'+order._id"></v-divider>
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
                Commandes en attente de livraison
                <!-- <v-spacer></v-spacer> -->
              </v-card-title>
              <v-card-text>
                <v-data-iterator
                  :items="deliveringOrders"
                  @pagination="fetchDeliveringOrders"
                  :page.sync="deliveringOrdersPage"
                  :items-per-page.sync="deliveringOrdersItemPerPage"
                  :server-items-length="deliveringOrdersCount"
                >
                  <template v-slot:default="props">
                    <v-list>
                      <template v-for="order in props.items">
                        <v-list-item  :key="order._id">
                          {{order}}
                        </v-list-item>
                        <v-divider  :key="'d'+order._id"></v-divider>
                      </template>
                    </v-list>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
// import ProductFormDialog from '@/components/ProductFormDialog.vue'
// import MenuFormDialog from '@/components/MenuFormDialog.vue'

export default Vue.extend({
  name: 'Gestion',

  components: {
  },
  data: () => ({
    validatingOrders: undefined,
    validatingOrdersCount: 0,
    validatingOrdersPage: 1,
    validatingOrdersItemPerPage: 10,
    acceptedOrders: undefined,
    acceptedOrdersCount: 0,
    acceptedOrdersPage: 1,
    acceptedOrdersItemPerPage: 10,
    deliveringOrders: undefined,
    deliveringOrdersCount: 0,
    deliveringOrdersPage: 1,
    deliveringOrdersItemPerPage: 10
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async fetchValidatingOrders () {
      const validatingOrders = (await this.axios.get(`/orders/api/orders?status=validating&page=${this.validatingOrdersPage}&size=${this.validatingOrdersItemPerPage === -1 ? 0 : this.validatingOrdersItemPerPage}`)).data
      this.validatingOrders = validatingOrders.results
      this.validatingOrdersCount = validatingOrders.count
    },
    async fetchAcceptedOrders () {
      const acceptedOrders = (await this.axios.get(`/orders/api/orders?status=preparating&page=${this.acceptedOrdersPage}&size=${this.acceptedOrdersItemPerPage === -1 ? 0 : this.acceptedOrdersItemPerPage}`)).data
      this.acceptedOrders = acceptedOrders.results
      this.acceptedOrdersCount = acceptedOrders.count
    },
    async fetchDeliveringOrders () {
      const deliveringOrders = (await this.axios.get(`/orders/api/orders?status=waitingDelivery,delivering&page=${this.deliveringOrdersPage}&size=${this.deliveringOrdersItemPerPage === -1 ? 0 : this.deliveringOrdersItemPerPage}`)).data
      this.deliveringOrders = deliveringOrders.results
      this.deliveringOrdersCount = deliveringOrders.count
    }
  },
  async mounted () {
    await Promise.all([
      this.fetchValidatingOrders(),
      this.fetchAcceptedOrders(),
      this.fetchDeliveringOrders()
    ])
  }
})
</script>
