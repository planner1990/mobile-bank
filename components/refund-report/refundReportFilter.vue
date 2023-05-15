<template>
  <v-card
    elevation="5"
    class="fullScreen"
  >
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dark
      dense
      elevation="1"
    >
      استرداد وجه (فیلترها)
      <v-spacer />
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
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

        <v-col cols="2">
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
        <v-col cols="2">
          <v-select
            v-model="filter.refundListFilter.orderType"
            :items="orderType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col cols="2">
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
          />
        </v-col>

        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.source"
            dense
            outlined
            :label="$t('filters.sourceNumber')"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.phoneNumber"
            dense
            outlined
            :label="$t('filters.phoneNumber')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
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
        <v-col cols="2">
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
        <v-col cols="2">
          <v-select
            v-model="filter.refundListFilter.state"
            :items="refundType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.refund')"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.requestId"
            dense
            outlined
            :label="$t('filters.trackerIdBank')"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.amount"
            dense
            outlined
            :label="$t('filters.amount')"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.transactionId"
            dense
            outlined
            :label="$t('filters.transactionBank')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
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

        <v-col cols="2">
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
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.transactionResponseCode"
            dense
            outlined
            :label="$t('filters.errorCode')"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3">
          <v-btn
            color="success"
            small
            class="mr-10"
            @click="search"
          >
            {{ $t('buttons.search') }}
          </v-btn>
        </v-col>
        <v-col cols="4" />
        <v-col cols="2">
          <!-- تایید بازگشت وجه گروهی btn -->
          <!-- تایید بازگشت وجه گروهی btn -->
          <!-- تایید بازگشت وجه گروهی btn -->
          <v-btn
            v-if="checkUserPermissionForShowBtn()"
            style="float: left"
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="refundList(defaultFilter)"
          >
            {{ $t('report.refundReport.refundList') }}
          </v-btn>
        </v-col>
        <v-col cols="2">
          <!-- btn بازگشت وجه گروهی -->
          <!-- btn بازگشت وجه گروهی -->
          <!-- btn بازگشت وجه گروهی -->
          <v-btn
            v-if="checkUserPermissionForShowBtn()"
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="refundConfirmList(defaultFilter)"
          >
            {{ $t('report.refundReport.refundConfirmList') }}
          </v-btn>
        </v-col>

        <v-col cols="1">
          <v-btn
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="downloadReports(defaultFilter)"
          >
            {{ $t('report.download') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters } from 'vuex'
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
    // OperationSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
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
    this.operation()
  },
  methods: {
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
    },
    operation () {
      this.loading = true
      reportManager.operationList(this.$axios).then((response) => {
        const operationList = response.data
        this.items = operationList
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
    refundList (searchModel) {
      this.$emit('refund', this.filter)
    },
    refundConfirmList (searchModel) {
      this.$emit('confirmRefund', this.filter)
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadRefundList(defaultFilter, this.$axios).then((res) => {
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
