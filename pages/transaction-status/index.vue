<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <transactionStatusFilter v-model="searchModel" @search="search" />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <LineChart
          v-show="chart.reportAllSuccess.show"
          :title="$t('report.transactionStatus.chart.chartSuccess')"
          :get-labels-props="chart.reportAllSuccess.labels"
          :get-series-props="chart.reportAllSuccess.series"
          :change="chart.reportAllSuccess.change"
        />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <LineChart
          v-show="chart.reportAllFail.show"
          :title="$t('report.transactionStatus.chart.chartFail')"
          :get-labels-props="chart.reportAllFail.labels"
          :get-series-props="chart.reportAllFail.series"
          :change="chart.reportAllFail.change"
        />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'
import transactionStatusFilter from '~/components/transaction-status/transactionStatusFilter'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'TransactionStatusPage',
  components: {
    transactionStatusFilter,
    LineChart
  },
  data () {
    return {
      searchModel: {

      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.errorReport.headers.operationName'), value: 'operation', sortable: false },
        { text: this.$t('report.errorReport.headers.count'), value: 'count', sortable: false },
        { text: this.$t('report.errorReport.headers.errorTextPersian'), value: 'errorTextPersian', sortable: false },
        { text: this.$t('report.errorReport.headers.errorName'), value: 'errorName', sortable: false },
        { text: this.$t('report.errorReport.headers.errorType'), value: 'errorType', sortable: false },
        { text: this.$t('report.errorReport.headers.errorCode'), value: 'responseCode', sortable: false, align: 'center' }

      ],
      items: [],
      chart: {
        reportAllSuccess: {
          show: false,
          change: 0,
          labels: [],
          series: []
        },
        reportAllFail: {
          show: false,
          change: 0,
          labels: [],
          series: []
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      reportManager.transactionStatus(searchModel, this.$axios).then((response) => {
        // this.items = response.data.itemList
        // this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
        this.chartMakeSuccess(response.data)

        this.chartMakeFail(response.data)
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.dateList.length !== 0 ? error.response.data.dateList.type : error.response.data.error_message
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    chartMakeSuccess: function (data) {
      this.chart.reportAllSuccess.show = false
      this.chart.reportAllSuccess.change = Math.random()
      this.chart.reportAllSuccess.labels = []
      this.chart.reportAllSuccess.series = []
      // --------------------------------------------------------------
      this.chart.reportAllSuccess.labels = data.dateList
      this.chart.reportAllSuccess.series = data.successfulChartDataList

      if (this.chart.reportAllSuccess.series.length > 0) {
        this.chart.reportAllSuccess.show = true
      }
    },

    chartMakeFail: function (data) {
      this.chart.reportAllFail.show = false
      this.chart.reportAllFail.change = Math.random()
      this.chart.reportAllFail.labels = []
      this.chart.reportAllFail.series = []
      // --------------------------------------------------------------
      this.chart.reportAllFail.labels = data.dateList
      this.chart.reportAllFail.series = data.failedChartDataList
      if (this.chart.reportAllFail.series.length > 0) {
        this.chart.reportAllFail.show = true
      }
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
