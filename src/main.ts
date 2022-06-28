import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Vue.use(VueAxios, axios)

axios.interceptors.request.use((config) => {
  if (!(store.state as any).auth.token) return config
  config.headers = config.headers || {}
  config.headers.Authorization = `Bearer ${(store.state as any).auth.token}`
  return config
})

// Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
