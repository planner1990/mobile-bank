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
            'items-per-page-options': [25, 50, 100, 200, 400]
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
import errorReportFilter from '~/components/errorReportFilter'
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
          length: 20,
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
      reportManager.errorList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
        this.chartMake(response.data.itemList)
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
        .finally(() => {
          this.loading = false
        })
    },
    chartMake: function (data) {
      this.chart.reportAll.show = false
      this.chart.reportAll.change = Math.random()
      this.chart.reportAll.labels = []
      this.chart.reportAll.series = []
      // --------------------------------------------------------------
      this.chart.reportAll.labels = data.map((item, index) => {
        return (item.operation + '-' + item.responseCode).toString()
      })
      this.chart.reportAll.series = data.map((item, index) => {
        return item.count
      })
      if (this.chart.reportAll.series.length > 0) {
        this.chart.reportAll.show = true
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
