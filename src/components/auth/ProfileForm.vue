<template>
  <v-card :loading="loading">
    <v-card-title primary-title>
      {{ user._id ? 'Éditer mon compte' : 'Créer un compte'}}
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-if="!user._id"
          v-model="user.email"
          name="email"
          label="Email"
          :rules="[
              v => !!v || 'L\'adresse email est requise',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'adresse email doit etre valide'
            ]"
        />
        <v-text-field
          v-model="user.firstname"
          name="firstname"
          label="Prénom"
          :rules="[
              v => !!v || 'Le prénom est requis'
            ]"
        />
        <v-text-field
          v-model="user.lastname"
          name="lastname"
          label="Nom"
          :rules="[
              v => !!v || 'Le nom est requis'
            ]"
        />
        <v-text-field
          v-model="user.phone"
          label="Numéro de téléphone"
          name="phone"
          :rules="[
              v => !!v || 'Le numéro de téléphone est requis'
            ]"
        />
        <v-text-field
          v-model="user.password"
          type="password"
          label="Mot de passe"
          :rules="[
              v => !!v || !!user._id || 'Le mot de passe est requis'
            ]"
        />
        <v-text-field
          type="password"
          label="Confirmation du mot de passe"
          :rules="[
              v => !!v || !!user._id || 'La confirmation du mot de passe est requise',
              v => v === user.password || 'Les mots de passe ne sont pas identique'
            ]"
        />
        <v-select
          v-if="!role && !user._id"
          :items="roles"
          v-model="user.role"
          label="Role"
          :rules="[
              v => !!v || 'Le role est requis'
            ]"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        @click="submit"
        :disabled="!valid || loading"
        :loading="loading"
      >
        Valider
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  components: {

  },
  props: {
    value: { type: Object, required: false, default: () => ({}) },
    role: { type: String, required: false }
  },
  data () {
    return {
      roles: [
        { text: 'Client', value: 'client' },
        { text: 'Livreur', value: 'deliverer' },
        { text: 'Restaurateur', value: 'restaurateur' },
        { text: 'Développeur', value: 'developer' }
      ],
      user: JSON.parse(JSON.stringify(this.value)),
      valid: false,
      loading: false,
      error: false
    }
  },
  computed: {
    // ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit () {
      if (this.role) this.user.role = this.role
      if (this.user._id) await this.axios.patch(`/auth/api/users/${this.user._id}`, this.user)
      else await this.axios.post('/auth/api/users', this.user)

      if (!this.user._id) {
        await this.login({
          email: this.user.email,
          password: this.user.password
        })
      }
      this.$emit('save')
      this.$router.push({ name: 'home' })
    }
  }
})
</script>
