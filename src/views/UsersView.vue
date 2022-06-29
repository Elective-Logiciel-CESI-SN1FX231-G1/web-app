<template>
  <v-container>
    <v-card>
      <v-card-title>
        Utilisateurs
      </v-card-title>
      <v-card-text>
                <v-data-iterator
                  :items="users"
                  @pagination="fetchUsers"
                  :page.sync="usersPage"
                  :items-per-page.sync="usersItemPerPage"
                  :server-items-length="usersCount"
                >

                  <template v-slot:default="props">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th class="text-left">Email</th>
                        <th class="text-left">Prénom</th>
                        <th class="text-left">Nom</th>
                        <th class="text-left">Numéro de téléphone</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in props.items"
                        :key="item.email"
                      >
                        <td>{{ item.email }}</td>
                        <td>{{ item.firstname }}</td>
                        <td>{{ item.lastname }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.role }}</td>
                        <td>
                          <v-btn v-if="!item.ban" color="error" tile @click="banUser(item._id,true)">suspendre</v-btn>
                          <v-btn v-else color="success" tile @click="banUser(item._id,false)">restaurer</v-btn>
                          <delete-dialog label="un utilisateur" @delete="deleteUser(item._id)"></delete-dialog>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  </template>
                </v-data-iterator>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import DeleteDialog from '@/components/DeleteDialog.vue'

export default Vue.extend({
  name: 'Users',

  components: {
    DeleteDialog
  },
  data: () => ({
    users: undefined,
    usersCount: 0,
    usersPage: 1,
    usersItemPerPage: 10
  }),
  methods: {
    async fetchUsers () {
      const users = (await this.axios.get(`/auth/api/users?page=${this.usersPage}&size=${this.usersItemPerPage === -1 ? 0 : this.usersItemPerPage}`)).data
      this.users = users.results
      this.usersCount = users.count
    },
    async banUser (_id, ban) {
      await this.axios.patch(`/auth/api/users/${_id}`, { ban })
      await this.fetchUsers()
    },
    async deleteUser (_id) {
      await this.axios.delete(`/auth/api/users/${_id}`)
      await this.fetchUsers()
    }
  },
  async mounted () {
    await this.fetchUsers()
  }
})
</script>
