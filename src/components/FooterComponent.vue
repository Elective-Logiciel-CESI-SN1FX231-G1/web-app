<template>
  <v-footer
    color="primary"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.path"
      >
        <div class="d-flex align-center">
          <p class="ma-0" v-text="link.title"></p>
        </div>
      </v-btn>
      <v-col
        class="primary lighten-1 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>V'Eat</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>

export default {
  name: 'FooterComponent',
  data: () => ({
    links: [
      {
        title: 'Accueil',
        path: '/'
      },
      {
        title: 'Mon Compte',
        path: '/profile'
      },
      {
        title: 'Conditions Générales de Ventes',
        path: '/cgv'
      },
      {
        title: 'Politique de confidentialité',
        path: '/policy'
      }
    ]
  })
}
</script>
