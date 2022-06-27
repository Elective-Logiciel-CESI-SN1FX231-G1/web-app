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
import LogsView from '../views/LogsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ShopView from '../views/ShopView.vue'
import ShopRestaurantView from '../views/ShopRestaurantView.vue'
import SponsorView from '../views/SponsorView.vue'
import DocView from '../views/DocView.vue'
import ValidationView from '../views/ValidationView.vue'

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
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: StatistiquesView
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: GestionView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/livraison',
    name: 'livraison',
    component: LivraisonView
  },
  {
    path: '/logs',
    name: 'logs',
    component: LogsView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/shop/:id',
    name: 'shop-restaurant',
    component: ShopRestaurantView
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorView
  },
  {
    path: '/doc',
    name: 'doc',
    component: DocView
  },
  {
    path: '/validation',
    name: 'validation',
    component: ValidationView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
