<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.getFromLocalStorage()
  },
  methods: {
    getFromLocalStorage() {
      const reference = localStorage.getItem('bookList')
      if (reference) {
        this.$store.dispatch('setOrderedBook', JSON.parse(reference))
      }
    },
  },
}
</script>
