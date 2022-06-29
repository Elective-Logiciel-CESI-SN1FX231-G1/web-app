<template>
  <v-container>
    <v-card>
      <v-card-title>
        Composants réutilisables
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="col-12 col-sm-6 col-md-4 col-lg-2" v-for="c in components" :key="c.url">
            <v-card>
              <v-card-title>
                {{ c.title }}
              </v-card-title>
              <v-card-actions>
                <!-- <v-dialog
                  max-width="70%"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small v-bind="attrs" v-on="on" @click="fetchComponent(c)">
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-card-text>
                        {{c.text}}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="info" @click="dialog.value=false">Retour</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog> -->
                <v-btn color="success" small icon :href="c.url" :download="`${c.title}.txt`" target="_blank">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Components',
  components: {
    // Commande
  },
  data: () => ({
    currentTab: null,
    components: [
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/Commande.vue', title: 'Commande' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/DelayedSearchBar.vue', title: 'DelayedSearchBar' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/DeleteDialog.vue', title: 'DeleteDialog' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/FooterComponent.vue', title: 'FooterComponent' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/MenuForm.vue', title: 'MenuForm' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/MenuFormDialog.vue', title: 'MenuFormDialog' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/Navbar.vue', title: 'Navbar' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/NotifyError.vue', title: 'NotifyError' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/ProductForm.vue', title: 'ProductForm' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/ProductFormDialog.vue', title: 'ProductFormDialog' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/Restaurant.vue', title: 'Restaurant' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/RestaurantForm.vue', title: 'RestaurantForm' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/RestaurantFormDialog.vue', title: 'RestaurantFormDialog' },
      { url: 'https://raw.githubusercontent.com/Elective-Logiciel-CESI-SN1FX231-G1/web-app/dev/src/components/Restaurants.vue', title: 'Restaurants' }
    ] as {url:string, title:string, text:string}[]
  }),
  methods: {
    async fetchComponent (component) {
      if (component.text) return
      component.text = (await this.axios.get(component.url)).data
    }
  }
})
</script>
