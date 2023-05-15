<template>
  <div class="bgOne">
    <div class="bgTwo">
      <v-sheet
        sm="12"
        class="d-flex align-stretch"
        :height="heightPage"
      >
        <v-col sm="12" md="6" style="background-color: #FFFFFF">
          <div class="text-center">
            <login class="login-right" />
          </div>
        </v-col>

        <v-col sm="12" md="6" class="hidden-sm-and-down left-side">
          <div class="h-100">
            <v-img
              style="height: 775px;width: 588px;left: -60px;top: 30px;"
              contain
              :src="require('~/static/img/login-left.svg')"
            />
          </div>
        </v-col>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import login from '@/components/login/login'

export default {
  name: 'LoginPage',
  components: {
    login
  },
  layout: 'auth',
  data () {
    return {
      heightPage: '3600px'
    }
  },
  mounted () {
    this.heightPage = (window.innerHeight - 40) + 'px'
  }
}
</script>

<style scoped>
input:-webkit-autofill {
  -webkit-text-fill-color: yellow;
}

/* others */
.bgOne {
  padding: 18px 18px 18px 18px;
  background: #f1f1f1;
}

.bgTwo {
  background-color: #fff;
  height: 100%;
  width: 100%;
}

.login-right {
  left: -80px;
  top: 80px;
}

@media only screen and (max-width: 1150px) {
  .login-right {
    left: 0;
    top: 80px;
  }
}

.left-side {
  left: 0;
  top: 0;
  background: #F2F2F2;
  border-radius: 0 300px 0 0;
}
</style>
