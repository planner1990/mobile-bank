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
        {{ $t('user.search') }}
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
        v-model="filter.paymentFilter.status"
        :items="paymentStatus"
        item-value="value"
        :item-text="(item)=>$t(item.text)"
        :return-object="false"
        :label="$t('common.status')"
        prepend-icon="mdi-clipboard-list"
        dense
        clearable
        outlined
      />
      <v-text-field
        v-model="filter.paymentFilter.nationalCode"
        dense
        outlined
        :label="$t('filters.nationalCode')"
        counter="10"
        prepend-icon="mdi-card-account-details"
      />
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters } from 'vuex'
import PaymentManager from '@/repository/payment_manager'
import ProvinceSelector from '~/components/location/provinceSelector'
import CitySelector from '~/components/location/citySelector'
import BranchSelector from '~/components/location/branchSelector'

const defaultFilter = {
  paymentFilter: {
    status: null,
    nationalCode: null
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
  name: 'PaymentFilter',
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
      paymentStatus: PaymentManager.paymentStatus
    }
  },
  computed: {
    ...mapGetters({
      me: 'user/me'
    }),
    computedProvince: function () {
      if (this.me.provinceCode) {
        return this.me.provinceCode
      } else {
        return this.filter.locationFilter.provinceCode
      }
    },
    computedCity: function () {
      if (this.me.cityCode) {
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
      const timeStamp = new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime()
      return timeStamp
    }
  }
}
</script>
