<template>
  <v-app-bar app color="primary lighten-1">
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="V'EAT Logo"
          class="shrink mr-2"
          contain
          src="../assets/v-eat-light.png"
          width="100"
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <ul class="navigation-links">
      <li v-for="item in menuItems" :key="item.title" :to="item.path">
        <v-btn text :key="item.title" :to="item.path">
          <div class="d-flex flex-column-reverse d-lg-block">
            <span class="mr-sm-0 mr-lg-2 top-2 font-weight-bold">{{ item.title }}</span>
            <v-icon>{{ item.icon }}</v-icon>
          </div>
        </v-btn>
      </li>
      <template v-if="user && user.role === 'client'">
        <li>
          <v-btn text :to="{ name: 'cart' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Panier</span>
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'technician'">
        <li>
          <v-btn text :to="{ name: 'logs' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Logs</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <li v-if="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-sm-0 mr-lg-2 top-2 font-weight-bold">Profil</span>
                <v-icon>mdi-account-circle-outline</v-icon>
              </div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in profileItems" :key="index" :to="item.path">
              <v-list-item-title class="font-weight-bold">
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>
                  <span>{{ item.title }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title class="font-weight-bold">
                  <v-icon class="mr-2 red--text">mdi-logout</v-icon>
                  <span class="red--text">Se déconnecter</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </li>
      <template v-else>
        <li>
          <v-btn text class="font-weight-bold" :to="{ name: 'register' }">
            <span class="mr-2"> S'enregistrer</span>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-btn>
        </li>
        <li>
          <v-dialog
            v-model="loginDialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" class="font-weight-bold">
                <span class="mr-2">Se connecter</span>
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-btn>
            </template>
            <login-form @login="loginDialog=false" />
          </v-dialog>
        </li>
      </template>
    </ul>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '@/components/auth/LoginForm.vue'
export default {
  name: 'NavBar',
  components: {
    LoginForm
  },
  data () {
    return {
      loginDialog: false
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    menuItems () {
      if (this.user) {
        switch (this.user.role) {
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
    ...mapActions('auth', ['login', 'logout'])
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
.top-2 {
  position: relative;
  top: 1.6px;
}
</style>
