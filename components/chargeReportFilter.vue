<template>
  <v-card
    elevation="10"
    class="fullScreen"
    color="#f6f6f6"
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
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('buttons.search') }}
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.trackerId"
            dense
            outlined
            :label="$t('filters.trackerId')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.chargeAmount"
            :items="chargeAmount"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.chargeAmount')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.phoneNumber"
            dense
            outlined
            :label="$t('customer.phoneNumber')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.operator"
            :items="operator"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.operator')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.sourceType"
            :items="source"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.source')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.sourceNumber"
            dense
            outlined
            :label="$t('report.transactionReport.transaction.sourceNumber')"
            prepend-icon="mdi-account"
          />
        </v-col>

        <v-col>
          <v-select
            v-model="filter.transactionListFilter.result"
            :items="status"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.result')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.transactionId"
            dense
            outlined
            :label="$t('filters.transactionId')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment-jalaali'
import reportManager from '~/repository/report_manager'
const defaultFilter = {
  transactionListFilter: {
    phoneNumber: null,
    operation: null,
    sourceNumber: null,
    sourceType: null,
    result: null,
    platform: null,
    chargeAmount: null,
    os: null,
    transactionId: null,
    trackerId: null,
    amount: null,
    responseCode: null
  },
  dateFilter: {
    from: null,
    to: null
  }
}
export default {
  name: 'ChargeReportFilter',
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
      status: reportManager.status,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      chargeAmount: reportManager.chargeAmount,
      operator: reportManager.operatorType,
      chargeType: reportManager.chargeType,
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

<style scoped>

</style>
