<template>
  <v-container>
    <Restaurants />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Restaurants from '../components/Restaurants.vue'

export default Vue.extend({
  name: 'ShopView',
  components: {
    Restaurants
  }
})
</script>
