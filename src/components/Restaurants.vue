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
                :key="t"
                v-text="t"
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
            <restaurant :value="restaurant" :to="{name:'restaurant',param:{id:restaurant._id}}" />
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
    this.restaurants = [
      {
        img: 'https://cdn.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg',
        name: 'Grand man eat où?',
        description: 'Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?'
      },
      {
        img: 'https://cdn.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg',
        name: 'Grand man eat où?2',
        description: 'Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?'
      },
      {
        img: 'https://cdn.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg',
        name: 'Grand man eat où?3',
        description: 'Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?Grand man eat où?'
      }
    ]
  }
})
</script>

<style>

</style>
