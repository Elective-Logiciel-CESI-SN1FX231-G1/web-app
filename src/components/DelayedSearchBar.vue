<template>
  <v-text-field
    clearable
    name="search"
    v-model="search"
    @input="input"
    prepend-inner-icon="mdi-magnify"
    label="Rechercher"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      search: '',
      timeout: undefined
    }
  },
  methods: {
    input () {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout)
        this.$emit('input', this.search || '')
      }, 200)
    }
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
  }
})
</script>
