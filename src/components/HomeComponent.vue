<template>
  <div>
    <div class="homebackground">
      <v-card
        class="d-flex flex-column align-center justify-space-around background"
      >
        <h2 class="mt-10 white--text text-lg-h2 font-weight-medium">
          Faites vous livrer plus <span class="blue--text font-weight-black">V'EAT</span> que
          l'éclair
        </h2>
        <div>
          <v-form>
            <v-card class="pa-6 mt-10 transparent">
              <v-text-field
                label="Votre adresse"
                placeholder="Saisissez votre adresse"
                dense
                hide-details
                outlined
                clearable
                class="white"
              ></v-text-field>
            </v-card>
          </v-form>
          <p class="text-xl-h5 mt-8 white--text">
            <v-dialog
            v-model="loginDialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" class="font-weight-bold pa-0">
                <span class="blue--text font-weight-bold text-xl-h6 text-decoration-underline">Connectez-vous</span>
              </v-btn>
            </template>
            <login-form @login="loginDialog=false" />
          </v-dialog>
          pour voir vos adresses récentes
          </p>
        </div>
    </v-card>
    </div>
    <div class="d-flex justify-space-around">
      <h2>img</h2>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'
export default {
  name: 'HomeComponent',
  components: {
    LoginForm
  },
  data () {
    return {
      loginDialog: false
    }
  }
}
</script>

<style scoped>
.homebackground {
  height: 94vh;
  background: url("../assets/HomeBackground.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}
.background {
  height: 55vh;
  width: 60%;
  margin-left: 20%;
  background: #00000069;
}
.transparent {
  background: none !important;
  box-shadow: none !important;
}
</style>
