<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import NavBar from '@/components/Navbar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NavBar
  },
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
