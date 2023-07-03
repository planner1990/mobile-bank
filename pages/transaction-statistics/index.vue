<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <transactionStatisticsReportFilter ref="downloadExcelPdf" v-model="searchModel" @search="search" />
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
            {{ $t('report.transactionReport.headers.depositTransaction') }}
          </v-tab>
          <v-tab-item value="deposit" style="border-radius: 12px;">
            <deposit-statistics :deposits="depositList" :loading="enableLoading( loadingStatus)" @downloadExcelEmit="downloadExcel" />
          </v-tab-item>

          <v-tab href="#card" class="font-weight-bold">
            {{ $t('report.transactionReport.headers.cardTransaction') }}
          </v-tab>
          <v-tab-item value="card" style="border-radius: 12px;">
            <card-statistics :cards="cardList" :loading="enableLoading( loadingStatus)" />
          </v-tab-item>

          <v-tab href="#others" class="font-weight-bold">
            {{ $t('report.transactionReport.headers.otherTransaction') }}
          </v-tab>
          <v-tab-item value="others" style="border-radius: 12px;">
            <other-statistics :others="otherList" :loading="enableLoading( loadingStatus)" />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import transactionStatisticsReportFilter from '~/components/transaction-statistics/transactionStatisticsReportFilter'
import cardStatistics from '~/components/transaction-statistics/cardStatistics'
import depositStatistics from '~/components/transaction-statistics/depositStatistics'
import otherStatistics from '~/components/transaction-statistics/otherStatistics'
import reportManager from '~/repository/report_manager'

export default {
  name: 'TransactionStatisticsPage',
  components: {
    transactionStatisticsReportFilter,
    cardStatistics,
    depositStatistics,
    otherStatistics
  },
  data () {
    return {
      downloadLoading: false,
      tabsModel: false,
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
      items: [],
      cardList: [],
      depositList: [],
      depositList1: [],
      otherList: []
    }
  },
  mounted () {
    this.search(this.searchModel, 'mounted')
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
      reportManager.transactionStatistics(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        this.depositList = this.getDeposit()
        this.cardList = this.getCard()
        this.otherList = this.getOther()
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
      if (this.items.length > 0) {
        return this.items.filter(object => object.operationType === 'DEPOSIT')
      }
      return null
    },
    getCard: function () {
      if (this.items.length > 0) {
        return this.items.filter(object => object.operationType === 'CARD')
      }
      return null
    },
    getOther: function () {
      if (this.items.length > 0) {
        return this.items.filter(object => object.operationType === 'PUBLIC')
      }
      return null
    },
    moment (date) {
      return momentJalali(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadExcel () {
      this.$refs.downloadExcelPdf.downloadReports()
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
