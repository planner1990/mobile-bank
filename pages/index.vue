<template>
  <small @click="redirect()">REDIRECT (click)</small>
</template>
<script>
export default {
  // this page only redirect to custom root page
  name: 'RedirectPage',
  created () {
    this.redirect()
  },
  mounted () {
    this.redirect()
  },
  methods: {
    redirect () {
      if (window.history.length > 2) {
        this.$router.back()
      }

      this.$router.push('/transactionReport')
    }
  }
}
</script>
