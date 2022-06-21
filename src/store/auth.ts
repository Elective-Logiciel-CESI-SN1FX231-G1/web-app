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
    user: undefined,
    token: undefined
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
    },
    SET_USER (state, user) {
      state.user = user
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
    }
  }
}

export default authModule
