<template>
  <v-card>
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
      <province-selector
        v-model="filter.locationFilter.provinceCode"
      />
      <city-selector
        v-model="filter.locationFilter.cityCode"
        :province="computedProvince"
      />
      <branch-selector
        v-model="filter.locationFilter.branchCode"
        :province="computedProvince"
        :city="computedCity"
      />
      <v-select
        v-model="filter.reportFilter.status"
        :items="onlineDepositStatus"
        :item-value="(item)=>$t(item.value)"
        :item-text="(item)=>$t(item.name)"
        :return-object="false"
        :label="$t('common.status')"
        prepend-icon="mdi-clipboard-list"
        dense
        clearable
        outlined
      />
      <v-select
        v-model="filter.reportFilter.groupBy"
        :items="groupByItem"
        item-value="value"
        :item-text="(item)=>$t(item.text)"
        :return-object="false"
        :label="$t('filters.groupBy')"
        prepend-icon="mdi-archive"
        dense
        clearable
        outlined
      />
      <v-select
        v-model="filter.reportFilter.depositType"
        :items="depositType"
        :return-object="false"
        :label="$t('filters.depositType')"
        prepend-icon="mdi-credit-card"
        dense
        clearable
        outlined
      />
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters } from 'vuex'
import ProvinceSelector from '@/components/location/provinceSelector.vue'
import CitySelector from '@/components/location/citySelector'
import BranchSelector from '~/components/location/branchSelector'
import reportManager from '~/repository/report_manager'
import onlineDepositManager from '~/repository/online_deposit_manager'

const defaultFilter = {
  reportFilter: {
    depositType: null,
    status: null,
    groupBy: 'none'
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
  name: 'GeneralReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker,
    ProvinceSelector,
    CitySelector,
    BranchSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
      filter: defaultFilter,
      groupByItem: reportManager.groupBy,
      onlineDepositStatus: onlineDepositManager.onlineDepositStatus,
      depositType: onlineDepositManager.depositType
    }
  },
  computed: {
    ...mapGetters({
      me: 'user/me'
    }),
    property () {
      if (this.filter.reportFilter.groupBy === 'none') {
        return 'status'
      } else if (this.filter.reportFilter.groupBy === 'province') {
        return 'provinceCode'
      } else if (this.filter.reportFilter.groupBy === 'city') {
        return 'cityCode'
      } else if (this.filter.reportFilter.groupBy === 'branch') {
        return 'branchCode'
      } else if (this.filter.reportFilter.groupBy === 'date') {
        return 'date'
      }
      return 'status'
    },
    computedProvince: function () {
      if (this.me.provinceCode) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.filter.locationFilter.provinceCode = this.me.provinceCode
        return this.me.provinceCode
      } else {
        return this.filter.locationFilter.provinceCode
      }
    },
    computedCity: function () {
      if (this.me.cityCode) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.filter.locationFilter.cityCode = this.me.cityCode
        return this.me.cityCode
      } else {
        return this.filter.locationFilter.cityCode
      }
    }
  },
  mounted: function () {
    if (this.me.provinceCode) {
      defaultFilter.locationFilter.provinceCode = this.me.provinceCode
    }
    if (this.me.cityCode) {
      defaultFilter.locationFilter.cityCode = this.me.cityCode
    }
    if (this.me.branchCode) {
      defaultFilter.locationFilter.branchCode = this.me.branchCode
    }
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    search () {
      this.filter.paginate.sort.property = this.property
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
