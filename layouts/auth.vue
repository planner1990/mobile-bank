<template>
  <v-app class-name="bg">
    <v-main>
      <nuxt />
    </v-main>
    <snackbar />
  </v-app>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import snackbar from '@/components/snacks'

export default {
  components: {
    snackbar
  },
  middleware: [
    'auth'
  ],
  data () {
    return {
      colors,
      clipped: true,
      drawer: true,
      mini: true
    }
  }
}
</script>

<style scoped>
.bg {
  background: #f1f1f1 !important;
}
</style>
