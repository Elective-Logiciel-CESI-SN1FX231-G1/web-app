<template>
  <div>
    <div class="homebackground">
      <v-card
        class="d-flex flex-column align-center justify-space-around background"
      >
        <h2 class="white--text text-lg-h2 font-weight-medium text-center">
          Faites vous livrer plus <span class="blue--text font-weight-black">V'EAT</span> que
          l'éclair
        </h2>
        <div class="text-center">
          <v-form>
            <v-card class="pa-6 transparent">
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
          <p class="text-xl-h5 white--text">
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
    <div class="separator"></div>
    <div class="d-flex justify-space-around align-center flex-column flex-md-row">
      <div class="col-md-4 col-12 card">
        <v-img src="../assets/client.jpg" width="100%" aspect-ratio="1.5">
          <div class="d-flex flex-column justify-end h-100 pa-5 inset">
            <h3 class="text-xl-h3 font-weight-bold white--text">Passer commande</h3>
            <p class="text-xl-p white--text">Recevez votre repas rapidement</p>
            <v-btn :to="{name: 'register', query: {role: 'client'}}"
              elevation="24"
              outlined
              rounded
              text
              class="red w-20"
            >Démarrer</v-btn>
          </div>
        </v-img>
      </div>
      <div class="col-md-4 col-12 card">
        <v-img src="../assets/livreur.jpg" width="100%" aspect-ratio="1.5">
          <div class="d-flex flex-column justify-end h-100 pa-5 inset">
            <h3 class="text-xl-h3 font-weight-bold white--text">Rouler pour nous</h3>
            <p class="text-xl-p white--text">Livrer selon votre emploi du temps et bénéficier d'avantages exclusifs</p>
            <v-btn :to="{name: 'register', query: {role: 'deliverer'}}"
            elevation="24"
            outlined
            rounded
            text
            class="red w-20"
            >Démarrer</v-btn>
          </div>
        </v-img>
      </div>
      <div class="col-md-4 col-12 card">
        <v-img src="../assets/restaurateur.jpg">
          <div class="d-flex flex-column justify-end h-100 pa-5 inset">
            <h3 class="text-xl-h3 font-weight-bold white--text">Cuisiner pour nous</h3>
            <p class="text-xl-p white--text">Joignez vous à V'EAT en tant que restaurateur</p>
            <v-btn :to="{name: 'register', query: {role: 'restaurateur'}}"
              elevation="24"
              outlined
              rounded
              text
              class="red w-20"
            >Démarrer</v-btn>
          </div>
        </v-img>
      </div>
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
  height: 35vh;
  width: 60%;
  margin-left: 20%;
  background: #00000069;
}
.transparent {
  background: none !important;
  box-shadow: none !important;
}
.w-20 {
  width: 35%;
}
.card {
  padding: 0;
}
.h-100 {
  height: 100%;
}
.inset {
  box-shadow: inset 0em -10em 10em #000000d2;
}
.separator {
  width: 100%;
  height: 5px;
  background: black;
}
</style>
