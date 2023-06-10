<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <errorReportFilter v-model="searchModel" @search="search" />
      </v-col>

      <!-- grid + chart -->
      <v-col cols="12" style="padding: 8px !important;">
        <!-- chart -->
        <v-row
          justify="center"
        >
          <LineChart
            v-if="showChart"
            v-show="chart.reportAll.show"
            style="width: 80%; margin-top: 30px;margin-bottom: 20px"
            :title="$t('report.errorReport.chart.chartTitleAll')"
            :get-labels-props="chart.reportAll.labels"
            :get-series-props="chart.reportAll.series"
            :change="chart.reportAll.change"
          />
        </v-row>
        <!-- grid -->
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="fullScreen"
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

          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <template #footer>
            <v-btn
              :loading="downloadLoading"
              :disabled="downloadLoading"
              style="top: 50px;width: 146px;height: 36px;background: #84BD00;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
              @click="downloadReports()"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.0013 7.33334V11.3333M6.0013 11.3333L7.33464 10M6.0013 11.3333L4.66797 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6654 6.66668V10C14.6654 13.3333 13.332 14.6667 9.9987 14.6667H5.9987C2.66536 14.6667 1.33203 13.3333 1.33203 10V6.00001C1.33203 2.66668 2.66536 1.33334 5.9987 1.33334H9.33203" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6654 6.66668H11.9987C9.9987 6.66668 9.33203 6.00001 9.33203 4.00001V1.33334L14.6654 6.66668Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.download') }}
              </span>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'
import errorReportFilter from '~/components/error-report/errorReportFilter'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'ErrorReportPage',
  components: {
    errorReportFilter,
    LineChart
  },
  data () {
    return {
      showChart: true,
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
        { text: this.$t('report.errorReport.headers.operationName'), value: 'operation', sortable: false, align: 'center' },
        { text: this.$t('report.errorReport.headers.count'), value: 'count', sortable: false, align: 'center' },
        { text: this.$t('report.errorReport.headers.errorTextPersian'), value: 'errorTextPersian', sortable: false, align: 'center', width: '35%' },
        { text: this.$t('report.errorReport.headers.errorName'), value: 'errorName', sortable: false, align: 'center' },
        { text: this.$t('report.errorReport.headers.errorType'), value: 'errorType', sortable: false, align: 'center' },
        { text: this.$t('report.errorReport.headers.errorCode'), value: 'responseCode', sortable: false, align: 'center' }
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
      this.loading = true
      console.log('search', JSON.stringify(this.searchModel))
      this.showChart = true

      // condition 1
      // condition for show chart in one day
      if (this.searchModel.dateFilter.from === this.searchModel.dateFilter.to) {
        if (this.searchModel.errorReportListFilter.operation && this.searchModel.errorReportListFilter.responseCode) {
          this.showChart = false
          this.alert({
            color: 'green',
            content: 'نمودار با این شرایط انتخابی نمایش داده نمی شود'
          })
        }
      }
      // condition 2
      // condition for show chart in one day
      if (this.searchModel.errorReportListFilter.operation === null && this.searchModel.errorReportListFilter.responseCode === null) {
        this.showChart = false
      }

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

<style scoped>
</style>
