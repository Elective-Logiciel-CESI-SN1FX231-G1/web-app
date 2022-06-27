<template>
  <div style="position: absolute;width: 100%;top:50px;z-index: 1000;" >
    <v-alert v-if="visible" type="error" border="right" class="col-6 offset-3 my-6" >
      <v-row>
        {{ message }}
        <v-spacer></v-spacer>
        <v-icon class="mr-4" @click="visible=false">mdi-close</v-icon>
      </v-row>
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
  },
  data: () => ({
    message: undefined,
    visible: false
  }),
  computed: {
  },
  async mounted () {
    this.axios.interceptors.response.use(r => r, (error) => {
      this.visible = true
      this.message = error.message
      return Promise.reject(error)
    })
  }
})
</script>

<style>

</style>
