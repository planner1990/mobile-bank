<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <transactionStatisticsReportFilter v-model="searchModel" @search="search" />
      </v-row>
      <v-row class="my-5">
        <v-btn
          color="warning"
          :loading="downloadLoading"
          dark
          small
          @click="downloadReports(searchModel)"
        >
          {{ $t('report.download') }}
        </v-btn>
      </v-row>
      <v-row>
        <v-tabs
          v-model="tabsModel"
          align-with-title
          center-active
          color="success"
        >
          <v-tab href="#search2">
            آمار تراکنش های حساب
          </v-tab>
          <v-tab-item value="search2">
            <deposit-statistics :deposits="depositList" />
          </v-tab-item>

          <v-tab href="#search">
            آمار تراکنش های کارت
          </v-tab>
          <v-tab-item value="search">
            <card-statistics :cards="cardList" />
          </v-tab-item>

          <v-tab href="#search3">
            آمار سایر تراکنش ها
          </v-tab>
          <v-tab-item value="search3">
            <other-statistics :others="otherList" />
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import transactionStatisticsReportFilter from '~/components/transactionStatisticsReportFilter'
import cardStatistics from '~/components/cardStatistics'
import depositStatistics from '~/components/depositStatistics'
import otherStatistics from '~/components/otherStatistics'
import reportManager from '~/repository/report_manager'

export default {
  name: 'OperatorReport',
  components: {
    transactionStatisticsReportFilter,
    cardStatistics,
    depositStatistics,
    otherStatistics
  },
  data () {
    return {
      downloadLoading: false,
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

      items: [],
      cardList: [],
      depositList: [],
      depositList1: [],
      otherList: []
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      reportManager.transactionStatistics(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        this.depositList = this.getDeposit()
        this.cardList = this.getCard()
        this.otherList = this.getOther()
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadTransactionStatistics(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'operator-reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
      }).catch((error) => {
        console.log(error)
        this.alert({
          color: 'error',
          content: 'global.failed'
        })
      }).finally(() => {
        this.downloadLoading = false
      })
    },
    moment (date) {
      return momentJalali(date).format('hh:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
