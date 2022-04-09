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
          :items-per-page.sync="searchModel.paginate.length"
          :server-items-length="totalNumberOfItems"
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
          <template #[`item.detail`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template #[`item.transactionTime`]="{ item }">
            {{ convertToJalali(item.transactionTime) }}
          </template>

          <template #[`item.createdTime`]="{ item }">
            {{ convertToJalali(item.createdTime) }}
          </template>

          <!--   <template #[`item.source`]="{ item }">
            {{ $t('report.transactionReport.status.' + item.source) }}
          </template>-->

          <!--   <template #[`item.platform`]="{ item }">
            &lt;!&ndash;            {{ item }}&ndash;&gt;
            {{ test(item.platform) }}
            &lt;!&ndash;            {{ $t('report.transactionReport.platform.' + item.platform) }}&ndash;&gt;
          </template>-->
          <!-- <template #[`item.operationDate`]="{ item }">
            {{ moment(item.operationDate) }}
          </template>-->
          </v-dialog>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
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
        { text: this.$t('report.refundReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.refundReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.refundReport.headers.url'), value: 'url', sortable: false },
        { text: this.$t('report.refundReport.headers.createdTime'), value: 'createdTime', sortable: false },
        { text: this.$t('report.refundReport.headers.state'), value: 'state', sortable: false },
        { text: this.$t('report.refundReport.headers.switchResponseRrn'), value: 'switchResponseRrn', sortable: false },
        { text: this.$t('report.refundReport.headers.requestId'), value: 'requestId', sortable: false }

      ],

      items: []
    }
  },
  // mounted () {
  //   this.search(this.searchModel)
  // },
  priceFormat (amount) {
    if (amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      return ''
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      searchModel.paginate.sort.property = searchModel.refundListFilter.orderField
      searchModel.paginate.sort.direction = searchModel.refundListFilter.orderType
      reportManager.refundList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        console.log(this.items)
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
      reportManager.downloadRefundList(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
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
