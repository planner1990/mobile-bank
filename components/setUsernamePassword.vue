<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.saveUsername') }}
    </v-card-title>
    <v-card-text
      class="py-5 px-5"
      align="center"
    >
      <v-row>
        <v-col>
          <v-text-field
            v-model="username"
            :disabled="inputDisable"
            outlined
            dense
            clear-icon="mdi-account"
            :label="$t('common.username')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="password"
            :disabled="inputDisable"
            outlined
            dense
            clearable
            clear-icon="mdi-password"
            :label="$t('common.password')"
          />
        </v-col>
      </v-row>
      <v-layout justify-center align-center>
        <v-flex class="pt-0">
          <v-btn
            :disabled="confirmDisable"
            :loading="loading"
            class="primary--text font-weight-bold"
            depressed
            color="lightBlue"
            @click="confirm"
          >
            {{ $t('buttons.submit') }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import onlineDepositManager from '~/repository/online_deposit_manager'

export default {
  name: 'SetUsernamePassword',
  data () {
    return {
      username: null,
      password: null,
      inputDisable: false,
      loading: false
    }
  },
  computed: {
    confirmDisable () {
      return this.username === null || this.password === null || this.inputDisable
    }
  },
  methods: {
    ...mapActions({
      initOnlineDeposit: 'onlineDepositStore/initOnlineDeposit'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    confirm () {
      this.loading = true
      const request = {
        username: this.username,
        password: this.password
      }
      onlineDepositManager.saveUsername(this.$route.params.id, request, this.$axios).then(() => {
        this.inputDisable = true
        this.alert({
          color: 'success',
          content: this.$i18n.t('messages.successful')
        })
        this.loading = false
        this.initOnlineDeposit(this.$route.params.id)
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
    }
  }
}
</script>
