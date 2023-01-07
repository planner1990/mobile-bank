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
          <v-text-field
            v-model="filter.billListFilter.billId"
            dense
            outlined
            :label="$t('filters.billId')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="filter.billListFilter.billType"
            :items="billType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.billType')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="filter.billListFilter.gatewayApi"
            :items="gatewayType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.gatewayType')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="filter.billListFilter.status"
            :items="statusType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.statusBill')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
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
        <v-col cols="10" />
        <v-col>
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
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  billListFilter: {
    billId: null,
    billType: null,
    gatewayApi: null
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
  name: 'ChargeReportFilter',
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
      time: null,
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      billType: reportManager.billType,
      gatewayType: reportManager.gatewayType,
      statusType: reportManager.statusType,
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
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    operation () {
      this.loading = true
      reportManager.operationList(this.$axios).then((response) => {
        console.log(response)
        const operationList = response.data
        this.items = operationList
        console.log(operationList)
      }).catch((error) => {
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadBillList(defaultFilter, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'charge-reports.xlsx')
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
