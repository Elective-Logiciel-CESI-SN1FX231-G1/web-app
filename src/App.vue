<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
          @click="test"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    ...mapState('auth',['token']),
  },
  methods:{
    ...mapActions('auth',['login']),
    test(){
      this.login({email:'client@test.com',password:'root'})
    }
  },
  mounted() {
    
    // Add a request interceptor
    this.axios.interceptors.request.use( (config) =>{
      if (!this.token) return config
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${this.token}`
      return config;
    });
  }
})
</script>
