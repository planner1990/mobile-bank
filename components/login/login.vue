<template>
  <v-card
    class="mx-auto mt-5"
    max-width="400"
    style="box-shadow: unset"
  >
    <div class="logo">
      <v-img
        contain
        :src="require('~/static/mehr-bank.png')"
      />
    </div>

    <div class="title" style="margin-top: -20px">
      <v-card-title style="font-size: 16px;">
        {{ $t('login.title') }}
      </v-card-title>
    </div>

    <div class="text-input">
      <v-card-text>
        <label class="float-right mb-2">{{ $t('login.user_name') }}</label>
        <br>
        <v-text-field
          v-model="userName"
          outlined
          dense
          class="mb-6 text-field"
        >
          <template #prepend-inner>
            <div style="text-align:right;width: 65px">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5902 22C20.5902 18.13 16.7402 15 12.0002 15C7.26016 15 3.41016 18.13 3.41016 22M12.0002 12C13.3262 12 14.598 11.4732 15.5357 10.5355C16.4734 9.59785 17.0002 8.32608 17.0002 7C17.0002 5.67392 16.4734 4.40215 15.5357 3.46447C14.598 2.52678 13.3262 2 12.0002 2C10.6741 2 9.4023 2.52678 8.46462 3.46447C7.52694 4.40215 7.00016 5.67392 7.00016 7C7.00016 8.32608 7.52694 9.59785 8.46462 10.5355C9.4023 11.4732 10.6741 12 12.0002 12Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </template>
          <template #append>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 10H17M7 15.5H17M7.5 4H16.5C17.12 4 17.67 4.02 18.16 4.09C20.79 4.38 21.5 5.62 21.5 9V15C21.5 18.38 20.79 19.62 18.16 19.91C17.67 19.98 17.12 20 16.5 20H7.5C6.88 20 6.33 19.98 5.84 19.91C3.21 19.62 2.5 18.38 2.5 15V9C2.5 5.62 3.21 4.38 5.84 4.09C6.33 4.02 6.88 4 7.5 4Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.0957 10H10.1047M7.0957 10H7.1047" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </template>
        </v-text-field>

        <label class="float-right mb-2">{{ $t('login.password') }}</label>
        <br>
        <v-text-field
          v-model="password"
          outlined
          dense
          :type="showPassword ? 'text' : 'Password'"
          class="mb-6 text-field"
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        >
          <template #prepend-inner>
            <div style="text-align:right;width: 65px">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.9951 16H16.0051M11.9941 16H12.0041M7.99414 16H8.00214" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg
                v-if="!showPassword"
                style="cursor: pointer;margin-right: 10px;"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="showPassword = !showPassword"
              >
                <path d="M14.5298 9.47002L9.46984 14.53C8.79884 13.859 8.42188 12.949 8.42188 12C8.42188 11.5302 8.51442 11.0649 8.69423 10.6308C8.87404 10.1967 9.13759 9.80226 9.46984 9.47002C9.80208 9.13777 10.1965 8.87422 10.6306 8.69441C11.0647 8.5146 11.53 8.42206 11.9998 8.42206C12.9488 8.42206 13.8588 8.79902 14.5298 9.47002Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77M8.41984 19.53C9.55984 20.01 10.7698 20.27 11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39998C20.7798 8.87998 20.4198 8.38998 20.0498 7.92998" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.51 12.7C15.3745 13.3976 15.0337 14.0387 14.5312 14.5412C14.0287 15.0437 13.3876 15.3845 12.69 15.52M9.47 14.53L2 22M22 2L14.53 9.47" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg
                v-else
                style="cursor: pointer;margin-right: 10px;"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="showPassword = !showPassword"
              >
                <path d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.41998 11.9999 8.41998C13.9799 8.41998 15.5799 10.02 15.5799 12Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </template>
          <template #append>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 10H17M7 15.5H17M7.5 4H16.5C17.12 4 17.67 4.02 18.16 4.09C20.79 4.38 21.5 5.62 21.5 9V15C21.5 18.38 20.79 19.62 18.16 19.91C17.67 19.98 17.12 20 16.5 20H7.5C6.88 20 6.33 19.98 5.84 19.91C3.21 19.62 2.5 18.38 2.5 15V9C2.5 5.62 3.21 4.38 5.84 4.09C6.33 4.02 6.88 4 7.5 4Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.0957 10H10.1047M7.0957 10H7.1047" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </template>
        </v-text-field>
      </v-card-text>
    </div>

    <v-card-actions class="btn-action">
      <div style="padding-bottom:40px;margin-right: -10px;">
        <v-btn
          v-if="authLogin"
          style="width: 375px;height: 48px;background: #84BD00;border-radius: 10px;color: #FFFFFF"
          color=""
          class="text-h5"
          :loading="loading"
          :disabled="loading"
          @click="login"
        >
          {{ $t('login.login') }}
        </v-btn>
        <span v-else>
          برای کار با پنل از طریق مرورگر سیستم اقدام کنید
        </span>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'LoginComponent',
  props: {
    msg: String
  },
  data: () => {
    return {
      loading: false,
      showPassword: false,
      userName: null,
      password: null,
      authLogin: false
    }
  },
  mounted () {
    this.authLogin = !(window.innerWidth <= 1150)
  },
  methods: {
    ...mapActions({
      doLogin: 'user/login'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    login () {
      const self = this
      self.loading = true
      self
        .doLogin({
          userName: self.userName,
          password: self.password,
          axios: self.$axios
        })
        .then(
          function (data) {
            if (data >= 200 && data < 300) {
              self.$router.push({ path: '/' })
            } else if (data >= 400 && data < 500) {
              self.alert({
                color: 'orange',
                content: 'login.failed'
              })
            } else {
              self.alert({
                color: 'orange',
                content: 'error.500'
              })
            }
          }).finally(() => {
          self.loading = false
        })
    }
  }
}
</script>

<style scoped>
.logo {
  padding:30px 50px 5px 50px
}

.title {
  padding:0 29% 0 25%
}

.btn-action {
  text-align: center;
  display: block;
}

.text-field{
  border-width: 0.5px !important;
  width: 400px;
  height: 48px;
  border-radius: 10px;
  color: #84BD00 !important;
}

/deep/ .v-input__slot{
  height: 50px;
}

/deep/ .v-input__prepend-inner {
  margin-top: 13px !important;
}

/deep/ .v-input__append-inner {
  margin-top: 13px !important;
}

/deep/ .v-text-field>.v-input__control>.v-input__slot>.v-text-field__slot {
  display: flex;
  flex: 1 1 auto;
  position: relative;
  margin-right: 15px;
  margin-top: 5px;
  direction: ltr;
  margin-left: 20px;
}
</style>
