<template>
  <v-app>
    <NavBar />
    <notify-error/>
    <v-main>
      <router-view/>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import NavBar from '@/components/Navbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import NotifyError from '@/components/NotifyError.vue'
import setTheme from '@/assets/setTheme'

export default Vue.extend({
  name: 'App',
  components: {
    NavBar,
    FooterComponent,
    NotifyError
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState('auth', ['token', 'user'])
  },
  watch: {
    user () {
      setTheme(this.user?.role, this.$vuetify.theme.themes)
    }
  },
  methods: {
    ...mapActions('auth', ['login'])
  },
  mounted () {
    this.$vuetify.lang.current = 'fr'
    setTheme(this.user?.role, this.$vuetify.theme.themes)
    this.axios.interceptors.request.use((config) => {
      if (!this.token) return config
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${this.token}`
      return config
    })
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');
.v-application--wrap {
  font-family: 'Poppins' !important;
}
</style>
