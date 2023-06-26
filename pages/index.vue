<template>
  <v-container fill-height fluid @click="redirect()">
    <v-row align="center" justify="center">
      <v-col md="12" style="text-align: center">
        <v-progress-circular
          indeterminate
          color="green"
        />

        <div v-show="showLabelForwardToBaseRoute" style="margin-top: 10px;">
          <span style="cursor: pointer" @click="forwardToBaseRoute()">
            در صورت عدم انتقال <span style="color: blue">اینجا</span> را کلیک کنید
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // this page only redirect to custom root page
  name: 'RedirectPage',
  data () {
    return {
      showLabelForwardToBaseRoute: false
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'user/me'
    })
  },
  mounted () {
    this.redirect()
    this.showLabelForwardToBaseRouteTimeout()
  },
  methods: {
    showLabelForwardToBaseRouteTimeout: function () {
      setTimeout(function (scope) { scope.showLabelForwardToBaseRoute = true }, 4000, this)
    },
    forwardToBaseRoute: function () {
      sessionStorage.setItem('mob-login', 'backIsFalse')
      if (this.loggedInUser.role.role === 'REPORTER') {
        return this.$router.push('/bill-report')
      } else {
        return this.$router.push('/transactionReport')
      }
    },
    redirect () {
      console.log('pages/index.vue redirect ***', window.history.state)
      setTimeout(() => {
        if (window.history.state !== null && window.history.length > 2 && sessionStorage.getItem('mob-login') === 'backIsTrue') {
          // important :: 2 action for back
          this.$router.back()
          this.$router.back()
          return false
        } else {
          sessionStorage.setItem('mob-login', 'backIsTrue')
          if (this.loggedInUser.role.role === 'REPORTER') {
            return this.$router.push('/bill-report')
          } else {
            return this.$router.push('/transactionReport')
          }
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
