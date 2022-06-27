<template>
  <Commande />
</template>

<script lang="ts">
import Vue from 'vue'
import Commande from '../components/Commande.vue'

export default Vue.extend({
  name: 'Cart',
  components: {
    Commande
  }
})
</script>
