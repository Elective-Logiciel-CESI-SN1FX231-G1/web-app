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
import OrderView from '../views/OrderView.vue'
import UsersView from '../views/UsersView.vue'
import CgvView from '../views/CgvView.vue'
import PolicyView from '../views/PolicyView.vue'
import ComponentView from '../views/ComponentView.vue'

import store from '@/store'
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
    component: CartView,
    beforeEnter: (to, from, next) => {
      if (!['client'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/historique',
    name: 'historique',
    component: HistoriqueView,
    beforeEnter: (to, from, next) => {
      if (!['restaurateur', 'commercial', 'client', 'deliverer'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      if (!(store.state as any)?.auth?.user) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: StatistiquesView,
    beforeEnter: (to, from, next) => {
      if (!['restaurateur', 'commercial'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: GestionView,
    beforeEnter: (to, from, next) => {
      if (!['restaurateur'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      if (!['restaurateur', 'commercial'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/livraisons',
    name: 'livraisons',
    component: LivraisonView,
    beforeEnter: (to, from, next) => {
      if (!['deliverer'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/logs',
    name: 'logs',
    component: LogsView,
    beforeEnter: (to, from, next) => {
      if (!['technician'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: (to, from, next) => {
      if ((store.state as any)?.auth?.user) return next({ name: 'home' })
      return next()
    }
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
    component: SponsorView,
    beforeEnter: (to, from, next) => {
      if (!['client', 'restaurateur', 'deliverer'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/doc',
    name: 'doc',
    component: DocView,
    beforeEnter: (to, from, next) => {
      if (!['developer', 'technician'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/validation',
    name: 'validation',
    component: ValidationView,
    beforeEnter: (to, from, next) => {
      if (!['client'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
    beforeEnter: (to, from, next) => {
      if (!['client'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    beforeEnter: (to, from, next) => {
      if (!['commercial'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: CgvView
  },
  {
    path: '/policy',
    name: 'policy',
    component: PolicyView
  },
  {
    path: '/component',
    name: 'component',
    component: ComponentView,
    beforeEnter: (to, from, next) => {
      if (!['developer', 'technician'].includes((store.state as any)?.auth?.user?.role)) return next({ name: 'home' })
      return next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
