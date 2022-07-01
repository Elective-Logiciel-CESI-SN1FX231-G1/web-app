<template>
  <v-container class="col-xl-8 offset-xl-2">
    <v-card flat>
      <v-card-title>
        Parrainage
      </v-card-title>
      <v-card-text>
        <v-alert
          v-model="alert"
          text
          type="success"
        >
          Parrainage effectué avec succès
        </v-alert>
        <v-row>
          <v-col class="col-12 col-md-6">
            <v-card outlined>
              <v-card-title>
                Mon code
              </v-card-title>
              <v-card-text>
                <!-- label="Mon code" -->
                <v-text-field
                  name="mysponsorCode"
                  v-model="myCode"
                  readonly
                  :loading="loading"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-card outlined>
              <v-card-title>
                Entrer un code
              </v-card-title>
              <v-card-text>
                <v-alert type="error" text v-if="error">
                  {{error}}
                </v-alert>
                <v-text-field
                  name="sponsorCode"
                  v-model="code"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="submit">Valider</v-btn>
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
import { mapState } from 'vuex'
// import ProductFormDialog from '@/components/ProductFormDialog.vue'
// import MenuFormDialog from '@/components/MenuFormDialog.vue'

export default Vue.extend({
  name: 'Gestion',

  components: {
  },
  data: () => ({
    myCode: undefined,
    code: '',
    loading: true,
    error: undefined,
    alert: false
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async submit () {
      try {
        await this.axios.post('/sponsor/api/sponsor-code', { code: this.code })
        this.alert = true
      } catch (error) {
        if (error.response.data === 'You have been sponsored already') this.error = 'Vous avez déja été parrainé'
        else this.error = 'Code invalide'
      }
    }
  },
  async mounted () {
    const myCode = (await this.axios.get('/sponsor/api/sponsor-code')).data
    this.myCode = myCode.code
    this.loading = false
  }
})
</script>
