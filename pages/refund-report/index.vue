<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <refundReportFilter v-model="searchModel" @search="search" @refund="createRefundAcceptDialog()" @confirmRefund="createRefundConfirmDialog()" />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="fullScreen"
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
          @dblclick:row="handleDbClick"
        >
          <!-- table column -->
          <template #[`item.transactionTime`]="{ item }">
            {{ convertToJalali(item.transactionTime) }}
          </template>
          <!-- table column -->
          <template #[`item.createdTime`]="{ item }">
            {{ convertToJalali(item.createdTime) }}
          </template>
          <!-- table column -->
          <template #[`item.refundOrFailTime`]="{ item }">
            {{ convertToJalali(item.refundOrFailTime) }}
          </template>
          <!-- table column -->
          <template #[`item.state`]="{ item }">
            {{ $t('report.refundReport.refundTypeNum.' + item.state) }}
          </template>
          <!-- table column -->
          <template #[`item.url`]="{ item }">
            {{ $t('report.refundReport.refundUrlType.' + item.url) }}
          </template>
          <!-- table column -->
          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>
          <!-- table column -->
          <template #item.errorCode="{ item }">
            <template v-if="item.errorCode !== null">
              <v-chip
                :color="getColor(item.errorCode)"
                label
                class="v-chip.v-size--default justify-center"
              >
                {{ item.errorCode }}
              </v-chip>
            </template>
          </template>
          <!-- table column -->
          <template #item.state="{ item }" class="justify-center">
            <template v-if="item.state !== null" class="justify-center">
              <v-chip
                :color="getColorState(item.state)"
                label
                class="v-chip1 justify-center"
              >
                {{ $t('report.refundReport.refundTypeNum.' + item.state) }}
              </v-chip>
            </template>
          </template>

          <!-- details -->
          <!-- details -->
          <!-- details -->
          <template #[`item.detail`]="{ item }">
            <v-btn
              small
              elevation="0"
              style="color: #84BD00;border-radius: 8px;height: 36px;font-weight: bold;width: 80px;"
              color="rgba(132, 189, 0, 0.1)"
              @click="editItem(item)"
            >
              {{ $t('global.review') }}
            </v-btn>
          </template>

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
            <!-- تایید بازگشت وجه گروهی btn -->
            <!-- تایید بازگشت وجه گروهی btn -->
            <!-- تایید بازگشت وجه گروهی btn -->
            <v-btn
              :loading="downloadLoading"
              :disabled="downloadLoading"
              style="top: 50px;width: 196px;height: 36px;background: #84BD00;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
              @click="downloadReports()"
            >
              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.refundReport.refundList') }}
              </span>
            </v-btn>
            <!-- btn بازگشت وجه گروهی -->
            <!-- btn بازگشت وجه گروهی -->
            <!-- btn بازگشت وجه گروهی -->
            <v-btn
              :loading="downloadLoading"
              :disabled="downloadLoading"
              style="top: 50px;width: 156px;height: 36px;background: #84BD00;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
              @click="downloadReports()"
            >
              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.refundReport.refundConfirmList') }}
              </span>
            </v-btn>
          </template>

          <!-- 5 dialog -->
          <!-- 5 dialog -->
          <!-- 5 dialog -->
          <template #top class="v-data-footer">
            <!-- dialog -->
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
                        class="fullScreen"
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
            <!-- dialog تعیین وضعیت -->
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
            <!-- dialog -->
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
            <!-- dialog -->
            <v-dialog
              v-model="refundAcceptDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="headline">
                  {{ $t('messages.warning') }}
                </v-card-title>

                <br>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="orange"
                    @click="refundList('accept')"
                  >
                    {{ $t('buttons.submit') }}
                  </v-btn>
                  <v-btn
                    color="orange"
                    @click="closeTransactionDetailsDialog"
                  >
                    {{ $t('buttons.cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- dialog -->
            <v-dialog
              v-model="refundConfirmationDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <v-card-title class="headline">
                  {{ $t('messages.warning') }}
                </v-card-title>

                <br>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="orange"
                    @click="refundList('confirm')"
                  >
                    {{ $t('buttons.submit') }}
                  </v-btn>
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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'vue-json-pretty/lib/styles.css'
import moment from 'moment-jalaali'
import { mapGetters, mapMutations } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import refundReportFilter from '~/components/refund-report/refundReportFilter'
import reportManager from '~/repository/report_manager'

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
  name: 'RefundReportPage',
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
      refundAcceptDialog: false,
      refundConfirmationDialog: false,
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
        { text: this.$t('report.transactionReport.headers.detail'), value: 'detail', sortable: false, align: 'center' }
      ],
      headersTransaction: [
        { text: this.$t('report.refundReport.headers.transactionId'), value: 'transactionId', sortable: false },
        { text: this.$t('report.refundReport.headers.url'), value: 'url', sortable: false },
        { text: this.$t('report.refundReport.headers.ip'), value: 'ip', sortable: false },
        { text: this.$t('report.refundReport.headers.switchResponseRrn'), value: 'switchResponseRrn', sortable: false, align: 'center' }
      ],
      items: [],
      itemsTransaction: [],
      requestJson: null,
      responseJson: null,
      sumAmount: 0
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    })
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    // permission
    checkUserPermissionForShowBtn () {
      console.log('*** checkUserPermissionForShowBtn 1 ***',
        this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS'),
        this.currentUser.permissions.find(e => e.name === 'CONFIRM_REFUND'),
        this.currentUser.permissions.length === 0,
        this.currentUser.role.role === 'ROLE_PANEL_ADMIN',
        (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')
      )

      if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined ||
        this.currentUser.permissions.find(e => e.name === 'CONFIRM_REFUND') !== undefined ||
        (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')
      ) {
        // نمایش داده شود
        console.log('*** checkUserPermissionForShowBtn 2 ***', 'true')
        return true
      } else {
        console.log('*** checkUserPermissionForShowBtn 3 ***', 'false')
        return false
      }
    },
    handleDbClick (event, { item }) {
      if (this.checkUserPermissionForShowBtn() === true) {
        defaultFilterdetails.refundRequest.transactionId = item.id
        if (item.state === 4) {
          this.refundDialog = true
        }
        if (item.state === 2) {
          this.refundErrorDialog = true
        }
      } else {
        this.refundErrorDialog = false
      }
    },
    getColor (status) {
      if (status >= 200 && status <= 299) {
        return 'success'
      } else if (status !== null) {
        return 'red'
      }
    },
    getColorState (state) {
      if (state === 0) {
        return '#ffff00'
      } else if (state === 1) {
        return 'success'
      } else if (state === 4) {
        return '#EEE8AA'
      } else if (state === 5) {
        return '#66CDAA'
      } else if (state === 3) {
        return '#ff9933'
      } else if (state === 6) {
        return '#5b90bf'
      } else if (state === 2) {
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
    closeTransactionDetailsDialog () {
      this.itemsTransaction = []
      this.createDialog = false
      this.refundDialog = false
      this.refundErrorDialog = false
      this.refundAcceptDialog = false
      this.refundConfirmationDialog = false
    },
    createRefundAcceptDialog  (searchModel) {
      this.refundAcceptDialog = true
    },
    createRefundConfirmDialog  (searchModel) {
      this.refundConfirmationDialog = true
    },
    refundList (type) {
      this.searchModel.refundListFilter.refundType = type
      reportManager.refundStatusList(this.searchModel, this.$axios).then((res) => {
        this.refundAcceptDialog = false
        this.refundConfirmationDialog = false
        this.search(this.searchModel)
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
      }).finally(() => {
        this.refundAcceptDialog = false
        this.refundConfirmationDialog = false
      })
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
          this.requestJson = JSON.parse(response.data.requestJson)
          this.responseJson = JSON.parse(response.data.responseJson)
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
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>

<style scoped>
  .v-data-footer {
    font-size: 1.05rem !important;
  }
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 10px;
    height: 20px;
    width: 60px;
    color: white;
    padding: 0 5px;
  }
  .v-chip1 {
    border-radius: 16px;
    font-size: 8px!important;
    height: 20px;
    width: 100px !important;
    color: black !important;
    padding: 0 0px !important;
  }
</style>
