<template>
  <div>
    <v-tabs
      v-model="currentTab"
      fixed-tabs
      dark
    >
      <v-tab v-for="tab in tabs" :key="tab.title">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item
        v-for="tab in tabs"
        :key="tab.title"
      >
          <iframe :src="tab.url" frameborder="0" class="col-12 pa-0" style="height: 85vh;"></iframe>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Doc',
  components: {
    // Commande
  },
  data: () => ({
    currentTab: null,
    tabs: [
      { title: 'Service d\'authentification', url: '/auth/api/' },
      { title: 'Service de parrainage', url: '/sponsor/api/' },
      { title: 'Service de la boutique', url: '/shop/api/' },
      { title: 'Service des commandes', url: '/orders/api/' },
      { title: 'Service de notification', url: '/notify/api/' },
      { title: 'Service de statistique', url: '/stats/api/' },
      { title: 'Service de log', url: '/logs/api/' }
    ]
  })
})
</script>
