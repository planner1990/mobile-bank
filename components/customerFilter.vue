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
      dense
      dark
    >
      {{ $t("customer.title") }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('customer.search') }}
      </v-btn>
      <!--      <v-btn-->
      <!--        color="warning"-->
      <!--        fab-->
      <!--        x-small-->
      <!--        @click="clean"-->
      <!--      >-->
      <!--        <v-icon>-->
      <!--          mdi-broom-->
      <!--        </v-icon>-->
      <!--      </v-btn>-->
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
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="request.customerListFilter.phoneNumber"
            :label="$t('customer.phoneNumber')"
            dense
            outlined
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="1" />
        <v-col>
          <v-text-field
            v-model="request.customerListFilter.cif"
            :label="$t('customer.cif')"
            dense
            outlined
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="1" />
        <v-col>
          <v-text-field
            v-model="request.customerListFilter.fullName"
            :label="$t('customer.name')"
            dense
            outlined
            prepend-icon="mdi-account"
          />

          <!--      <province-selector-->
          <!--        v-model="request.locationFilter.provinceCode"-->
          <!--      />-->
          <!--      <city-selector-->
          <!--        v-model="request.locationFilter.cityCode"-->
          <!--        :province="computedProvince"-->
          <!--      />-->
          <!--      <branch-selector-->
          <!--        v-model="request.locationFilter.branchCode"-->
          <!--        :city="computedCity"-->
          <!--        :province="computedProvince"-->
          <!--      />-->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// import { mapGetters } from 'vuex'
// import ProvinceSelector from '../location/provinceSelector.vue'
// import CitySelector from '../location/citySelector.vue'
// import BranchSelector from '../location/branchSelector.vue'
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import userManager from '@/repository/user_manager'

const defaultSearchModel = {
  customerListFilter: {
    cif: null,
    phoneNumber: null,
    customerType: null,
    fullName: null
  },
  dateFilter: {
    from: null,
    to: null
  }

}

export default {
  name: 'LoanFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
    // ProvinceSelector,
    // CitySelector,
    // BranchSelector
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
      roles: userManager.userRoles,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
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
  //       return this.request.locationFilter.provinceCode
  //     }
  //   },
  //   computedCity: function () {
  //     if (this.me.cityCode) {
  //       return this.me.cityCode
  //     } else {
  //       return this.request.locationFilter.cityCode
  //     }
  //   }
  // },
  methods: {
    search () {
      this.loading = true
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
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
