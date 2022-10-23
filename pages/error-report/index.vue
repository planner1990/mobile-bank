<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <errorReportFilter v-model="searchModel" @search="search" />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <LineChart
          v-show="chart.reportAll.show"
          :title="$t('report.errorReport.chart.chartTitleAll')"
          :get-labels-props="chart.reportAll.labels"
          :get-series-props="chart.reportAll.series"
          :change="chart.reportAll.change"
        />

        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [50, 75, 150, 300, 600, 1000]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel, 'paginate')"
          @update:items-per-page="search(searchModel, 'paginate')"
        >
          <template #top />
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'
import errorReportFilter from '~/components/error-report/errorReportFilter'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'ErrorReport',
  components: {
    errorReportFilter,
    LineChart
  },
  data () {
    return {
      searchModel: {
        paginate: {
          page: 1,
          length: 75,
          sort: {
            property: 'url',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.errorReport.headers.operationName'), value: 'operation', sortable: false },
        { text: this.$t('report.errorReport.headers.count'), value: 'count', sortable: false },
        { text: this.$t('report.errorReport.headers.errorTextPersian'), value: 'errorTextPersian', sortable: false },
        { text: this.$t('report.errorReport.headers.errorName'), value: 'errorName', sortable: false },
        { text: this.$t('report.errorReport.headers.errorType'), value: 'errorType', sortable: false },
        { text: this.$t('report.errorReport.headers.errorCode'), value: 'responseCode', sortable: false }
      ],
      items: [],
      chart: {
        reportAll: {
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
    search (searchModel, callGateway = 'searchButtonFilter') {
      if (callGateway === 'searchButtonFilter') {
        this.searchModel.paginate.page = 1
      }

      this.loading = true
      const self = this

      self.getChartErrorCount(searchModel)

      reportManager.errorList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
      }).catch((error) => {
        console.warn(error)
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
        .finally(() => {
          this.loading = false
        })
    },
    getChartErrorCount (searchModel) {
      this.loading = true
      const self = this
      const searchModelChart = {
        transactionChartDto: {
          operation: searchModel.errorReportListFilter.operation,
          responseCode: searchModel.errorReportListFilter.responseCode,
          errorType: searchModel.errorReportListFilter.errorType
        },
        dateFilter: {
          from: searchModel.dateFilter.from,
          to: searchModel.dateFilter.to
        }
      }
      reportManager.chartErrorCount(searchModelChart, this.$axios).then((response) => {
        this.loading = false
        this.chartMake(response.data, self)
      }).catch((error) => {
        console.warn(error)
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
        .finally(() => {
          this.loading = false
        })
    },
    chartMake (data, self) {
      self.chart.reportAll.show = false
      self.chart.reportAll.change = Math.random()
      self.chart.reportAll.labels = []
      self.chart.reportAll.series = []

      /* labels chart */
      self.chart.reportAll.labels = data.dateList.map((item) => {
        return (item).toString()
      })

      /* series chart */
      self.chart.reportAll.series = data.failedChartDataList.map((item) => {
        return Math.round(item)
      })

      /* show chart */
      if (self.chart.reportAll.series.length > 0) {
        self.chart.reportAll.show = true
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
