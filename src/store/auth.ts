import axios from 'axios'
import { Module } from 'vuex'

export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  role: Role
}

interface AuthState {
  user?: User,
  token?: string
}

const authModule : Module<AuthState, unknown> = {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth/user')),
    token: localStorage.getItem('auth/token')
  }),
  getters: {
    user: (state) => () => {
      return state.user
    },
    token: (state) => () => {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      localStorage.setItem('auth/token', token)
    },
    SET_USER (state, user) {
      state.user = user
      localStorage.setItem('auth/user', JSON.stringify(user))
    }
  },
  actions: {
    async login (context, { password, email }) {
      const { data } = (await axios.post('/auth/api/auth/login', {
        password,
        email
      }))
      context.commit('SET_TOKEN', data.token)
      context.commit('SET_USER', data.user)
    },

    async logout (context) {
      context.commit('SET_TOKEN', undefined)
      context.commit('SET_USER', undefined)
    }
  }
}

export default authModule
