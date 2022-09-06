<template>
  <small @click="redirect()">RUNNING ...</small>
</template>
<script>
export default {
  // this page only redirect to custom root page
  name: 'RedirectPage',
  created () {
    this.redirect()
  },
  methods: {
    redirect () {
      this.$router.push('/transactionReport')
    }
  }
}
</script>
