<template>
  <v-container>
    <v-row>
      <v-col class="col-6">
        <v-card>
          <v-card-title>
            Utilisation du processeur
          </v-card-title>
          <canvas id="chart">
          </canvas>
        </v-card>
      </v-col>
      <v-col class="col-6">
        <v-card>
          <v-card-title>
            Utilisation de la mémoire
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
  name: 'Performance',
  components: {

  },
  data: () => ({
    perfs: [],
    chart: undefined,
    chart2: undefined,
    interval: undefined
  }),
  computed: {
    colors () {
      return ['#800000', '#FF4500', '#FFFF00', '#006400', '#00FFFF', '#0000CD']
    },
    backgroundColors () {
      return this.colors.map(c => c + '33')
    },
    data () {
      const data = {}
      this.perfs.forEach(perf => {
        data[perf.date] = data[perf.date] || {}
        data[perf.date][perf.service_id] = perf
      })
      return data
    },
    machines () {
      const ids = []
      this.perfs.forEach(perf => {
        if (!ids.includes(perf.service_id)) ids.push(perf.service_id)
      })
      return ids
    },
    cpuUsage () {
      return {
        labels: Object.keys(this.data).map(a => (new Date(a)).toLocaleTimeString()),
        datasets: this.machines.map((id, index) => ({
          label: `Machine ${id}`,
          data: Object.values(this.data).map(atDate => atDate[id]?.cpu || undefined),
          backgroundColor: this.backgroundColors[index],
          borderColor: this.colors[index],
          fill: true
        }))
      }
    },
    ramUsage () {
      return {
        labels: Object.keys(this.data).map(a => (new Date(a)).toLocaleTimeString()),
        datasets: this.machines.map((id, index) => ({
          label: `Machine ${id}`,
          data: Object.values(this.data).map(atDate => atDate[id]?.ram || undefined),
          backgroundColor: this.backgroundColors[index],
          borderColor: this.colors[index],
          fill: true
        }))
      }
    }
  },
  methods: {
    async fetch () {
      const today = new Date(Date.now() - 60 * 60 * 1000)
      this.perfs = (await this.axios.get(`/perfs/api/perfs?from=${today.toISOString()}&size=0`)).data.results
      this.chart?.destroy()
      this.chart2?.destroy()

      this.chart = new Chart('chart', {
        type: 'line',
        data: this.cpuUsage,
        options: {
          scales: {
            y: {
              min: 0,
              max: 100
            }
          }
        }
      })
      this.chart2 = new Chart('chart2', {
        type: 'line',
        data: this.ramUsage,
        options: {
          scales: {
            y: {
              min: 0
            }
          }
        }
      })
    }
  },
  async mounted () {
    this.interval = setInterval(() => this.fetch(), 10000)
    await this.fetch()
  },
  async destroyed () {
    clearInterval(this.interval)
  }
})
</script>
