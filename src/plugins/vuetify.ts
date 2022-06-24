import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import fr from 'vuetify/src/locale/fr'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { fr }
  }
})
