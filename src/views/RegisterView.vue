<template>
  <v-container>
      <!-- <h1></h1> -->
      <profile-form :role="role"></profile-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileForm from '@/components/auth/ProfileForm.vue'

export default Vue.extend({
  name: 'Register',

  components: {
    ProfileForm
  },
  data: () => ({
    role: undefined
  }),
  async mounted () {
    if (this.$route.query.role) this.role = this.$route.query.role
  }
})
</script>
