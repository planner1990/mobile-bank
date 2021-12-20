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
      {{ $t('loan.title') }}
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col
          class="d-flex"
        >
          <v-text-field
            id="from-date-input"
            v-model="fromDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('loan.fromDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="fromDate"
            element="from-date-input"
            color="dimgray"
            auto-submit
            outlined
            dense
            popove
            @close="checkIsNull()"
          />
          <!--          <v-btn-->
          <!--            :loading="loading"-->
          <!--            color="success"-->
          <!--            @click="search"-->
          <!--          >-->
          <!--            {{ $t('user.search') }}-->
          <!--          </v-btn>-->
        </v-col>
        <v-col>
          <v-text-field
            id="to-date-input"
            v-model="toDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('loan.toDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="toDate"
            element="to-date-input"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            @close="checkIsNull()"
          />
          <!--              <v-text-field-->
          <!--                prepend-icon=""-->
          <!--                v-model="loanFilter.phoneNumber"-->
          <!--                dense-->
          <!--                outlined-->
          <!--                :label="$t('loan.phoneNumber')"-->
          <!--                counter="11"-->
          <!--              />-->
        </v-col>
        <v-col />
        <v-col />
      </v-row>
      <v-row>
        <v-col />
        <v-col />
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
  reportFilter: {
    customerNationalCode: null,
    status: null,
    operatorUserName: null,
    operationName: null,
    customer: null,
    source: null,
    operation: null,
    result: null,
    platform: null,
    errorCode: null,
    osName: null,
    transactionId: null,
    amount: null,
    smsTransactionId: null
  },
  dateFilter: {
    from: null,
    to: null
  },
  locationFilter: {
    provinceCode: null,
    cityCode: null,
    branchCode: null
  }
}
export default {
  name: 'OperatorReportFilter',
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
      fromDate: null,
      toDate: null,
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
  // mounted: function () {
  //   if (this.me.provinceCode) {
  //     defaultFilter.locationFilter.provinceCode = this.me.provinceCode
  //   }
  //   if (this.me.cityCode) {
  //     defaultFilter.locationFilter.cityCode = this.me.cityCode
  //   }
  //   if (this.me.branchCode) {
  //     defaultFilter.locationFilter.branchCode = this.me.branchCode
  //   }
  //   this.filter = Object.assign(this.value, defaultFilter)
  // },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
      }
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      return new Date(Date.UTC(year, month - 1, day)).getTime()
    }
  }
}
</script>

<style scoped>

</style>
