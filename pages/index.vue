<template>
  <v-container fill-height fluid @click="redirect()">
    <v-row align="center" justify="center">
      <v-col md="12" style="text-align: center">
        <v-progress-circular
          indeterminate
          color="green"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // this page only redirect to custom root page
  name: 'RedirectPage',
  updated () {
    this.redirect()
  },
  mounted () {
    this.redirect()
  },
  created () {
    this.redirect()
  },
  methods: {
    redirect () {
      setTimeout(() => {
        if (window.history.length > 2) {
          return this.$router.back()
        }

        return this.$router.push('/transactionReport')
      }, 2000)
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
