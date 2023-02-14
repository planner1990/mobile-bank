<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <transactionReportFilter v-model="searchModel" @search="search" @edit="editItem2()" />
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
            <v-dialog
              v-model="createDialog"
              max-width="1000"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen light-green--text font-weight-bold headline">
                  {{ $t('user.createDialog') }}
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <br>
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
                    <br>
                    <br>
                    <br>
                    <br>
                    <v-row>
                      <v-col cols="6">
                        <v-card
                          color="#f6f6f6"
                          height="100%"
                        >
                          <v-toolbar
                            class="black--text"
                            color="grey lighten-4"
                            flat
                            dark
                            dense
                            elevation="1"
                          >
                            {{ $t('report.transactionReport.headers.request') }}
                            <v-spacer />
                          </v-toolbar>
                          <v-card-text dir="ltr" class="text-center">
                            <div align="justify" style="width:450px;overflow:auto">
                              <vue-json-pretty :data="requestJson" />
                            <!-- <pre>   //{{ item.responseJson }}

                            </pre>-->
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-flex text-xs-center fill-height>
                          <v-card
                            color="#f6f6f6"
                            height="100%"

                            class="justify-center"
                          >
                            <v-toolbar
                              class="black--text"
                              color="grey lighten-4"
                              flat
                              dark
                              dense
                              elevation="1"
                            >
                              {{ $t('report.transactionReport.headers.response') }}
                              <v-spacer />
                            </v-toolbar>
                            <v-card-text dir="ltr">
                              <div align="justify" style="width:450px;overflow:auto">
                                <vue-json-pretty :data="responseJson" />
                                <!-- <pre>   //{{ item.responseJson }}

                            </pre>-->
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-col>
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

            <v-dialog
              v-model="operationDialog"
              width="1200"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen light-green--text font-weight-bold headline">
                  <v-row no-gutters>
                    <v-col cols="10">
                      {{ $t('report.transactionReport.operationSelect') }}
                    </v-col>
                    <v-col>
                      <v-btn
                        color="success"
                        class="mr-10"
                        @click="okOperationDialog"
                      >
                        {{ $t('buttons.submit') }}
                      </v-btn>
                    </v-col>
                    <v-col />
                    <v-col>
                      <v-btn
                        color="warning"
                        dark
                        @click="closeTransactionDetailsDialog"
                      >
                        {{ $t('buttons.cancel') }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-card height="600px" color="">
                      <v-row>
                        <v-tabs
                          v-model="tabsModel"
                          align-with-title
                          color="success"
                        >
                          <v-tab href="#depositOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.depositOperation') }}
                          </v-tab>
                          <v-tab-item value="depositOperation">
                            <br>
                            <deposit-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#cardOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.cardOperation') }}
                          </v-tab>
                          <v-tab-item value="cardOperation">
                            <br>
                            <card-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#userOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.userOperation') }}
                          </v-tab>
                          <v-tab-item value="userOperation">
                            <br>
                            <user-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#publicOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.publicOperation') }}
                          </v-tab>
                          <v-tab-item value="publicOperation">
                            <br>
                            <public-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#cardReissueOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.cardReissueOperation') }}
                          </v-tab>
                          <v-tab-item value="cardReissueOperation">
                            <br>
                            <card-reissue-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#loanRequestOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.loanRequestOperation') }}
                          </v-tab>
                          <v-tab-item value="loanRequestOperation">
                            <br>
                            <loan-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#onlineDepositOperation" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.onlineDepositOperation') }}
                          </v-tab>
                          <v-tab-item value="onlineDepositOperation">
                            <br>
                            <online-deposit-operations :list-type="listType" />
                          </v-tab-item>

                          <v-tab href="#pichackOperations" class="font-weight-black">
                            {{ $t('report.transactionReport.headers.pichackOperation') }}
                          </v-tab>
                          <v-tab-item value="pichackOperations">
                            <br>
                            <pichack-operations :list-type="listType" />
                          </v-tab-item>
                        </v-tabs>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-container>
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

          <template #item.responseCode="{ item }">
            <template v-if="item.responseCode !== null">
              <v-chip
                :color="getColor(item.responseCode)"
                class="v-chip.v-size--default justify-center"
                label
              >
                {{ item.responseCode }}
              </v-chip>
            </template>
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
import 'vue-json-pretty/lib/styles.css'
import moment from 'moment-jalaali'
import { mapGetters, mapMutations } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import transactionReportFilter from '~/components/transactionReport/transactionReportFilter'
import reportManager from '~/repository/report_manager'
import depositOperations from '~/components/transactionQuery/depositOperations'
import cardOperations from '~/components/transactionQuery/cardOperations'
import loanOperations from '~/components/transactionQuery/loanRequestOperations'
import onlineDepositOperations from '~/components/transactionQuery/onlineDepositeOperations'
import pichackOperations from '~/components/transactionQuery/pichackOperations'
import cardReissueOperations from '~/components/transactionQuery/cardReissueOperations'
import publicOperations from '~/components/transactionQuery/publicOperations'
import userOperations from '~/components/transactionQuery/userOperations'

const defaultFilterdetails = {
  transactionListFilter: {
    transactionId: null
  }
}
const defaultFilterOperation = {
  transactionListFilter: {
    // smsId: null,
    phoneNumber: null,
    operation: [],
    sourceNumber: null,
    sourceType: null,
    result: null,
    platform: null,
    requestId: null,
    os: null,
    transactionId: null,
    amount: null,
    cif: null,
    responseCode: null,
    typeList: null
  },
  dateFilter: {
    from: null,
    to: null
  },
  paginate: {
    page: 1,
    length: 50,
    sort: {
      property: 'id',
      direction: 'desc'
    }
  }
}
export default {
  name: 'TransactionReport',
  components: {
    transactionReportFilter,
    depositOperations,
    cardOperations,
    loanOperations,
    cardReissueOperations,
    onlineDepositOperations,
    pichackOperations,
    userOperations,
    publicOperations,
    VueJsonPretty
  },
  data () {
    return {
      downloadLoading: false,
      createDialog: false,
      operationDialog: false,
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
      operationType: {
        operationType: 'LIST'
      },
      filterOperation: defaultFilterOperation,
      filterDetails: defaultFilterdetails,
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'sourceNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.transactionId'), value: 'id', sortable: false },
        { text: this.$t('report.transactionReport.headers.operation'), value: 'operation', sortable: false },
        { text: this.$t('report.transactionReport.headers.cif'), value: 'cif', sortable: false },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'mobileNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.transactionReport.headers.requestTime'), value: 'requestTime', sortable: false },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'responseCode', sortable: false },
        { text: this.$t('report.transactionReport.headers.detail'), value: 'detail', sortable: false }
      ],
      headersTransaction: [
        { text: this.$t('report.transactionReport.headers.responseTime'), value: 'responseLongTime', sortable: false },
        { text: this.$t('report.transactionReport.headers.appVersion'), value: 'appVersion', sortable: false },
        { text: this.$t('report.transactionReport.headers.osVersion'), value: 'osVersion', sortable: false },
        { text: this.$t('report.transactionReport.headers.osName'), value: 'osName', sortable: false },
        { text: this.$t('report.transactionReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'trackerId', sortable: false },
        { text: this.$t('report.transactionReport.headers.traceId'), value: 'traceId', sortable: false }
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
      itemsTransactionData: [],
      requestJson: null,
      responseJson: null,
      cardList: [],
      depositList: [],
      cardReissueList: [],
      loanList: [],
      loanPanelList: [],
      depositList1: [],
      onlineDepositList: [],
      otherList: [],
      operationList: [],
      listType: 'LIST'
    }
  },

  computed: {
    ...mapGetters({
      cardOperationList: 'onlineDepositStore/cardOperationList',
      depositOperationList: 'onlineDepositStore/depositOperationList',
      publicOperationList: 'onlineDepositStore/publicOperationList',
      userOperationList: 'onlineDepositStore/userOperationList',
      inquiryOperationList: 'onlineDepositStore/inquiryOperationList',
      onlineDepositOperationList: 'onlineDepositStore/onlineDepositOperationList',
      loanRequestOperationList: 'onlineDepositStore/loanRequestOperationList',
      cardReissueOperationList: 'onlineDepositStore/cardReissueOperationList'

    })

  },
  // mounted () {
  //   this.search(this.searchModel)
  // },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    getColor (status) {
      if (status >= 200 && status <= 299) {
        return 'success'
      } else if (status !== null) {
        return 'red'
      }
    },
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
    editItem2 () {
      this.operationDialog = true
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
        traceId: item.traceId,
        ip: item.ip
      })

      defaultFilterdetails.transactionListFilter.transactionId = item.id
      reportManager.transactionDetails(defaultFilterdetails.transactionListFilter, this.$axios).then((response) => {
        this.itemsTransaction.splice(0, 1)
        // this.itemsTransaction.push(response.data)
        try {
          this.requestJson = JSON.parse(response.data.requestJson)
        } catch (e) {
          this.requestJson = response.data.requestJson
        }
        try {
          this.responseJson = JSON.parse(response.data.responseJson)
        } catch (e) {
          this.responseJson = response.data.responseJson
        }
        this.itemsTransaction.push({
          appVersion: response.data.appVersion,
          osVersion: response.data.osVersion,
          osName: response.data.osName,
          responseLongTime: response.data.responseLongTime,
          requestId: response.data.trackerId,
          ip: response.data.ipAddress,
          traceId: response.data.traceId
        })

        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    closeTransactionDetailsDialog () {
      this.itemsTransaction = []
      this.createDialog = false
      this.operationDialog = false
    },
    okOperationDialog () {
      this.cardList = this.cardOperationList
      this.operationList = this.depositOperationList.concat(
        this.cardReissueOperationList,
        this.cardOperationList,
        this.loanRequestOperationList,
        this.onlineDepositOperationList,
        this.publicOperationList,
        this.userOperationList
      )
      this.operationDialog = false
    },
    search (searchModel) {
      this.loading = true

      this.filterOperation = searchModel
      this.filterOperation.transactionListFilter.operation = this.operationList
      reportManager.transactionList(this.filterOperation, this.$axios).then((response) => {
        this.items = response.data.itemList
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
        .finally(() => {
          this.loading = false
        })
    },
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadReports1 () {

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
      }).catch(() => {
        this.alert({
          color: 'error',
          content: 'global.failed'
        })
      }).finally(() => {
        this.downloadLoading = false
      })
    },
    moment (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>
<style scoped>
  .fullScreen {
    width: 100%;
  }

  html {
    font-size: 12px !important;
    text-rendering: optimizeLegibility;
  }

  .short span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width:30px;

  }
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 10px;
    height: 20px;
    width: 60px;
    color: white;
    padding: 0 5px;
  }

</style>
