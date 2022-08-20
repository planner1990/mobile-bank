<template>
  <v-app dark>
    <v-container>
      <v-row
        justify="center"
      >
        <v-card>
          <v-card-text>
            {{ $t('error.'+error.statusCode) }}
          </v-card-text>
          <v-img
            contain
            :src="src"
          />
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      src: ''
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  mounted: function () {
    try {
      this.src = require('@/static/' + this.error.statusCode + '.jpeg')
    } catch {
      this.src = require('@/static/500.jpg')
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
