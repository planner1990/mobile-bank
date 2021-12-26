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
            format="hh:MM jYYYY/jMM/jDD"
            @close="checkIsNull()"
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
            format="hh:MM jYYYY/jMM/jDD"
            @close="checkIsNull()"
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
      fromDate: this.currentDay(),
      toDate: this.currentDay(),
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
    this.checkIsNull()
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp2(this.fromDate, 0, 0, 0)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp2(this.toDate, 23, 59, 59)
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    currentDay: function () {
      return moment(new Date().toLocaleDateString(), 'M/D/YYYY').format('jYYYY/jMM/jDD')
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      const hour = moment(date, 'hh:MM jYYYY/jMM/jDD').format('hh')
      const minute = moment(date, 'hh:MM jYYYY/jMM/jDD').format('MM')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, 0)
      const d = new Date(gmtDate)
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    },
    convertJalaliDateToTimestamp2 (date, hour, minute, second) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime()
    }

  }
}
</script>

<style scoped>

</style>
