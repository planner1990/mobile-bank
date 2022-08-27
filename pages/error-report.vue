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
          style="width: 30%"
          title="نمودار نسبت هر خطا به تعداد کل خطاها"
          :get-labels-props="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']"
          :get-series-props="[20, 41, 35, 51, 49, 85, 69, 91, 85]"
        />

        <LineChart
          style="width: 30%"
          title="نمودار نسبت هر خطا به تعداد کل به ازای هر عملیات"
          :get-labels-props="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']"
          :get-series-props="[10, 90, 35, 51, 250, 62, 250, 91, 148]"
        />

        <LineChart
          style="width: 30%"
          title="نمودار نسبت هر خطا به تعداد کل به ازای هر کد خطا"
          :get-labels-props="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']"
          :get-series-props="[10, 41, 125, 51, 49, 62, 69, 131, 148]"
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
            'items-per-page-options': [50, 100, 300, 500, 1000]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
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
      downloadLoading: false,
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
      items: []
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      reportManager.errorList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
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
        .finally(() => {
          this.loading = false
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
