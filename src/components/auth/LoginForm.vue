<template>
  <v-card :loading="loading">
    <v-card-title primary-title>
      Se connecter
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-alert
          v-if="error"
          color="error"
          text
        >
          Adresse email ou mot de passe invalide
        </v-alert>
        <v-text-field
          v-model="email"
          label="Email"
          name="email"
          :rules="[
              v => !!v || 'L\'adresse email est requise',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'adresse email doit etre valide'
            ]"
        />
        <v-text-field
          v-model="password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Mot de passe"
          :rules="[
              v => !!v || 'Le mot de passe est requis'
            ]"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        @click="tryLogin"
        :disabled="!valid || loading"
        :loading="loading"
      >
        Se connecter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  components: {

  },
  data: () => ({
    email: '',
    password: '',
    valid: false,
    showPassword: false,
    loading: false,
    error: false
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async tryLogin () {
      try {
        this.loading = true
        this.error = false
        await this.login({
          email: this.email,
          password: this.password
        })
        this.$emit('login')
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
