<template>
  <v-container>
    <v-row>
      <v-col class="col-6">
        <v-card>
          <v-card-title>
            Nombre de commandes
          </v-card-title>
          <canvas id="chart">
          </canvas>
        </v-card>
      </v-col>
      <v-col class="col-6">
        <v-card>
          <v-card-title>
            Chiffre d'affaire
          </v-card-title>
          <canvas id="chart2">
          </canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js/auto'

export default Vue.extend({
  name: 'Statistiques',
  components: {

  },
  data: () => ({
    stats: undefined,
    chart: undefined,
    chart2: undefined
  }),
  computed: {
    data () {
      return {
        labels: this.stats.map(s => new Date(s.date).toLocaleString()),
        datasets: [
          {
            label: 'Nombre de commande',
            data: this.stats.map(s => s.stats.orderCount),
            backgroundColor: ['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    },
    data2 () {
      return {
        labels: this.stats.map(s => new Date(s.date).toLocaleString()),
        datasets: [
          {
            label: 'Chiffre d\'affaire',
            data: this.stats.map(s => s.stats.salesFigures),
            backgroundColor: ['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    }
  },
  async mounted () {
    const today = new Date()
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)
    this.stats = (await this.axios.get(`/stats/api/stats?from=${today}&size=0`)).data.results
    this.chart = new Chart('chart', {
      type: 'bar',
      data: this.data
    })
    this.chart2 = new Chart('chart2', {
      type: 'bar',
      data: this.data2
    })

    // this.chart = new FusionCharts(this.config)
    // this.chart.render()
  }
})
</script>
