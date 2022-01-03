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

        <v-col>
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
        <!--      <province-selector-->
        <!--        v-model="filter.locationFilter.provinceCode"-->
        <!--      />-->
        <!--      <city-selector-->
        <!--        v-model="filter.locationFilter.cityCode"-->
        <!--        :province="computedProvince"-->
        <!--      />-->
        <!--      <branch-selector-->
        <!--        v-model="filter.locationFilter.branchCode"-->
        <!--        :province="computedProvince"-->
        <!--        :city="computedCity"-->
        <!--      />-->
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.status"
            :items="status"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('common.status')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.platform"
            :items="platform"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.platform')"
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
            v-model="filter.transactionListFilter.operation"
            :items="operationName"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.operation')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
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
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.issueTracking"
            dense
            outlined
            :label="$t('filters.errorCode')"
            prepend-icon="mdi-account"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.cif"
            dense
            outlined
            :label="$t('customer.cif')"
            prepend-icon="mdi-account"
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
          <v-text-field
            v-model="filter.transactionListFilter.cif"
            dense
            outlined
            :label="$t('filters.smsTransactionId')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.os"
            :items="osName"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.osName')"
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
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.amount"
            dense
            outlined
            :label="$t('filters.amount')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
// import ProvinceSelector from '@/components/location/provinceSelector.vue'
// import CitySelector from '@/components/location/citySelector'
// import BranchSelector from '~/components/location/branchSelector'
import reportManager from '~/repository/report_manager'
const defaultFilter = {
  transactionListFilter: {
    // smsId: null,
    phoneNumber: null,
    operation: null,
    sourceNumber: null,
    sourceType: null,
    result: null,
    platform: null,
    issueTracking: null,
    os: null,
    transactionId: null,
    amount: null,
    cif: null,
    responseCode: null
  },
  dateFilter: {
    from: null,
    to: null
  }
}
export default {
  name: 'TransactionReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
    // ProvinceSelector
    // CitySelector,
    // BranchSelector
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
      status: reportManager.status,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      operationName: reportManager.operationName
    }
  },
  // computed: {
  //   ...mapGetters({
  //     me: 'user/me'
  //   }),
  //   computedProvince: function () {
  //     if (this.me.provinceCode) {
  //       return this.me.provinceCode
  //     } else {
  //       return this.filter.locationFilter.provinceCode
  //     }
  //   },
  //   computedCity: function () {
  //     if (this.me.cityCode) {
  //       return this.me.cityCode
  //     } else {
  //       return this.filter.locationFilter.cityCode
  //     }
  //   }
  // },
  mounted: function () {
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
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
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('YYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('MM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('DD')

      const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      const d = new Date(gmtDate)
      return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('YYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('MM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('DD')

      const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      const d = new Date(gmtDate)
      return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
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
