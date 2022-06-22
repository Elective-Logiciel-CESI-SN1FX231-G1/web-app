<template>
  <v-card :to="{name:'restaurant',param:{id:value._id}}" class="ma-1" outlined>
    <v-row class="ma-0">
      <v-col style="min-width:240px" class="col-2">
        <v-img :src="value.img" aspect-ratio="1"></v-img>
      </v-col>
      <v-col>
        <v-card-title v-text="value.name"/>
        <v-card-text v-text="truncatedDescription"/>
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
