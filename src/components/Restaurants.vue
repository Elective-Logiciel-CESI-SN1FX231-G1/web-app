<template>
  <div>
    <v-data-iterator
      :items="restaurants"
    >
      <template v-slot:header>
        <v-row>
          <v-spacer></v-spacer>
          <v-col style="flex-grow: 0;">
            <v-chip-group
              v-model="selectedTypes"
              active-class="orange--text text--accent-4"
            >
              <v-chip
                filter
                outlined
                v-for="t in types"
                :key="t.name"
                v-text="t.name"
              />
            </v-chip-group>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="search"
              clearable
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Rechercher"
            />
          </v-col>
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-row class="my-6">
          <v-col
            class="col-xl-6 col-12"
            v-for="restaurant in props.items"
            :key="restaurant._id"
          >
          <router-link :to="{name:'shop-restaurant',params:{id:restaurant._id}}">
            <restaurant :value="restaurant"/>
          </router-link>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Restaurant from './Restaurant.vue'
import types from '@/assets/types'
export default Vue.extend({
  components: {
    Restaurant
  },
  data: () => ({
    restaurants: [] as unknown[],
    types,
    selectedTypes: [] as string[],
    search: ''
  }),
  async mounted () {
    this.restaurants = (await this.axios.get('/shop/api/restaurants')).data.results
  }
})
</script>

<style>

</style>
