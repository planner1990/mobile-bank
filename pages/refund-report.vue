<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <refundReportFilter v-model="searchModel" @search="search" />
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
            'items-per-page-options': [50, 100, 300, 500, 1000],
            'items-per-page-text': ' جمع مبالغ بازگشتی : '+ priceFormat(sumAmount)
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :server-items-length="totalNumberOfItems"
          :page.sync="searchModel.paginate.page"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top />

          <template #[`item.transactionTime`]="{ item }">
            {{ convertToJalali(item.transactionTime) }}
          </template>
          <template #[`item.createdTime`]="{ item }">
            {{ convertToJalali(item.createdTime) }}
          </template>
          <template #[`item.refundOrFailTime`]="{ item }">
            {{ convertToJalali(item.refundOrFailTime) }}
          </template>
          <template #[`item.state`]="{ item }">
            {{ $t('report.refundReport.refundTypeNum.' + item.state) }}
          </template>
          <template #[`item.url`]="{ item }">
            {{ $t('report.refundReport.refundUrlType.' + item.url) }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>

          <!-- <template #footer>
            جمع مبالغ : {{ sumAmount }}
          </template>-->
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import refundReportFilter from '~/components/refundReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'RefundReport',
  components: {
    refundReportFilter
  },
  data () {
    return {
      downloadLoading: false,
      userForm: {
        showPassword: false,
        userObj: {}
      },
      createDialog: false,
      deleteUserDialog: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'id',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.refundReport.headers.id'), value: 'id', sortable: false },
        { text: this.$t('report.refundReport.headers.transactionId'), value: 'transactionId', sortable: false },
        { text: this.$t('report.refundReport.headers.transactionTime'), value: 'transactionTime', sortable: false },
        { text: this.$t('report.refundReport.headers.phoneNumber'), value: 'phoneNumber', sortable: false },
        { text: this.$t('report.refundReport.headers.source'), value: 'source', sortable: false },
        { text: this.$t('report.refundReport.headers.transactionErrorCode'), value: 'transactionErrorCode', sortable: false },
        { text: this.$t('report.refundReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.refundReport.headers.createdTime'), value: 'createdTime', sortable: false },
        { text: this.$t('report.refundReport.headers.url'), value: 'url', sortable: false },
        { text: this.$t('report.refundReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.refundReport.headers.state'), value: 'state', sortable: false },
        { text: this.$t('report.refundReport.headers.switchResponseRrn'), value: 'switchResponseRrn', sortable: false },
        { text: this.$t('report.refundReport.headers.requestId'), value: 'requestId', sortable: false },
        { text: this.$t('report.refundReport.headers.refundOrFailTime'), value: 'refundOrFailTime', sortable: false }

      ],

      items: [],
      sumAmount: 0
    }
  },
  // mounted () {
  //   this.search(this.searchModel)
  // },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    search (searchModel) {
      this.loading = true
      searchModel.paginate.sort.property = searchModel.refundListFilter.orderField
      searchModel.paginate.sort.direction = searchModel.refundListFilter.orderType
      reportManager.refundList(searchModel, this.$axios).then((response) => {
        console.log(response.data)
        this.items = response.data.pageRefundList.itemList
        console.log(this.items)
        this.sumAmount = response.data.sumAmount
        console.log(this.items)
        this.totalNumberOfItems = response.data.pageRefundList.filteredItem
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
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadRefundList(searchModel, this.$axios).then((res) => {
        console.log('error1')
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        console.log('error2')
        const fileLink = document.createElement('a')
        console.log('error3')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'refund-reports.xlsx')
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
    test (platform) {
      console.log(platform)
    },
    moment (date) {
      return momentJalali(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
