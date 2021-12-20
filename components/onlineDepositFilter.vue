<template>
  <v-card
    elevation="5"
  >
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dark
      dense
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
      <v-text-field
        id="from-date-input"
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
        element="from-date-input"
        color="dimgray"
        dense
        outlined
        popove
        auto-submit
        @close="checkIsNull()"
      />
      <v-text-field
        id="to-date-input"
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
        element="to-date-input"
        color="dimgray"
        dense
        outlined
        popove
        auto-submit
        @close="checkIsNull()"
      />
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
      <v-select
        v-model="filter.onlineDepositFilter.status"
        :items="onlineDepositStatus"
        :item-value="(item)=>$t(item.value)"
        :item-text="(item)=>$t(item.name)"
        :return-object="false"
        :label="$t('common.status')"
        prepend-icon="mdi-clipboard-list"
        dense
        outlined
        clearable
      />
      <v-text-field
        v-model="filter.onlineDepositFilter.lastName"
        dense
        outlined
        :label="$t('filters.lastName')"
        prepend-icon="mdi-account"
      />
      <v-text-field
        v-model="filter.onlineDepositFilter.nationalCode"
        dense
        outlined
        :label="$t('filters.nationalCode')"
        counter="10"
        prepend-icon="mdi-card-account-details"
      />
      <v-select
        v-model="filter.onlineDepositFilter.depositType"
        :items="depositType"
        :return-object="false"
        :label="$t('filters.depositType')"
        prepend-icon="mdi-credit-card"
        clearable
        dense
        outlined
      />
      <v-select
        v-model="filter.onlineDepositFilter.deliveryType"
        :items="deliveryType"
        :return-object="false"
        :item-value="(item)=>item.value"
        :item-text="(item)=>$t(item.text)"
        :label="$t('filters.deliveryType')"
        prepend-icon="mdi-credit-card"
        clearable
        dense
        outlined
      />
      <v-text-field
        v-model="filter.onlineDepositFilter.phoneNumber"
        dense
        outlined
        :label="$t('filters.phoneNumber')"
        prepend-icon="mdi-phone"
      />
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
// import { mapGetters } from 'vuex'
// import ProvinceSelector from '@/components/location/provinceSelector.vue'
// import CitySelector from '@/components/location/citySelector'
import OnlineDepositManager from '@/repository/online_deposit_manager'
// import BranchSelector from '~/components/location/branchSelector'

const defaultFilter = {
  onlineDepositFilter: {
    status: null,
    nationalCode: null,
    phoneNumber: null,
    lastName: null,
    depositType: null,
    deliveryType: null
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
  name: 'OnlineDepositFilter',
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
      filter: defaultFilter,
      defaultStatus: this.$t('onlineDepositStatus.READY_FOR_PROCESS.value'),
      onlineDepositStatus: OnlineDepositManager.onlineDepositStatus,
      depositType: OnlineDepositManager.depositType,
      deliveryType: OnlineDepositManager.deliveryType
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
    // if (this.me.provinceCode) {
    //   defaultFilter.locationFilter.provinceCode = this.me.provinceCode
    // }
    // if (this.me.cityCode) {
    //   defaultFilter.locationFilter.cityCode = this.me.cityCode
    // }
    // if (this.me.branchCode) {
    //   defaultFilter.locationFilter.branchCode = this.me.branchCode
    // }
    defaultFilter.onlineDepositFilter.status = this.defaultStatus
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate, 0, 0, 0)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate, 0, 0, 0)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
      }
    },
    convertJalaliDateToTimestamp (date, hour, minute, second) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime()
    },
    currentDay: function () {
      return moment(new Date().toLocaleDateString(), 'M/D/YYYY').format('jYYYY/jM/jD')
    }
  }
}
</script>
