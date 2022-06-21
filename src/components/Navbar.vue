<template>
  <v-app-bar app>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/v-eat-light.png"
          width="100"
          v-on:click="test"
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <ul class="navigation-links">
      <li v-for="item in menuItems" :key="item.title" :to="item.path">
        <v-btn text :key="item.title" :to="item.path">
          <span class="mr-2">{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </li>
      <li v-if="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <span class="mr-2">Profil</span>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in profileItems" :key="index" :to="item.path">
              <v-list-item-title>
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>
                  <span>{{ item.title }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                  <v-icon class="mr-2 red--text">mdi-logout</v-icon>
                  <span class="red--text">Se déconnecter</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </li>
    </ul>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NavBar',
  data () {
    return {}
  },
  computed: {
    ...mapState('auth', ['user']),
    menuItems () {
      if (this.user) {
        switch (this.user.role) {
          case 'client':
            return [
              {
                title: 'Panier',
                path: '/cart',
                icon: 'mdi-cart-outline'
              }
            ]
          case 'restaurateur':
            return [
              {
                title: 'Dashboard',
                path: '/dashboard',
                icon: 'mdi-monitor-dashboard'
              },
              {
                title: 'Gestion',
                path: '/gestion',
                icon: 'mdi-cog-outline'
              },
              {
                title: 'Statistiques',
                path: '/statistiques',
                icon: 'mdi-chart-line'
              }
            ]
          case 'deliverer':
            return [
              {
                title: 'Livraisons',
                path: '/livraisons',
                icon: 'mdi-moped-outline'
              },
              {
                title: 'Historique',
                path: '/historique',
                icon: 'mdi-history'
              }
            ]
        }
      }
      return [
        { title: 'Panier', path: '/cart', icon: 'mdi-cart-outline' },
        {
          title: "S'enregistrer",
          path: '/signup',
          icon: 'mdi-account-plus-outline'
        },
        {
          title: 'Se connecter',
          path: '/signin',
          icon: 'mdi-account-circle-outline'
        }
      ]
    },
    profileItems () {
      return [
        {
          title: 'Modifier mon profil',
          path: '/profile',
          icon: 'mdi-account-cog-outline'
        },
        {
          title: 'Historique',
          path: '/historique',
          icon: 'mdi-history'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    test () {
      this.login({ email: 'deliverer@test.com', password: 'root' })
    }
  }
}
</script>
<style scoped>
.navigation-links {
  display: flex;
}
.navigation-links li {
  list-style: none;
}
</style>
