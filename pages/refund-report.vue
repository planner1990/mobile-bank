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
          @dblclick:row="handleClick"
        >
          <template #top class="v-data-footer">
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
                            <div style="width:450px" class=" justify-center">
                              <vue-json-pretty :data="requestJson" />
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
                            <v-card-text dir="ltr" class="text-center">
                              <div style="width:450px" class=" justify-center">
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
              v-model="refundDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen light-green--text font-weight-bold headline">
                  {{ $t('report.refundReport.refundStateTitle') }}
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-row justify="center">
                      <v-card-actions style="align-content: center">
                        <v-btn
                          style="width: 250px;"
                          color="lightGreen"
                          @click="refund"
                        >
                          {{ $t('report.refundReport.PENDING') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;"
                          color="lightGreen"
                          @click="refundNotRequired"
                        >
                          {{ $t('report.refundReport.REFUND_NOT_REQUIRED') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;"
                          color="lightGreen"
                          @click="refundManual"
                        >
                          {{ $t('report.refundReport.MANUAL') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-form>
                </v-container>
                <br>
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
              v-model="refundErrorDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen light-green--text font-weight-bold headline">
                  {{ $t('report.refundReport.refundStateTitle') }}
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-row justify="center">
                      <v-card-actions style="align-content: center">
                        <v-btn
                          style="width: 250px;"
                          color="lightGreen"
                          @click="refund"
                        >
                          {{ $t('report.refundReport.PENDING') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>

                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;"
                          color="lightGreen"
                          @click="refundManual"
                        >
                          {{ $t('report.refundReport.MANUAL') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-form>
                </v-container>
                <br>
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
import VueJsonPretty from 'vue-json-pretty'
import refundReportFilter from '~/components/refundReportFilter'
import reportManager from '~/repository/report_manager'
import 'vue-json-pretty/lib/styles.css'
const defaultFilterdetails = {
  refundRequest: {
    refundStateEnum: null,
    transactionId: null
  },
  transactionListFilter: {
    transactionId: null
  }
}
export default {
  name: 'RefundReport',
  components: {
    refundReportFilter,
    VueJsonPretty
  },
  data () {
    return {
      downloadLoading: false,
      createDialog: false,
      refundDialog: false,
      refundErrorDialog: false,
      userForm: {
        showPassword: false,
        userObj: {}
      },
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
      filterDetails: defaultFilterdetails,
      loading: false,
      headers: [
        { text: this.$t('report.refundReport.headers.id'), value: 'id', sortable: false },
        { text: this.$t('report.refundReport.headers.transactionTime'), value: 'transactionTime', sortable: false },
        { text: this.$t('report.refundReport.headers.phoneNumber'), value: 'phoneNumber', sortable: false },
        { text: this.$t('report.refundReport.headers.source'), value: 'source', sortable: false },
        { text: this.$t('report.refundReport.headers.transactionErrorCode'), value: 'transactionErrorCode', sortable: false },
        { text: this.$t('report.refundReport.headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('report.refundReport.headers.createdTime'), value: 'createdTime', sortable: false },
        { text: this.$t('report.refundReport.headers.state'), value: 'state', sortable: false },
        { text: this.$t('report.refundReport.headers.requestId'), value: 'requestId', sortable: false },
        { text: this.$t('report.refundReport.headers.refundOrFailTime'), value: 'refundOrFailTime', sortable: false },
        { text: this.$t('report.refundReport.headers.errorCode'), value: 'errorCode', sortable: false },
        { text: this.$t('report.transactionReport.headers.detail'), value: 'detail', sortable: false }

      ],

      headersTransaction: [
        { text: this.$t('report.refundReport.headers.transactionId'), value: 'transactionId', sortable: false },
        { text: this.$t('report.refundReport.headers.url'), value: 'url', sortable: false },
        { text: this.$t('report.refundReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.refundReport.headers.switchResponseRrn'), value: 'switchResponseRrn', sortable: false }
      ],

      items: [],
      itemsTransaction: [],
      requestJson: null,
      responseJson: null,
      sumAmount: 0
    }
  },
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
    closeTransactionDetailsDialog () {
      this.itemsTransaction = []
      this.createDialog = false
      this.refundDialog = false
      this.refundErrorDialog = false
    },
    search (searchModel) {
      this.loading = true
      searchModel.paginate.sort.property = searchModel.refundListFilter.orderField
      searchModel.paginate.sort.direction = searchModel.refundListFilter.orderType
      reportManager.refundList(searchModel, this.$axios).then((response) => {
        this.items = response.data.pageRefundList.itemList
        this.sumAmount = response.data.sumAmount
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
    handleClick (event, { item }) {
      defaultFilterdetails.refundRequest.transactionId = item.id
      console.log('transactionId')
      console.log(defaultFilterdetails.refundRequest.transactionId)
      if (item.state === 4) {
        this.refundDialog = true
      }
      if (item.state === 2) {
        this.refundErrorDialog = true
      }

      console.log('item')
      console.log(item)
    },
    refundManual () {
      defaultFilterdetails.refundRequest.refundStateEnum = 'MANUAL'
      reportManager.refund(defaultFilterdetails.refundRequest, this.$axios).then((response) => {
        try {
          this.search(this.searchModel)
        } catch (e) {
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
          this.refundDialog = false
          this.refundErrorDialog = false
        })
    },
    refundNotRequired () {
      defaultFilterdetails.refundRequest.refundStateEnum = 'REFUND_NOT_REQUIRED'
      reportManager.refund(defaultFilterdetails.refundRequest, this.$axios).then((response) => {
        try {
          this.search(this.searchModel)
        } catch (e) {
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
          this.refundDialog = false
          this.refundErrorDialog = false
        })
    },
    refund () {
      defaultFilterdetails.refundRequest.refundStateEnum = 'PENDING'

      reportManager.refund(defaultFilterdetails.refundRequest, this.$axios).then((response) => {
        try {
          this.search(this.searchModel)
        } catch (e) {
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
          this.refundDialog = false
          this.refundErrorDialog = false
        })
    },
    editItem (item) {
      this.refundErrorDialog = false
      this.refundDialog = false
      this.createDialog = true
      console.log('editItem')
      console.log(item)
      this.itemsTransaction.splice(0, 1)
      this.itemsTransaction.push({
        transactionId: item.transactionId,
        url: item.url,
        switchResponseRrn: item.switchResponseRrn,
        ip: item.ip,
        errorCode: item.errorCode

      })
      defaultFilterdetails.transactionListFilter.transactionId = item.transactionId
      reportManager.transactionDetails(defaultFilterdetails.transactionListFilter, this.$axios).then((response) => {
        try {
          console.log('editItem11')
          console.log(response.data)
          this.requestJson = JSON.parse(response.data.requestJson)
          this.responseJson = JSON.parse(response.data.responseJson)
          console.log(JSON.parse(response.data.requestJson))
          console.log(this.responseJson)
        } catch (e) {
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    convertToJalali (date) {
      if (date !== null) {
        return moment(date).format('HH:mm:ss jYYYY/jM/jD')
      }
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
  .v-data-footer {
    font-size: 1.05rem !important;
  }
</style>
