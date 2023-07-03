<template>
  <v-card flat>
    <v-container fluid>
      <!-- main part -->
      <!-- main part -->
      <!-- main part -->
      <div class="main">
        <v-row style="margin-top: -5px;">
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createFromDate"
                  v-model="fromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                  :label="$t('filters.createTime')"
                />
                <p-date-picker
                  v-model="fromDate"
                  type="datetime"
                  element="createFromDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullFromDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createToDate"
                  v-model="toDate"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                  :label="$t('filters.to')"
                />
                <p-date-picker
                  v-model="toDate"
                  type="datetime"
                  element="createToDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.refundListFilter.orderType"
                  :items="orderType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  dense
                  clearable
                  outlined
                >
                  <template #append>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </v-select>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.refundListFilter.orderField"
                  :items="transactionTimeType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.orderField')"
                  dense
                  clearable
                  outlined
                >
                  <template #append>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </v-select>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.refundListFilter.source"
                  dense
                  outlined
                  :label="$t('filters.sourceNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
                <div class="row" style="margin-top: -1px">
                  <div ref="arrowShowExtraFilterTop" style="width: 20%;margin-right: 10px;margin-top: -3px;cursor: pointer;" @click="seen = !seen">
                    <svg
                      v-if="!seen"
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="53" height="53" rx="12" fill="#F6F6F6" />
                      <g clip-path="url(#clip0_559_883)">
                        <path d="M35.2675 22.6008L28 29.8525L20.7325 22.6008L18.5 24.8333L28 34.3333L37.5 24.8333L35.2675 22.6008Z" fill="#757575" />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_883">
                          <rect width="38" height="38" fill="white" transform="translate(9 9)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      v-else
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="53" height="53" rx="12" fill="#e2dfdf" />
                      <g clip-path="url(#clip0_559_892)">
                        <path d="M20.7325 33.3992L28 26.1475L35.2675 33.3992L37.5 31.1667L28 21.6667L18.5 31.1667L20.7325 33.3992Z" fill="#757575" />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_892">
                          <rect width="38" height="38" fill="white" transform="matrix(-1 0 0 -1 47 47)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div style="width: 75%">
                    <v-btn
                      :loading="loadingBtn"
                      :disabled="loadingBtn"
                      color="#84BD00"
                      class="btnSearch"
                      @click="search"
                    >
                      {{ $t('buttons.search') }}
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>

      <!-- hide part -->
      <!-- hide part -->
      <!-- hide part -->
      <div v-if="seen" id="hide">
        <v-row>
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="transactionFromDate"
                  v-model="transactionFromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                  :label="$t('filters.transactionTime')"
                />
                <p-date-picker
                  v-model="transactionFromDate"
                  type="datetime"
                  element="transactionFromDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullTransactionFromDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="transactionToDate"
                  v-model="transactionToDate"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                  :label="$t('filters.to')"
                />
                <p-date-picker
                  v-model="transactionToDate"
                  type="datetime"
                  element="transactionToDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullTransactionToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.refundListFilter.phoneNumber"
                  dense
                  outlined
                  :label="$t('filters.phoneNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.refundListFilter.state"
                  :items="refundType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="'وضعیت ' + $t('filters.refund')"
                  dense
                  clearable
                  outlined
                >
                  <template #append>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </v-select>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.refundListFilter.requestId"
                  dense
                  outlined
                  :label="$t('filters.trackerIdBank')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <div class="row" style="margin-top: -1px">
                  <v-text-field
                    v-model="filter.refundListFilter.amount"
                    dense
                    outlined
                    :label="$t('filters.amount')"
                  />
                </div>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="margin-top: -40px;">
                <v-text-field
                  id="refundFromDate"
                  v-model="refundFromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                  :label="$t('filters.refundTime')"
                />
                <p-date-picker
                  v-model="refundFromDate"
                  type="datetime"
                  element="refundFromDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullRefundFromDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="margin-top: -40px;">
                <v-text-field
                  id="refundToDate"
                  v-model="refundToDate"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                  :label="$t('filters.to')"
                />
                <p-date-picker
                  v-model="refundToDate"
                  type="datetime"
                  element="refundToDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullRefundToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="margin-top: -40px;">
                <v-text-field
                  v-model="filter.refundListFilter.transactionId"
                  dense
                  outlined
                  :label="$t('filters.transactionBank')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="margin-top: -40px;">
                <v-text-field
                  v-model="filter.refundListFilter.transactionResponseCode"
                  dense
                  outlined
                  :label="$t('filters.errorCode')"
                />
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

          <!-- تایید بازگشت وجه گروهی btn -->
          <!-- تایید بازگشت وجه گروهی btn -->
          <!-- تایید بازگشت وجه گروهی btn -->
<!--          <v-btn-->
<!--            v-if="checkUserPermissionForShowBtn()"-->
<!--            style="float: left"-->
<!--            color="warning"-->
<!--            :loading="downloadLoading"-->
<!--            dark-->
<!--            small-->
<!--            @click="refundList(defaultFilter)"-->
<!--          >-->
<!--            {{ $t('report.refundReport.refundList') }}-->
<!--          </v-btn>-->

          <!-- btn بازگشت وجه گروهی -->
          <!-- btn بازگشت وجه گروهی -->
          <!-- btn بازگشت وجه گروهی -->
<!--          <v-btn-->
<!--            v-if="checkUserPermissionForShowBtn()"-->
<!--            color="warning"-->
<!--            :loading="downloadLoading"-->
<!--            dark-->
<!--            small-->
<!--            @click="refundConfirmList(defaultFilter)"-->
<!--          >-->
<!--            {{ $t('report.refundReport.refundConfirmList') }}-->
<!--          </v-btn>-->

<!--          <v-btn-->
<!--            color="warning"-->
<!--            :loading="downloadLoading"-->
<!--            dark-->
<!--            small-->
<!--            @click="downloadReports(defaultFilter)"-->
<!--          >-->
<!--            {{ $t('report.download') }}-->
<!--          </v-btn>-->

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters, mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  refundListFilter: {
    phoneNumber: null,
    source: null,
    requestId: null,
    state: null,
    transactionId: null,
    amount: null,
    transactionResponseCode: null,
    orderType: 'DESC',
    orderField: 'requestTime',
    errorCode: null,
    transactionFromDate: null,
    transactionToDate: null,
    refundFromDate: null,
    refundToDate: null,
    refundType: null
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
  name: 'RefundReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      seen: false,
      downloadLoading: false,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      transactionFromDate: null,
      transactionToDate: null,
      refundFromDate: null,
      refundToDate: null,
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      status: reportManager.status,
      source: reportManager.source,
      refundType: reportManager.refundType,
      orderType: reportManager.orderType,
      transactionTimeType: reportManager.transactionTimeType,
      items: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    })
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    defaultFilter.refundListFilter.transactionFromDate = this.convertJalaliDateToTimestamp(this.transactionFromDate)
    defaultFilter.refundListFilter.transactionToDate = this.convertJalaliDateToTimestamp(this.transactionToDate)
    defaultFilter.refundListFilter.refundFromDate = this.convertJalaliDateToTimestamp(this.refundFromDate)
    defaultFilter.refundListFilter.refundToDate = this.convertJalaliDateToTimestamp(this.refundToDate)
    this.filter = Object.assign(this.value, defaultFilter)
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
    search () {
      this.$emit('search', this.filter)

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 1500)
    },
    refundList (searchModel) {
      this.$emit('refund', this.filter)
    },
    refundConfirmList (searchModel) {
      this.$emit('confirmRefund', this.filter)
    },
    convertToJalali (date) {
      if (date !== null) {
        return moment(date).format('HH:mm:ss jYYYY/jM/jD')
      }
    },
    checkIsNullFromDate () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
    },
    checkIsNullToDate () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    checkIsNullTransactionFromDate () {
      if (this.fromDate != null) {
        this.filter.refundListFilter.transactionFromDate = this.convertJalaliDateToTimestamp(this.fromDate)
      }
    },
    checkIsNullTransactionToDate () {
      if (this.toDate != null) {
        this.filter.refundListFilter.transactionToDate = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    checkIsNullRefundFromDate () {
      if (this.fromDate != null) {
        this.filter.refundListFilter.refundFromDate = this.convertJalaliDateToTimestamp(this.fromDate)
      }
    },
    checkIsNullRefundToDate () {
      if (this.toDate != null) {
        this.filter.refundListFilter.refundToDate = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },

    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
      return '00:00 ' + year + '/' + month + '/' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')

      return '23:59 ' + year + '/' + month + '/' + day
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'HH:mm jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'HH:mm jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'HH:mm jYYYY/jMM/jDD').format('DD')
      const hour = moment(date, 'HH:mm jYYYY/jMM/jDD').format('HH')
      const minute = moment(date, 'HH:mm jYYYY/jMM/jDD').format('mm')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, 0)
      const d = new Date(gmtDate)
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }
  }
}
</script>

<style scoped>

</style>
