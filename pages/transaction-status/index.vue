<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <transactionStatusFilter v-model="searchModel" @search="search" />
        <!-- loading -->
        <v-progress-linear
          v-show="loading"
          indeterminate
          color="#84BD00"
        />
      </v-col>

      <!-- charts -->
      <v-col cols="12" style="margin-top:30px; padding: 8px !important;">
        <!-- charts 1 -->
        <v-row
          justify="center"
        >
          <LineChart
            v-show="chart.reportAllSuccess.show"
            style="width: 80%"
            :title="$t('report.transactionStatus.chart.chartSuccess')"
            :get-labels-props="chart.reportAllSuccess.labels"
            :get-series-props="chart.reportAllSuccess.series"
            :change="chart.reportAllSuccess.change"
          />
        </v-row>
        <!-- charts 2 -->
        <v-row
          justify="center"
        >
          <LineChart
            v-show="chart.reportAllFail.show"
            style="width: 80%;margin-top: 20px;"
            :title="$t('report.transactionStatus.chart.chartFail')"
            :get-labels-props="chart.reportAllFail.labels"
            :get-series-props="chart.reportAllFail.series"
            :change="chart.reportAllFail.change"
          />
        </v-row>
      </v-col>
    </v-row>
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
  head () {
    return {
      title: 'نمودار تراکنش ها' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  mounted () {
    // this.search(this.searchModel, 'mounted')
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

<style scoped>
</style>
