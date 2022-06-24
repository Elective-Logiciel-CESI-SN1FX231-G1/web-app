<template>
  <v-container>
    <div>
      <h1>Profile</h1>
      <profile-form :value="user"></profile-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileForm from '@/components/auth/ProfileForm.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Profile',
  components: {
    ProfileForm
  },
  computed: {
    ...mapState('auth', ['user'])
  }
})
</script>
