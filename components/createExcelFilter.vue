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
        {{ $t('createExcel.createFile') }}
      </v-btn>
    </v-toolbar>
    <v-container
      fluid
    >
      <br>
      <v-text-field
        id="createFileFromDate"
        v-model="fromDate"
        prepend-icon="mdi-calendar-month"
        outlined
        dense
        :placeholder="$t('filters.fromDate')"
      />
      <p-date-picker
        v-model="fromDate"
        type="datetime"
        element="createFileFromDate"
        color="dimgray"
        dense
        outlined
        popove
        auto-submit
        format="hh:MM jYYYY/jMM/jDD"
        @close="checkIsNull()"
      />
      <v-text-field
        id="createFileToDate"
        v-model="toDate"
        prepend-icon="mdi-calendar-month"
        outlined
        dense
        :placeholder="$t('filters.toDate')"
      />
      <p-date-picker
        v-model="toDate"
        type="datetime"
        element="createFileToDate"
        color="dimgray"
        dense
        outlined
        popove
        auto-submit
        format="hh:MM jYYYY/jMM/jDD"
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
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters, mapMutations } from 'vuex'
import ProvinceSelector from '@/components/location/provinceSelector.vue'
import CitySelector from '@/components/location/citySelector'
import BranchSelector from '~/components/location/branchSelector'

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
  name: 'CreateExcelFilter',
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
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search () {
      if (this.filter.dateFilter.from === null || this.filter.dateFilter.to === null) {
        this.alert({
          color: 'orange',
          content: 'messages.dateEmpty'
        })
        return
      }
      this.$emit('create', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'hh:MM jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'hh:MM jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'hh:MM jYYYY/jMM/jDD').format('DD')
      const hour = moment(date, 'hh:MM jYYYY/jMM/jDD').format('hh')
      const minute = moment(date, 'hh:MM jYYYY/jMM/jDD').format('MM')
      return new Date(Date.UTC(year, month - 1, day, hour, minute)).getTime()
    }
  }
}
</script>
