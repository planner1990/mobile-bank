<template>
  <v-card
    class="d-flex
    align-content-space-around
    justify-space-between
    fill-height
    rounded-lg
    flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.requestInfo') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-layout justify-space-between align-center class="my-2">
        <v-col>
          <show-item
            :icon="'mdi-identifier'"
            :title="$t('onlineDepositFields.id')"
            :content="onlineDeposit.id"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-clipboard-list-outline'"
            :title="$t('common.status')"
            :content="$t('onlineDepositStatus.' + onlineDeposit.status + '.name')"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-calendar-clock'"
            :title="$t('onlineDepositFields.createdDate')"
            :content="moment(onlineDeposit.createdDate)"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-credit-card-scan'"
            :title="$t('onlineDepositFields.depositType')"
            :content="onlineDeposit.depositType"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-bank'"
            :title="$t('onlineDepositFields.branchCode')"
            :content="onlineDeposit.branchCode"
          />
        </v-col>
      </v-layout>
      <v-divider />
      <v-layout justify-space-between align-center class="my-2">
        <v-col>
          <show-item
            :icon="'mdi-cash-100'"
            :title="$t('onlineDepositFields.amountPayed')"
            :content="priceFormat(onlineDeposit.amountPayed)"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-archive-arrow-down'"
            :title="$t('onlineDepositFields.deliveryType')"
            :content="deliveryType(onlineDeposit.deliveryType)"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-clipboard-list'"
            :title="$t('onlineDepositFields.customerNo')"
            :content="onlineDeposit.customerNo"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-clipboard-list'"
            :title="$t('onlineDepositFields.depositNo')"
            :content="onlineDeposit.depositNo"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="onlineDeposit.smsEnabled ? 'mdi-cellphone-message' : 'mdi-cellphone-message-off' "
            :title="$t('onlineDepositFields.smsEnabled')"
            :content="onlineDeposit.smsEnabled ? $t('common.activate') : $t('common.deactivate')"
          />
        </v-col>
      </v-layout>
      <v-divider />
      <v-layout row class="py-5">
        <v-flex xs4 />
        <v-flex xs4>
          <v-layout row align-center justify-center>
            <v-btn
              v-show="changeStatusButtonShow"
              :class="changeStatusButtonClass"
              elevation="5"
              style="font-size: 1rem"
              depressed
              :loading="changeStatusButtonLoading"
              @click="changeStatus"
            >
              {{ changeStatusButtonText }}
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <v-layout row align-center justify-end class="pl-3">
            <v-btn
              v-show="removeButtonShow"
              class="lightRed light--text font-weight-bold"
              elevation="5"
              style="font-size: 1rem"
              depressed
              :loading="removeButtonLoading"
              @click="test"
            >
              {{ $t('buttons.removeOnlineDeposit') }}
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userManager from '~/repository/user_manager'

export default {
  name: 'OnlineDepositRequestInfo',
  data () {
    return {
      userManager: userManager,
      changeStatusButtonLoading: false,
      removeButtonLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me',
      onlineDeposit: 'onlineDepositStore/currentState'
    }),
    changeStatusButtonClass () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        return 'orange font-weight-bold'
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value')) {
        return 'lightBlue primary--text font-weight-bold'
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REJECTED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        return 'lightBlue primary--text font-weight-bold'
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value')) {
        return 'lightBlue primary--text font-weight-bold'
      }
      return ''
    },
    removeButtonShow () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.INIT.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROGRESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REGISTRY_INQUIRY_REJECTED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REGISTRY_INQUIRY_ERROR.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        if (this.currentUser.role.role === 'ADMIN') {
          const permissions = this.currentUser.permissions.filter(e => e.name === 'FULL_ACCESS' || e.name === 'REMOVE_ONLINE_DEPOSIT')
          if (permissions.length !== 0) {
            return true
          }
        }
      }
      return false
    },
    changeStatusButtonShow () {
      /* return this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REJECTED.value') */

      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value')) {
        return this.currentUser.role.role === 'ADMIN'
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REJECTED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        if (this.currentUser.role.role === 'ADMIN') {
          const permissions = this.currentUser.permissions.filter(e => e.name === 'FULL_ACCESS' || e.name === 'REVERT_STATUS')
          if (permissions.length !== 0) {
            return true
          }
        }
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value') && this.onlineDeposit.deliveryType === 'BRANCH') {
        if (this.onlineDeposit.username && this.onlineDeposit.password && !this.onlineDeposit.excelId) {
          const permissions = this.currentUser.permissions.filter(e => e.name === 'FULL_ACCESS' || e.name === 'UPDATE_STATUS_TO_CARD_SENT')
          if (permissions.length !== 0) {
            return true
          }
        }
      }

      return false
    },
    changeStatusButtonText () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        return this.$i18n.t('buttons.updateStatusToReadyForProcess')
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value')) {
        return this.$i18n.t('buttons.updateStatusToInProcess')
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REJECTED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        return this.$i18n.t('buttons.revertStatusToReadyForProcess')
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value')) {
        return this.$i18n.t('buttons.updateStatusToCardSent')
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      changeStatusToReadyForProcess: 'onlineDepositStore/updateStatusToReadyForProcess',
      changeStatusToInProcess: 'onlineDepositStore/updateStatusToInProcess',
      revertStatusToReadyForProcess: 'onlineDepositStore/revertStatusToReadyForProcess',
      changeStatusToCardSent: 'onlineDepositStore/changeStatusToCardSent',
      removeOnlineDeposit: 'onlineDepositStore/removeOnlineDeposit'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    changeStatus () {
      this.changeStatusButtonLoading = true
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        this.changeStatusToReadyForProcess(this.$route.params.id).catch((error) => {
          if (error.response) {
            this.alert({
              color: 'orange',
              title: this.translateLoc(error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].loc : null),
              content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
            })
          } else {
            this.alert({
              color: 'orange',
              content: 'messages.failed'
            })
          }
        }).finally(() => {
          this.changeStatusButtonLoading = false
        })
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value')) {
        this.changeStatusToInProcess(this.$route.params.id).catch((error) => {
          if (error.response) {
            this.alert({
              color: 'orange',
              title: this.translateLoc(error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].loc : null),
              content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
            })
          } else {
            this.alert({
              color: 'orange',
              content: 'messages.failed'
            })
          }
        }).finally(() => {
          this.changeStatusButtonLoading = false
        })
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.REJECTED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        this.revertStatusToReadyForProcess(this.$route.params.id).catch((error) => {
          if (error.response) {
            this.alert({
              color: 'orange',
              title: this.translateLoc(error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].loc : null),
              content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
            })
          } else {
            this.alert({
              color: 'orange',
              content: 'messages.failed'
            })
          }
        }).finally(() => {
          this.changeStatusButtonLoading = false
        })
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value')) {
        this.changeStatusToCardSent(this.$route.params.id).catch((error) => {
          if (error.response) {
            this.alert({
              color: 'orange',
              title: this.translateLoc(error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].loc : null),
              content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
            })
          } else {
            this.alert({
              color: 'orange',
              content: 'messages.failed'
            })
          }
        }).finally(() => {
          this.changeStatusButtonLoading = false
        })
      }
    },
    remove () {
      this.removeButtonLoading = true
      this.removeOnlineDeposit(this.$route.params.id).then(() => {
        this.alert({
          color: 'alertGreen',
          content: this.$i18n.t('messages.successful'),
          textColor: '#4E3629'
        })
        setTimeout(() => {
          this.$router.push({ name: 'index' })
        }, 2000)
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            title: this.translateLoc(error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].loc : null),
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      }).finally(() => {
        this.removeButtonLoading = false
      })
    },
    moment (date) {
      return momentJalali(date).format('jYYYY/jM/jD')
    },
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    translateLoc (loc) {
      if (loc) {
        return 'loc.' + loc
      } else {
        return ''
      }
    },
    deliveryType (type) {
      if (type === null) {
        return this.$t('deliveryType.empty')
      } else if (type === 'BRANCH') {
        return this.$t('deliveryType.branch')
      } else if (type === 'ADDRESS' || type === 'NEW_ADDRESS') {
        return this.$t('deliveryType.address')
      }
    }
  }
}
</script>
