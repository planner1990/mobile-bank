<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.openDepositProcess') }}
    </v-card-title>
    <v-card-text
      class="py-5 px-5"
      align="center"
    >
      <v-col
        v-if="checkUserAccess()"
        class="pt-0"
      >
        <v-btn
          v-if="processButtonShow"
          class="primary--text font-weight-bold"
          :loading="processButtonLoading"
          elevation="5"
          depressed
          width="350"
          height="50"
          style="font-size: 1rem"
          color="lightBlue"
          @click="startProcess"
        >
          {{ $t('onlineDepositStatus.' + onlineDeposit.status + '.buttonText') }}
        </v-btn>
        <v-btn
          v-if="rejectButtonShow"
          :loading="rejectButtonLoading"
          elevation="5"
          depressed
          width="250"
          color="error"
          @click="rejectDocProcess"
        >
          {{ $t('buttons.rejectDocument') }}
        </v-btn>
      </v-col>
      <v-stepper
        v-if="stepperShow"
        v-model="step"
        non-linear
      >
        <v-stepper-header>
          <v-stepper-step
            :v-if="step !== -1"
            :complete="step > 1"
            step="1"
            :color="steps.confirmDoc.color"
          >
            {{ $t('onlineDepositStatus.IN_PROCESS.stepName') }}
          </v-stepper-step>

          <v-col class="d-flex align-center justify-center">
            <v-progress-linear
              v-if="steps.confirmDoc.loading"
              color="success"
              indeterminate
            />
            <v-divider
              v-if="!steps.confirmDoc.loading"
            />
          </v-col>

          <v-stepper-step
            :complete="step > 2"
            step="2"
            :color="steps.createCustomer.color"
          >
            <div
              :style="steps.createCustomer.style"
            >
              {{ steps.createCustomer.text }}
            </div>
          </v-stepper-step>

          <v-col class="d-flex align-center justify-center">
            <v-progress-linear
              v-if="steps.createCustomer.loading"
              color="success"
              indeterminate
            />
            <v-divider
              v-if="!steps.createCustomer.loading"
            />
          </v-col>

          <v-stepper-step
            :complete="step > 3"
            step="3"
            :color="steps.openDeposit.color"
          >
            {{ $t('onlineDepositStatus.CUSTOMER_CREATED.stepName') }}
          </v-stepper-step>

          <v-col class="d-flex align-center justify-center">
            <v-progress-linear
              v-if="steps.openDeposit.loading"
              color="success"
              indeterminate
            />
            <v-divider
              v-if="!steps.openDeposit.loading"
            />
          </v-col>

          <v-stepper-step
            :complete="step > 4"
            step="4"
            :color="steps.shareMoney.color"
          >
            {{ $t('onlineDepositStatus.DEPOSIT_OPENED.stepName') }}
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userManager from '~/repository/user_manager'

export default {
  name: 'OpenedDepositProcess',
  data () {
    return {
      userManager: userManager,
      // loggedInUser: JSON.parse(sessionStorage.getItem('userInfo')),
      steps: {
        confirmDoc: {
          loading: false,
          color: 'success'
        },
        createCustomer: {
          loading: false,
          color: 'success',
          text: this.$t('onlineDepositStatus.DOC_CONFIRMED.stepName'),
          style: ''
        },
        openDeposit: {
          loading: false,
          color: 'success'
        },
        shareMoney: {
          color: 'success'
        }
      },
      processButtonLoading: false,
      rejectButtonLoading: false
    }
  },
  computed: {
    ...mapGetters({
      step: 'onlineDepositStore/openDepositProcessStep',
      onlineDeposit: 'onlineDepositStore/currentState',
      documentsStatus: 'onlineDepositStore/documentsStatus',
      isDocumentConfirm: 'onlineDepositStore/isDocumentConfirm',
      loggedInUser: 'user/me'
    }),
    processButtonShow () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        return this.isDocumentConfirm
      } else {
        return this.step && this.step < 5 && this.step !== -1
      }
    },
    rejectButtonShow () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        return !this.isDocumentConfirm
      } else {
        return false
      }
    },
    stepperShow () {
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        return this.isDocumentConfirm
      } else {
        return this.step && this.step <= 5 && this.step !== -1
      }
    }

  },
  methods: {
    ...mapActions({
      initOnlineDeposit: 'onlineDepositStore/initOnlineDeposit',
      confirmDoc: 'onlineDepositStore/confirmDoc',
      createCustomer: 'onlineDepositStore/createCustomer',
      openDeposit: 'onlineDepositStore/openDeposit',
      shareMoney: 'onlineDepositStore/shareMoney',
      rejectDoc: 'onlineDepositStore/rejectDoc'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    checkUserAccess () {
      const permission = this.loggedInUser.permissions.find(
        e => e.name === this.userManager.userPermissions[0].value
      )
      return this.loggedInUser.role.role === this.userManager.userRoles[0].value &&
        permission !== undefined
    },
    startProcess () {
      this.processButtonLoading = true
      if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.IN_PROCESS.value')) {
        this.docConfirmProcess()
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DOC_CONFIRMED.value')) {
        this.createCustomerProcess()
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.CUSTOMER_CREATED.value')) {
        this.openDepositProcess()
      } else if (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DEPOSIT_OPENED.value')) {
        this.shareMoneyProcess()
      }
    },
    checkCustomerExistBefore (response) {
      if (response.status === 200) { // Customer exist before
        this.steps.createCustomer.text = this.$t('messages.customerExistBefore')
        this.steps.createCustomer.style = 'background: orange; padding: 5px; border-radius: 10px'
      } else if (response.status === 201) { // Customer created
        this.steps.createCustomer.text = this.$t('onlineDepositStatus.DOC_CONFIRMED.stepName')
        this.steps.createCustomer.style = ''
      }
    },
    docConfirmProcess () {
      this.steps.confirmDoc.loading = true
      this.confirmDoc(this.$route.params.id).then(() => {
        setTimeout(() => {
          this.createCustomerProcess()
          this.steps.confirmDoc.color = 'success'
        }, 2000)
      }).catch((error) => {
        this.steps.confirmDoc.color = 'red'
        this.processButtonLoading = false
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
        this.initOnlineDeposit(this.$route.params.id)
      }).finally(() => {
        this.steps.confirmDoc.loading = false
      })
    },
    createCustomerProcess () {
      this.steps.createCustomer.loading = true
      this.createCustomer(this.$route.params.id).then((response) => {
        setTimeout(() => {
          this.steps.createCustomer.loading = false
          this.checkCustomerExistBefore(response)
          this.openDepositProcess()
          this.steps.createCustomer.color = 'success'
        }, 2000)
      }).catch((error) => {
        setTimeout(() => {
          this.steps.createCustomer.color = 'red'
          this.steps.createCustomer.loading = false
          this.processButtonLoading = false
          this.steps.createCustomer.loading = false
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
        }, 2000)
      })
    },
    openDepositProcess () {
      this.steps.openDeposit.loading = true
      this.openDeposit(this.$route.params.id).then(() => {
        setTimeout(() => {
          this.steps.openDeposit.loading = false
          this.shareMoneyProcess()
          this.steps.openDeposit.color = 'success'
        }, 2000)
      }).catch((error) => {
        setTimeout(() => {
          this.steps.openDeposit.color = 'red'
          this.steps.openDeposit.loading = false
          this.processButtonLoading = false
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
        }, 2000)
      })
    },
    shareMoneyProcess () {
      this.shareMoney(this.$route.params.id).catch((error) => {
        this.steps.shareMoney.color = 'red'
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
        this.processButtonLoading = false
      })
    },
    rejectDocProcess () {
      this.rejectButtonLoading = true
      const rejectRequest = {
        nationalCardDefect: null,
        videoDefect: null,
        signatureDefect: null
      }
      if (this.documentsStatus.nationalCard === null || this.documentsStatus.video === null || this.documentsStatus.signature === null) {
        this.alert({
          color: 'orange',
          content: this.$i18n.t('messages.selectAllDocumentsStatus')
        })
        this.rejectButtonLoading = false
        return
      }
      if (this.documentsStatus.nationalCard !== 'confirm') {
        rejectRequest.nationalCardDefect = this.$i18n.t('dropDownItems.nationalCardImage.' + this.documentsStatus.nationalCard)
      }
      if (this.documentsStatus.video !== 'confirm') {
        rejectRequest.videoDefect = this.$i18n.t('dropDownItems.video.' + this.documentsStatus.video)
      }
      if (this.documentsStatus.signature !== 'confirm') {
        rejectRequest.signatureDefect = this.$i18n.t('dropDownItems.signatureImage.' + this.documentsStatus.signature)
      }
      const wrapObject = {
        onlineDepositId: this.$route.params.id,
        rejectReasons: rejectRequest
      }
      this.rejectDoc(wrapObject).then(() => {
        this.rejectButtonLoading = false
        this.alert({
          color: 'alertGreen',
          content: this.$i18n.t('messages.successful'),
          textColor: '#4E3629'
        })
      }).catch((error) => {
        this.rejectButtonLoading = false
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
      })
    },
    translateLoc (loc) {
      if (loc) {
        return 'loc.' + loc
      } else {
        return null
      }
    }
  }
}
</script>
