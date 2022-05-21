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
      {{ $t('titles.filters') }}
      <v-spacer />
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <v-text-field
            id="createFromDate"
            v-model="fromDate"
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-clipboard-list"
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
            prepend-icon="mdi-clipboard-list"
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
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.phoneNumber"
            dense
            outlined
            :label="$t('filters.phoneNumber')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-text-field
            id="transactionFromDate"
            v-model="transactionFromDate"
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-clipboard-list"
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
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.amount"
            dense
            outlined
            :label="$t('filters.amount')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="filter.refundListFilter.transactionId"
            dense
            outlined
            :label="$t('filters.transactionBank')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-text-field
            id="refundFromDate"
            v-model="refundFromDate"
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-calendar-month"
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
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-btn
            color="success"
            small
            class="mr-10"
            @click="search"
          >
            {{ $t('buttons.search') }}
          </v-btn>
        </v-col>
        <v-col cols="9" />
        <v-col cols="1">
          <v-btn
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="refundList(defaultFilter)"
          >
            {{ $t('report.refundReport.refundList') }}
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
    refundToDate: null
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
  name: 'RefundReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
    // OperationSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
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
  // computed: {
  //   computedOperation: function () {
  //     return this.filter.transactionListFilter.operation
  //   }
  // },
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
    search () {
      this.$emit('search', this.filter)
    },
    operation () {
      console.log('majid')
      this.loading = true
      reportManager.operationList(this.$axios).then((response) => {
        console.log(response)
        const operationList = response.data
        this.items = operationList
        console.log(operationList)
      }).catch((error) => {
        console.log('majid11')
        if (error.response) {
          console.log(error.response)
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          console.log('error.response is null')
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
    },
    refundList (searchModel) {
      reportManager.refundStatusList(defaultFilter, this.$axios).then((res) => {
        this.search()
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
    downloadReports (searchModel) {
      console.log('download')
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
        console.log(error)
        this.alert({
          color: 'error',
          content: 'global.failed'
        })
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
        console.log('fromDate')
        console.log(this.fromDate)
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
        console.log(this.filter.dateFilter.from)
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
      console.log(d.getTime() + (d.getTimezoneOffset() * 60000))
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }

  }
}
</script>

<style scoped>

</style>
