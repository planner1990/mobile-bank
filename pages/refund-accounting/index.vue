<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <refund-accounting-filter-component
          v-model="searchModel"
          @search="search"
        />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          dense
          :items="items"
          :headers="headers"
          class="fullScreen mb-16"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 500, 1000],
            'items-per-page-text': ' جمع مبالغ بازگشتی : '+ priceFormat(sumAmount)
          }"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
          @dblclick:row="handleDbClick"
        >
          <template #[`item.date`]="{ item }">
            {{ item.date }}
          </template>

          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>

          <template #[`item.number`]="{ item }">
            {{ item.number }}
          </template>

          <template #[`item.paymentServiceId`]="{ item }">
            <span :class="item.paymentServiceId === null ? 'merchantId' : ''">
              {{ item.paymentServiceId | convertMerchantId }}
            </span>
          </template>
          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <template #footer>
            <v-btn
              :loading="downloadLoading"
              :disabled="downloadLoading"
              class="btnOnFooterFixUnderGrid"
              @click="downloadReports()"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.0013 7.33334V11.3333M6.0013 11.3333L7.33464 10M6.0013 11.3333L4.66797 10"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6654 6.66668V10C14.6654 13.3333 13.332 14.6667 9.9987 14.6667H5.9987C2.66536 14.6667 1.33203 13.3333 1.33203 10V6.00001C1.33203 2.66668 2.66536 1.33334 5.9987 1.33334H9.33203"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6654 6.66668H11.9987C9.9987 6.66668 9.33203 6.00001 9.33203 4.00001V1.33334L14.6654 6.66668Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.download') }}
              </span>
            </v-btn>
            <!-- تایید بازگشت وجه گروهی btn -->
            <!-- تایید بازگشت وجه گروهی btn -->
            <!-- تایید بازگشت وجه گروهی btn -->
            <v-btn
              :loading="downloadLoading_refundList"
              :disabled="downloadLoading_refundList"
              style="position: fixed !important;bottom: 4px !important;z-index: 10 !important;right:160px;width: 196px;height: 36px;background: #84BD00;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
              @click="createRefundAcceptDialog()"
            >
              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.refundReport.refundList') }}
              </span>
            </v-btn>
            <!-- btn بازگشت وجه گروهی -->
            <!-- btn بازگشت وجه گروهی -->
            <!-- btn بازگشت وجه گروهی -->
            <v-btn
              :loading="downloadLoading_refundConfirmList"
              :disabled="downloadLoading_refundConfirmList"
              style="position: fixed !important;bottom: 4px !important;z-index: 10 !important;right:363px;width: 156px;height: 36px;background: #84BD00;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
              @click="createRefundConfirmDialog()"
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
            <!-- dialog گزارش جزییات -->
            <!-- dialog گزارش جزییات -->
            <!-- dialog گزارش جزییات -->
            <v-dialog
              v-model="createDialog"
              max-width="1000"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <!-- title -->
                <!-- title -->
                <!-- title -->
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="createDialog = false"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  class=" black--text font-weight-bold headline mb-2"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ $t('user.createDialog') }}
                </v-card-title>

                <v-container>
                  <v-form
                    ref="form"
                  >
                    <!-- row database -->
                    <v-row>
                      <v-data-table
                        id="detailsTableShowDialog"
                        dense
                        item-key="cardOwnerId"
                        sort-by="cardOwnerId"
                        :items="itemsTransaction"
                        :headers="headersTransaction"
                        class="fullScreen"
                        :hide-default-footer="true"
                      />
                    </v-row>
                    <!-- request original details -->
                    <v-row>
                      <v-col cols="6">
                        <v-card
                          color="#f6f6f6"
                          height="100%"
                        >
                          <v-toolbar
                            class="black--text"
                            color="white"
                            flat
                            dark
                            dense
                            style="border-bottom: 2px solid #D8D8D8 !important;"
                          >
                            {{ $t('report.transactionReport.headers.request') }}
                            <v-spacer />
                          </v-toolbar>
                          <v-card-text dir="ltr" class="text-center">
                            <div style="line-height: 3;">
                              <vue-json-pretty
                                :data="requestJson"
                                show-key-value-space="true"
                                render-node-value="true"
                                render-node-key="true"
                                show-line-number="true"
                                show-double-quotes="true"
                                show-length="true"
                              />
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
                              color="white"
                              flat
                              dark
                              dense
                              style="border-bottom: 2px solid #D8D8D8 !important;"
                            >
                              {{ $t('report.transactionReport.headers.response') }}
                              <v-spacer />
                            </v-toolbar>
                            <v-card-text dir="ltr" class="text-center">
                              <div style="line-height: 3;">
                                <vue-json-pretty
                                  :data="responseJson"
                                  show-key-value-space="true"
                                  render-node-value="true"
                                  render-node-key="true"
                                  show-line-number="true"
                                  show-double-quotes="true"
                                  show-length="true"
                                />
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card>
            </v-dialog>

            <!-- dialog تعیین وضعیت در زمان وضعیت ناموفق -->
            <!-- dialog تعیین وضعیت در زمان وضعیت ناموفق -->
            <!-- dialog تعیین وضعیت در زمان وضعیت ناموفق -->
            <v-dialog
              v-model="refundErrorDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <!-- title -->
                <!-- title -->
                <!-- title -->
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="refundErrorDialog = false"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  class=" black--text font-weight-bold headline mb-2"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ $t('report.refundReport.refundStateTitle') }}
                </v-card-title>

                <v-container>
                  <v-form
                    ref="form"
                    style="margin-bottom: 15px"
                  >
                    <v-row justify="center">
                      <v-card-actions style="align-content: center">
                        <v-btn
                          style="width: 250px;color: #fff;"
                          color="purple"
                          @click="refund"
                        >
                          {{ $t('report.refundReport.PENDING') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>

                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;color: #fff;"
                          color="purple"
                          @click="refundManual"
                        >
                          {{ $t('report.refundReport.MANUAL') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card>
            </v-dialog>
            <!-- dialog تعیین وضعیت - نفهمیدم کجا استفاده شده -کد مرده -->
            <!-- dialog تعیین وضعیت - نفهمیدم کجا استفاده شده -کد مرده -->
            <!-- dialog تعیین وضعیت - نفهمیدم کجا استفاده شده -کد مرده -->
            <v-dialog
              v-model="refundDialog"
              max-width="300"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <!-- title -->
                <!-- title -->
                <!-- title -->
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="refundDialog = false"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  class=" black--text font-weight-bold headline mb-2"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ $t('report.refundReport.refundStateTitle') + '*' }}
                </v-card-title>

                <v-container>
                  <v-form
                    ref="form"
                    style="margin-bottom: 15px"
                  >
                    <v-row justify="center">
                      <v-card-actions style="align-content: center">
                        <v-btn
                          style="width: 250px;color: #fff;"
                          color="purple"
                          @click="refund"
                        >
                          {{ $t('report.refundReport.PENDING') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;color: #fff;"
                          color="purple"
                          @click="refundNotRequired"
                        >
                          {{ $t('report.refundReport.REFUND_NOT_REQUIRED') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                    <v-row justify="center">
                      <v-card-actions>
                        <v-btn
                          style="width: 250px;color: #fff;"
                          color="purple"
                          @click="refundManual"
                        >
                          {{ $t('report.refundReport.MANUAL') }}
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card>
            </v-dialog>

            <!-- dialog تاییده گرفتن از کاربر برای تایید بازگشت وجه گروهی -->
            <!-- dialog تاییده گرفتن از کاربر برای تایید بازگشت وجه گروهی -->
            <!-- dialog تاییده گرفتن از کاربر برای تایید بازگشت وجه گروهی -->
            <v-dialog
              v-model="refundAcceptDialog"
              max-width="400px"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <!-- title -->
                <!-- title -->
                <!-- title -->
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="closeTransactionDetailsDialog()"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  class=" black--text font-weight-bold headline mb-2"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ 'تایید بازگشت وجه گروهی' }}
                </v-card-title>

                <v-container>
                  <span style="font-size: 12px;">کاربر گرامی، برای تایید بازگشت وجه گروهی اطمینان دارید؟</span>
                  <br>

                  <center class="mt-4" style="margin-top: 10px;">
                    <v-btn
                      text
                      small
                      style="background: rgba(33, 115, 224, 0.1);border-radius: 8px;font-size: 11px;color: #2173E0;"
                      @click="refundList('accept')"
                    >
                      بله انجام شود (تایید بازگشت وجه گروهی)
                    </v-btn>
                    <v-btn
                      text
                      small
                      style="background: red;border-radius: 8px;font-size: 11px;color: #ffffff;margin-right: 10px;"
                      @click="closeTransactionDetailsDialog()"
                    >
                      انصراف
                    </v-btn>
                  </center>
                  <br>
                </v-container>
              </v-card>
            </v-dialog>

            <!-- dialog تاییده گرفتن از کاربر برای بازگشت وجه گروهی -->
            <!-- dialog تاییده گرفتن از کاربر برای بازگشت وجه گروهی -->
            <!-- dialog تاییده گرفتن از کاربر برای بازگشت وجه گروهی -->
            <v-dialog
              v-model="refundConfirmationDialog"
              max-width="400px"
              transition="dialog-bottom-transition"
            >
              <v-card
                :loading="loading"
              >
                <!-- title -->
                <!-- title -->
                <!-- title -->
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="closeTransactionDetailsDialog()"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  class=" black--text font-weight-bold headline mb-2"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ 'بازگشت وجه گروهی' }}
                </v-card-title>

                <v-container>
                  <span style="font-size: 12px;">کاربر گرامی، برای بازگشت وجه گروهی اطمینان دارید؟</span>
                  <br>

                  <center class="mt-4" style="margin-top: 10px;">
                    <v-btn
                      text
                      small
                      style="background: rgba(33, 115, 224, 0.1);border-radius: 8px;font-size: 11px;color: #2173E0;"
                      @click="refundList('confirm')"
                    >
                      بله انجام شود (بازگشت وجه گروهی)
                    </v-btn>
                    <v-btn
                      text
                      small
                      style="background: red;border-radius: 8px;font-size: 11px;color: #ffffff;margin-right: 10px;"
                      @click="closeTransactionDetailsDialog()"
                    >
                      انصراف
                    </v-btn>
                  </center>
                  <br>
                </v-container>
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
import reportManager from '~/repository/report_manager'
import RefundAccountingFilterComponent from '~/components/refund-accountnig/refundAccountingFilter.vue'

const defaultFilterdetails = {
  dateFilter: {
    from: null,
    to: null
  },
  detailFilter: {
    paymentServiceId: '67',
    status: 1
  }
}
export default {
  name: 'RefundAccountingPage',
  components: {
    RefundAccountingFilterComponent,
    VueJsonPretty
  },
  data () {
    return {
      downloadLoading: false,
      downloadLoading_refundList: false,
      downloadLoading_refundConfirmList: false,
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
      searchModel: {},
      totalNumberOfItems: 0,
      filterDetails: defaultFilterdetails,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.amount'), value: 'amount', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.date'), value: 'date', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.number'), value: 'number', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.paymentServiceId'), value: 'paymentServiceId', sortable: false, align: 'center' }
      ],
      headersTransaction: [
        {
          text: this.$t('report.refundReport.headers.transactionId'),
          value: 'transactionId',
          sortable: false,
          align: 'right'
        },
        { text: this.$t('report.refundReport.headers.url'), value: 'url', sortable: false, align: 'right' },
        { text: this.$t('report.refundReport.headers.ip'), value: 'ip', sortable: false, align: 'right' },
        {
          text: this.$t('report.refundReport.headers.switchResponseRrn'),
          value: 'switchResponseRrn',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      itemsTransaction: [],
      requestJson: null,
      responseJson: null,
      sumAmount: 0
    }
  },
  head () {
    return {
      title: 'حسابداری استرداد وجه' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    })
  },
  mounted () {
    // this.search(this.searchModel, 'mounted')
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    // permission
    checkUserPermissionForShowBtn () {
      if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined ||
        this.currentUser.permissions.find(e => e.name === 'CONFIRM_REFUND') !== undefined ||
        (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')
      ) {
        // نمایش داده شود
        return true
      } else {
        return false
      }
    },
    handleDbClick (event, { item }) {
      if (this.checkUserPermissionForShowBtn() === true) {
        defaultFilterdetails.refundRequest.transactionId = item.id
        /*
          4 -> نیازمند بررسی
          0 -> در انتظار
          3 -> در حال پردازش
          2 -> ناموفق
        */
        if (item.state === 4) {
          this.refundDialog = true
        } else if (item.state === 2 || item.state === 0 || item.state === 3) {
          this.refundErrorDialog = true
        } else {
          this.refundDialog = false
          this.refundErrorDialog = false
        }
      } else {
        this.refundDialog = false
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
        return '#ffff008a'
      } else if (state === 1) {
        return 'success'
      } else if (state === 4) {
        return '#EEE8AA'
      } else if (state === 5) {
        return '#66CDAA'
      } else if (state === 3) {
        return '#ff9933b8'
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
    createRefundAcceptDialog (searchModel) {
      this.refundAcceptDialog = true
    },
    createRefundConfirmDialog (searchModel) {
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
      reportManager.refundAccounting(searchModel, this.$axios).then((response) => {
        this.items = response.data.refundAccountingDetails
        // this.sumAmount = response.data.sumAmount
        // this.totalNumberOfItems = response.data.pageRefundList.filteredItem
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
    },
    downloadReports () {
      this.downloadLoading = true
      reportManager.downloadRefundList(this.searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'refund-reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
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
      }).finally(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style scoped>
/deep/ #detailsTableShowDialog > .v-data-table__wrapper {
  min-height: 110px !important;
}

/* ***   JSON beautifully   *** */
/* ***   JSON beautifully   *** */
/* ***   JSON beautifully   *** */

/deep/ .vjs-tree__node .vjs-tree__indent.has-line {
  border-left: 2px dashed #bfcbd9 !important;
}

/deep/ .vjs-tree__node .vjs-tree__indent {
  -ms-flex: 0 0 2em !important;
  flex: 0 0 2em !important;
}

/deep/ .vjs-value__string {
  color: #6fb78f !important;
  line-break: anywhere !important;
}

/deep/ .vjs-value__boolean, .vjs-value__number {
  color: #0268b5 !important;
}

.merchantId {
  font-size: 11px;
  color: palevioletred;
}
</style>
