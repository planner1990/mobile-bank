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
        <v-col
          cols="1"
        >
          <v-text-field
            v-model="request.userFilter.username"
            :label="$t('filters.fromHour')"
            dense
            outlined
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
        <v-col
          cols="1"
        >
          <v-text-field
            v-model="request.userFilter.username"
            :label="$t('filters.toHour')"
            dense
            outlined
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="request.userFilter.username"
            :label="$t('customer.customerType')"
            dense
            outlined
            prepend-icon="mdi-account"
          />

        </v-col>
        <v-col />
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="request.userFilter.username"
            :label="$t('customer.phoneNumber')"
            dense
            outlined
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="1" />
        <v-col>
          <v-text-field
            v-model="request.userFilter.customerName"
            :label="$t('customer.cif')"
            dense
            outlined
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="1" />
        <v-col>
          <v-text-field
            v-model="request.userFilter.customerName"
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
        <v-col />
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
  locationFilter: {
    provinceCode: null,
    cityCode: null,
    branchCode: null
  },
  userFilter: {
    username: null,
    customerNumber: null,
    customerName: null,
    status: null,
    role: null
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
      // if (this.me.provinceCode) {
      //   this.request.locationFilter.provinceCode = this.me.provinceCode
      // }
      // if (this.me.cityCode) {
      //   this.request.locationFilter.cityCode = this.me.cityCode
      // }
      // if (this.me.branchCode) {
      //   this.request.locationFilter.branchCode = this.me.branchCode
      // }
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.request.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.request.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
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
