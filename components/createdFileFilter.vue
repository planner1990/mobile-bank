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
    <v-container
      fluid
    >
      <br>
      <v-text-field
        id="createdFileFromDate"
        v-model="fromDate"
        prepend-icon="mdi-calendar-month"
        outlined
        dense
        :placeholder="$t('createExcel.fromDate')"
        format="jYYYY/jMM/jDD"
        input-format="jYYYY/jMM/jDD"
      />
      <p-date-picker
        v-model="fromDate"
        element="createdFileFromDate"
        color="dimgray"
        dense
        outlined
        popove
        auto-submit
        @close="checkIsNull()"
      />
      <v-text-field
        id="createdFileToDate"
        v-model="toDate"
        prepend-icon="mdi-calendar-month"
        outlined
        dense
        :placeholder="$t('createExcel.toDate')"
        format="jYYYY/jMM/jDD"
        input-format="jYYYY/jMM/jDD"
      />
      <p-date-picker
        v-model="toDate"
        element="createdFileToDate"
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
      <br>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters } from 'vuex'
import ProvinceSelector from '@/components/location/provinceSelector.vue'
import CitySelector from '@/components/location/citySelector'
import BranchSelector from '@/components/location/branchSelector'

const defaultFilter = {
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
  name: 'CreatedFileFilter',
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
      filter: defaultFilter
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
  mounted () {
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
      return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime()
    }
  }
}
</script>

<style scoped>
.v-input__slot {
  min-height: auto !important;
}

.v-text-field__slot {
  height: 40px !important;
}
</style>
