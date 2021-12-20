<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="success"
        elevation="0"
        small
        :disabled="dialogButtonDisable"
        v-bind="attrs"
        v-on="on"
        @click.stop="dialog = true"
      >
        {{ $t('buttons.saveUsername') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title primary-title class="lightGreen text-h4">
        {{ $t('titles.saveUsername') }}
      </v-card-title>

      <v-card-text
        class="py-5 px-5"
        align="center"
      >
        <v-text-field
          v-model="username"
          dense
          outlined
          :label="$t('common.username')"
          prepend-icon="mdi-account"
        />
        <v-text-field
          v-model="password"
          dense
          outlined
          :label="$t('common.password')"
          prepend-icon="mdi-lock"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          :loading="submitButtonLoading"
          :disabled="submitButtonDisable"
          @click="submit"
        >
          {{ $t('buttons.submit') }}
        </v-btn>
        <v-btn
          color="error"
          @click="close"
        >
          {{ $t('buttons.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import onlineDepositManager from '~/repository/online_deposit_manager'

export default {
  name: 'SaveUsernameDialog',
  props: {
    onlineDeposit: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      username: null,
      password: null,
      submitButtonLoading: false
    }
  },
  computed: {
    submitButtonDisable () {
      return this.username === null || this.password === null
    },
    dialogButtonDisable () {
      return (this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.DEPOSIT_OPENED.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value')) || this.onlineDeposit.username !== null
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    submit () {
      this.submitButtonLoading = true
      const request = {
        username: this.username,
        password: this.password
      }
      onlineDepositManager.saveUsername(this.onlineDeposit.id, request, this.$axios).then(() => {
        this.submitButtonLoading = false
        this.alert({
          color: 'success',
          content: this.$i18n.t('successful')
        })
        this.close()
      }).catch((error) => {
        this.submitButtonLoading = false
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
      })
    },
    close () {
      this.username = null
      this.password = null
      this.submitButtonLoading = false
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
