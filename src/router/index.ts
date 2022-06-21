import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import HistoriqueView from '../views/HistoriqueView.vue'
import ProfileView from '../views/ProfileView.vue'
import StatistiquesView from '../views/StatistiquesView.vue'
import GestionView from '../views/GestionView.vue'
import DashboardView from '../views/DashboardView.vue'
import LivraisonView from '../views/LivraisonView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/historique',
    name: 'historique',
    component: HistoriqueView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/statistiques',
    name: 'Statistiques',
    component: StatistiquesView
  },
  {
    path: '/gestion',
    name: 'Gestion',
    component: GestionView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/livraison',
    name: 'Livraison',
    component: LivraisonView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
