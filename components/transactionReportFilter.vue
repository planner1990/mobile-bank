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
            id="my-custom-input"
            v-model="fromDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.fromDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="fromDate"
            element="my-custom-input"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            @close="checkIsNull()"
          />
        </v-col>
        <v-col>
          <v-text-field
            id="custom-input"
            v-model="toDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.toDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="toDate"
            element="custom-input"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
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
            v-model="filter.reportFilter.status"
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
            v-model="filter.reportFilter.platform"
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
        <v-col />
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.reportFilter.source"
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
          <v-select
            v-model="filter.reportFilter.operation"
            :items="status"
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
            v-model="filter.reportFilter.result"
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
            v-model="filter.reportFilter.errorCode"
            dense
            outlined
            :label="$t('filters.errorCode')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col />
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="filter.reportFilter.smsTransactionId"
            dense
            outlined
            :label="$t('filters.smsTransactionId')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="filter.reportFilter.osName"
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
            v-model="filter.reportFilter.transactionId"
            dense
            outlined
            :label="$t('filters.transactionId')"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.reportFilter.amount"
            dense
            outlined
            :label="$t('filters.amount')"
            prepend-icon="mdi-account"
          />
        </v-col>
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
