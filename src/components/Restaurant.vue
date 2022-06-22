<template>
  <v-card class="ma-1" outlined>
    <v-row class="ma-0">
      <v-col style="min-width:240px" class="col-2">
        <v-img :src="value.image" aspect-ratio="1"></v-img>
      </v-col>
      <v-col>
        <v-card-text>
          <h4 class="text-h4 text--primary" v-text="value.name"/>
          <p v-text="value.address"></p>
          <p v-text="truncatedDescription"></p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: { required: true, type: Object }
  },
  data: () => ({

  }),
  computed: {
    truncatedDescription () {
      if (this.value.description?.length > 300) { return this.value.description.substring(0, 297) + '...' }
      return this.value.description
    }
  }
})
</script>

<style>

</style>
