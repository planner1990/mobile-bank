<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <incomeReportFilter v-model="searchModel" @search="search" />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-card
          :loading="loading"
        />
        <v-tabs
          v-model="tabsModel"
          style="border-radius: 12px;"
          align-with-title
          center-active
          color="success"
        >
          <v-tab href="#deposit" class="font-weight-bold">
            {{ $t('income.transferIncomeTitle') }}
          </v-tab>
          <v-tab-item value="deposit" style="border-radius: 12px;">
            <transfer-income :transfer-list="transferList" :loading="enableLoading( loadingStatus)" />
          </v-tab-item>

          <v-tab href="#card" class="font-weight-bold">
            {{ $t('income.chargerIncomeTitle') }}
          </v-tab>
          <v-tab-item value="card" style="border-radius: 12px;">
            <charge-income :charge-list="chargeList" :loading="enableLoading( loadingStatus)" />
          </v-tab-item>

          <v-tab href="#others" class="font-weight-bold">
            {{ $t('income.chargeRefundIncomeTitle') }}
          </v-tab>
          <v-tab-item value="others" style="border-radius: 12px;">
            <refund-income :refund-list="refundList" :loading="enableLoading( loadingStatus)" />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import incomeReportFilter from '~/components/incomeReport/incomeReportFilter'
import transferIncome from '~/components/incomeReport/transferIncome'
import chargeIncome from '~/components/incomeReport/chargeIncome'
import refundIncome from '~/components/incomeReport/refundIncome'
import reportManager from '~/repository/report_manager'

export default {
  name: 'IncomeReportPage',
  components: {
    incomeReportFilter,
    transferIncome,
    chargeIncome,
    refundIncome
  },
  data () {
    return {
      searchModel: {
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'operationDate',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      loadingStatus: false,
      tabsModel: false,
      downloadLoading: false,

      items: [],
      transferList: [],
      chargeList: [],
      refundList: [],
      otherList: []
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    enableLoading (loading) {
      return loading
    },
    search (searchModel) {
      this.enableLoading(true)
      this.loadingStatus = true
      reportManager.incomeList(searchModel, this.$axios).then((response) => {
        // this.items = response.data.itemList
        console.log(response.data)
        this.transferList = response.data.transferIncomeDtoList
        console.log(this.transferList)
        this.chargeList = response.data.incomeChargeDtoList
        console.log(this.chargeList)
        this.refundList = response.data.chargeRefundDtoList
        console.log(this.refundList)
        this.totalNumberOfItems = response.data.filteredItem
        this.enableLoading(false)
        this.loadingStatus = false
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
    },
    getDeposit: function () {
      console.log('inja omad')
      if (this.items.length > 0) {
        console.log('inja  1')
        console.log(this.items.filter(object => object.operationType === 'DEPOSIT'))
        return this.items.filter(object => object.operationType === 'DEPOSIT')
      }
      return null
    },
    getCard: function () {
      console.log('inja omad')
      if (this.items.length > 0) {
        return this.items.filter(object => object.operationType === 'CARD')
      }
      return null
    },
    getOther: function () {
      console.log('inja omad')
      if (this.items.length > 0) {
        console.log('majid inja omad')
        console.log(this.items.filter(object => object.operationType === 'PUBLIC'))
        return this.items.filter(object => object.operationType === 'PUBLIC')
      }
      return null
    },

    moment (date) {
      return momentJalali(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>

<style scoped>
/deep/ .v-tabs-bar {
  border-radius: inherit !important;
  height: 58px !important;
  margin-bottom: 15px !important;
}

/deep/ .theme--light.v-tabs-items {
  background-color: #FFFFFF;
  border-radius: 12px;
}
</style>
