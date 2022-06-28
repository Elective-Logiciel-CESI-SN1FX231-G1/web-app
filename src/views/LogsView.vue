<template>
  <v-container  class="col-xl-8 offset-xl-2">
    <v-card :loading="loading">
      <v-card-title>
        Logs
      </v-card-title>
      <v-card-text v-if="count">
        <v-pagination  v-model="page" :length="(count-1)/itemPerPage + 1" v-if="count > itemPerPage"></v-pagination>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                Type de logs
              </th>
              <th class="text-left">
                Date
              </th>
              <th/>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="logsEntry in logsEntries"
              :key="logsEntry._id"
            >
              <td>{{ names[logsEntry.type] }}</td>
              <td>{{ logsEntry.date }}</td>
              <td>
                <v-btn color="success" icon :href="`/logs/api/logs/${logsEntry.type}/${logsEntry.date}`" :download="`${logsEntry.type}:${logsEntry.date}.txt`">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-pagination  v-model="page" :length="(count-1)/itemPerPage + 1" v-if="count > itemPerPage"></v-pagination>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
// import ProductFormDialog from '@/components/ProductFormDialog.vue'

export default Vue.extend({
  name: 'Logs',
  components: {
    // ProductFormDialog
  },
  data: () => ({
    logsEntries: undefined,
    loading: true,
    page: 1,
    count: 0,
    itemPerPage: 10,
    names: {
      connection: 'Historique de connexion'
    }
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  watch: {
    page () {
      this.fetchLogs()
    }
  },
  methods: {
    async fetchLogs () {
      this.loading = true
      const logsEntries = (await this.axios.get(`/logs/api/logs?page=${this.page}&size=${this.itemPerPage}`)).data
      this.logsEntries = logsEntries.results
      this.count = logsEntries.count
      this.loading = false
    }
  },
  async mounted () {
    await this.fetchLogs()
  }
})
</script>
