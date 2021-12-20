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
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top>
            <v-toolbar
              class="black--text"
              color="lightGreen"
              flat
              dark
              dense
            >
              <v-btn
                color="warning"
                :loading="downloadLoading"
                dark
                small
                @click="downloadReports(searchModel)"
              >
                {{ $t('report.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('report.operatorReport.status.' + item.status) }}
          </template>
          <template #[`item.operationName`]="{ item }">
            {{ $t('report.operatorReport.operationName.' + item.operationName) }}
          </template>
          <template #[`item.operationDate`]="{ item }">
            {{ moment(item.operationDate) }}
          </template>
        </v-data-table>
      </v-row>
      <br>
      <br>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top>
            <v-toolbar
              class="black--text"
              color="lightGreen"
              flat
              dark
              dense
            >
              <v-btn
                color="warning"
                :loading="downloadLoading"
                dark
                small
                @click="downloadReports(searchModel)"
              >
                {{ $t('report.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('report.operatorReport.status.' + item.status) }}
          </template>
          <template #[`item.operationName`]="{ item }">
            {{ $t('report.operatorReport.operationName.' + item.operationName) }}
          </template>
          <template #[`item.operationDate`]="{ item }">
            {{ moment(item.operationDate) }}
          </template>
        </v-data-table>
      </v-row>
      <br>
      <br>
      <br>
      <br>

      <v-row
        justify="center"
      >
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top>
            <v-toolbar
              class="black--text"
              color="lightGreen"
              flat
              dark
              dense
            >
              <v-btn
                color="warning"
                :loading="downloadLoading"
                dark
                small
                @click="downloadReports(searchModel)"
              >
                {{ $t('report.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('report.operatorReport.status.' + item.status) }}
          </template>
          <template #[`item.operationName`]="{ item }">
            {{ $t('report.operatorReport.operationName.' + item.operationName) }}
          </template>
          <template #[`item.operationDate`]="{ item }">
            {{ moment(item.operationDate) }}
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import transactionStatisticsReportFilter from '~/components/transactionStatisticsReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'OperatorReport',
  components: {
    transactionStatisticsReportFilter
  },
  data () {
    return {
      downloadLoading: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'operationDate',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'operationName', sortable: false },
        { text: this.$t('report.transactionReport.headers.operation'), value: 'operatorUserName', sortable: false },
        { text: this.$t('report.transactionReport.headers.platform'), value: 'customerNationalCode', sortable: false },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'errorMessage', sortable: false },
        { text: this.$t('report.transactionReport.headers.smsTransactionId'), value: 'operationDate', sortable: false },
        { text: this.$t('report.transactionReport.headers.osName'), value: 'status', sortable: false },
        { text: this.$t('report.transactionReport.headers.cif'), value: 'cif', sortable: false },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'phoneNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'trackerId', sortable: false },
        { text: this.$t('report.transactionReport.headers.operation'), value: 'operation', sortable: false },
        { text: this.$t('report.transactionReport.headers.source'), value: 'source', sortable: false },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'sourceNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.transactionReport.headers.traceId'), value: 'traceId', sortable: false },
        { text: this.$t('report.transactionReport.headers.detail'), value: 'detail', sortable: false }
      ],
      items: []
    }
  },
  mounted () {
    this.search(this.searchModel)
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      reportManager.operatorActivity(searchModel, this.$axios).then((response) => {
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
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadOperatorActivity(searchModel, this.$axios).then((res) => {
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
