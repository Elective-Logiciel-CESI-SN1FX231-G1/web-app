import axios from 'axios'
import { Module } from 'vuex'
import Role, { User } from './auth'

type Status = 'completed'|'cancelled'|'delivering'|'preparating'|'validating'|'waitingDelivery'

interface Restaurant {
  owner: User,
  name: string,
  description: string,
  address: string,
  position:{
    lon:number,
    lat:number
  },
  openingHours:[
    {from:Date, to:Date}
  ]
  types: Array<string>,
  isClosed: boolean
}

interface Product {
  name: string,
  price: number,
  description: string,
  image: string,
  restaurant: Restaurant
}

interface Menu {
  name: string,
  price: number,
  description: string,
  image: string,
  products: Product[],
  restaurant: Restaurant
}

interface Order {
  products: Product[],
  menus: Menu[],
  price: number,
  deliveryPrice: number,
  commissionPrice: number,
  restaurant: Restaurant,
  comment: string,
  address: string,
}

interface CartState {
  order: Order
}

const cartModule : Module<CartState, unknown> = {
  namespaced: true,
  state: () => ({
    order: {
      products: [],
      menus: [],
      price: 0,
      deliveryPrice: 5,
      commissionPrice: 3,
      restaurant: undefined,
      comment: '',
      address: ''
    }
  }),
  getters: {
    order: (state) => () => {
      return state.order
    }
  },
  mutations: {
    SET_ORDER (state, order) {
      state.order = order
    },
    PUSH_PRODUCT (state, product) {
      state.order.products.push(product)
    },
    REMOVE_PRODUCT (state, product) {
      const index = state.order.products.findIndex(el => el === product)
      state.order.products.splice(index, 1)
    },
    PUSH_MENU (state, menu) {
      state.order.menus.push(menu)
    },
    REMOVE_MENU (state, menu) {
      const index = state.order.menus.findIndex(el => el === menu)
      state.order.menus.splice(index, 1)
    },
    SET_PRICE (state, item) {
      state.order.price += item
    },
    REMOVE_PRICE (state, item) {
      state.order.price -= item
    },
    SET_RESTAURANT (state, item) {
      state.order.restaurant = item
    }
  },
  actions: {
    async createOrder (context) {
      const { data } = (await axios.post('api/orders',
        context.state.order
      ))
      context.commit('SET_ORDER', data.order)
    },
    addProductToCart (context, product) {
      if (!context.state.order.restaurant) context.commit('SET_RESTAURANT', product.restaurant)
      if (context.state.order.restaurant !== product.restaurant) throw new Error('Votre commande ne peut contenir que les menus et les produits d\'un seul restaurant.')
      context.commit('PUSH_PRODUCT', product)
      context.commit('SET_PRICE', product.price)
    },
    removeProductToCart (context, product) {
      if (context.state.order.products.length === 1 && context.state.order.menus.length === 0) context.commit('SET_RESTAURANT', undefined)
      context.commit('REMOVE_PRODUCT', product)
      context.commit('REMOVE_PRICE', product.price)
    },
    addMenuToCart (context, menu) {
      if (!context.state.order.restaurant) context.commit('SET_RESTAURANT', menu.restaurant)
      if (context.state.order.restaurant !== menu.restaurant) throw new Error('Votre commande ne peut contenir que les menus et les produits d\'un seul restaurant.')
      context.commit('PUSH_MENU', menu)
      context.commit('SET_PRICE', menu.price)
    },
    removeMenuToCart (context, menu) {
      if (context.state.order.products.length === 0 && context.state.order.menus.length === 1) context.commit('SET_RESTAURANT', undefined)
      context.commit('REMOVE_MENU', menu)
      context.commit('REMOVE_PRICE', menu.price)
    }
  }
}

export default cartModule
