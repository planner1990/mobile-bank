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
  mounted () {
    this.redirect()
  },
  methods: {
    redirect () {
      setTimeout(() => {
        if (window.history.length > 2 && sessionStorage.getItem('mob-login') === 'backIsTrue') {
          // important :: 2 action for back
          this.$router.back()
          this.$router.back()
          return false
        } else {
          sessionStorage.setItem('mob-login', 'backIsTrue')
          return this.$router.push('/transactionReport')
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
