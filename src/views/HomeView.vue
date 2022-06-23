<template>
  <HomeComponent />
</template>

<script lang="ts">
import Vue from 'vue'
import HomeComponent from '../components/HomeComponent.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    HomeComponent
  }
})
</script>
