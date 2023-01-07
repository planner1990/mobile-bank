<template>
  <v-card
    class="mx-auto mt-5"
    max-width="400"
  >
    <div class="logo">
      <v-img
        class="mb_40"
        contain
        :src="require('~/static/mehr-bank.png')"
      />
    </div>
    <div class="title">
      <v-card-title style="font-size:19px">
        {{ $t('login.title') }}
      </v-card-title>
    </div>
    <div class="text-input">
      <v-card-text>
        <v-text-field
          v-model="userName"
          outlined
          :label="$t('login.user_name')"
          dense
        />
        <v-text-field
          v-model="password"
          outlined
          dense
          :label="$t('login.password')"
          :type="showPassword ? 'text' : 'Password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        />
      </v-card-text>
    </div>

    <v-card-actions class="btn-action">
      <div style="padding-bottom:40px">
        <v-btn
          style="color: #4e3629"
          color="success"
          class="btn-login text-h5"
          @click="login"
        >
          {{ $t('login.login') }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data: () => {
    return {
      showPassword: false,
      userName: null,
      password: null,
      snacs: []
    }
  },
  methods: {
    ...mapActions({
      dologin: 'user/login',
      getUser: 'user/getUser'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    login () {
      const self = this
      self
        .dologin({
          userName: self.userName,
          password: self.password,
          axios: self.$axios
        })
        .then(
          function (data) {
            if (data >= 200 && data < 300) {
              self.$router.push({ path: '/' })
            } else {
              self.alert({
                color: 'orange',
                content: 'login.failed'
              })
            }
          },
          function (data) {
          }
        )
    }
  }
}
</script>

<style scoped>
.btn-login {
  width: 200px;
}

.logo {
  padding: 30px 50px 5px 50px
}

.title {
  padding: 0 22% 0 25%
}

.text-input {
  padding: 0 30px 10px 30px
}

.btn-action {
  text-align: center;
  display: block;
}
</style>
