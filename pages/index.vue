<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <transactionReportFilter v-model="searchModel" @search="search" />
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
            'items-per-page-options': [50, 100, 300, 500, 1000]
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

            <v-dialog
              v-model="createDialog"
              max-width="1000"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen black--text font-weight-bold headline">
                  {{ $t('user.createDialog') }}
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-row>
                      <v-data-table
                        dense
                        item-key="cardOwnerId"
                        sort-by="cardOwnerId"
                        :items="itemsTransaction"
                        :headers="headersTransaction"
                        class="elevation-5 fullScreen"
                        :hide-default-footer="true"
                      />
                    </v-row>

                    <v-row>
                      <v-data-table
                        dense
                        item-key="cardOwnerId"
                        sort-by="cardOwnerId"
                        dir="ltr"
                        :items="itemsTransaction"
                        :hide-default-footer="true"
                        class="elevation-5 fullScreen"
                      >
                        <template #item="{ item }">
                          <tr class="black--text lightGreen">
                            <th style="text-align: center; width: 50%">
                              پاسخ
                            </th>
                            <th style="text-align: center; width: 50%">
                              درخواست
                            </th>
                          </tr>
                          <tr>
                            <td>
                              <div align="justify" style="width:490px;overflow:auto">
                                <pre>   {{ item.responseJson }}
                              </pre>
                              </div>
                            </td>
                            <td>
                              <div align="justify" style="width:490px;overflow:auto">
                                <pre>   {{ item.requestJson }}
                              </pre>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-row>
                  </v-form>
                </v-container>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="orange"
                    @click="closeTransactionDetailsDialog"
                  >
                    {{ $t('buttons.cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template #[`item.requestTime`]="{ item }">
            {{ convertToJalali(item.requestTime) }}
          </template>
          <template #[`item.platform`]="{ item }">
            {{ $t('report.transactionReport.platform.' + item.platform) }}
          </template>
          <template #[`item.sourceType`]="{ item }">
            {{ $t('report.transactionReport.source.' + item.sourceType) }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>
          <template #[`item.detail`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import transactionReportFilter from '~/components/transactionReportFilter'
import reportManager from '~/repository/report_manager'
const defaultFilterdetails = {
  transactionListFilter: {
    transactionId: null
  }
}
export default {
  name: 'TransactionReport',
  components: {
    transactionReportFilter
  },
  data () {
    return {
      downloadLoading: false,
      createDialog: false,
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
      filterDetails: defaultFilterdetails,
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'sourceNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.operation'), value: 'operation', sortable: false },
        { text: this.$t('report.transactionReport.headers.cif'), value: 'cif', sortable: false },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'mobileNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.transactionReport.headers.requestTime'), value: 'requestTime', sortable: false },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'responseCode', sortable: false },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'requestId', sortable: false },
        { text: this.$t('report.transactionReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.transactionReport.headers.traceId'), value: 'traceId', sortable: false },
        { text: this.$t('report.transactionReport.headers.detail'), value: 'detail', sortable: false }
      ],
      headersTransaction: [
        { text: this.$t('report.transactionReport.headers.responseTime'), value: 'responseLongTime', sortable: false },
        { text: this.$t('report.transactionReport.headers.appVersion'), value: 'appVersion', sortable: false },
        { text: this.$t('report.transactionReport.headers.osVersion'), value: 'osVersion', sortable: false },
        { text: this.$t('report.transactionReport.headers.osName'), value: 'osName', sortable: false },
        { text: this.$t('report.transactionReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'requestId', sortable: false }
      ],
      headersTransactionRequest: [
        { text: this.$t('report.transactionReport.headers.requestJson'), value: 'requestJson', sortable: false },
        { text: this.$t('report.transactionReport.headers.responseJson'), value: 'responseJson', sortable: false }
      ],
      headersTransactionLog: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false }
      ],
      items: [],
      itemsTransaction: [],
      itemsTransactionData: []
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
    checkUrl (operation, url) {
      if (operation != null) {
        return operation + '\n' + operation
      } else {
        return url + '\n' + url
      }
    },
    editItem (item) {
      this.createDialog = true
      this.itemsTransactionData.splice(0, 1)
      this.itemsTransactionData.push({
        sourceType: item.sourceType,
        sourceNumber: item.sourceNumber,
        platform: item.platform,
        responseCode: item.responseCode,
        appVersion: item.appVersion,
        osVersion: item.osVersion,
        osName: item.osName,
        responseTimeLong: item.responseTimeLong,
        requestId: item.requestId,
        ip: item.ip

      })

      defaultFilterdetails.transactionListFilter.transactionId = item.id
      reportManager.transactionDetails(defaultFilterdetails.transactionListFilter, this.$axios).then((response) => {
        console.log('searchModel')
        console.log(response.data)
        this.itemsTransaction.splice(0, 1)
        // this.itemsTransaction.push(response.data)
        try {
          this.itemsTransaction.push({

            appVersion: response.data.appVersion,
            osVersion: response.data.osVersion,
            osName: response.data.osName,
            responseLongTime: response.data.responseLongTime,
            requestId: response.data.requestId,
            ip: response.data.ipAddress,
            responseJson: JSON.parse(response.data.responseJson),
            requestJson: JSON.parse(response.data.requestJson)
          })
        } catch (e) {
          this.itemsTransaction.push({

            appVersion: response.data.appVersion,
            osVersion: response.data.osVersion,
            osName: response.data.osName,
            responseLongTime: response.data.responseLongTime,
            requestId: response.data.requestId,
            ip: response.data.ipAddress,
            responseJson: response.data.responseJson,
            requestJson: response.data.requestJson
          })
        }
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
    closeTransactionDetailsDialog () {
      this.itemsTransaction = []
      this.createDialog = false
    },
    search (searchModel) {
      console.log('searchModel')
      console.log(searchModel)
      this.loading = true
      reportManager.transactionList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        console.log(this.items)
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
      }).catch((error) => {
        this.loading = false
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
      })
    },
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadTransactionList(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'transaction-reports.xlsx')
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
