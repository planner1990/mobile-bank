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
            :placeholder="$t('filters.month')"
          />
          <p-date-picker
            v-model="fromDate"
            type="date"
            element="createFromDate"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            format="jYYYY/jMM"
            @close="checkIsNull()"
          />
        </v-col>
        <v-col cols="1" />
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
  persianDate: null

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
        console.log('sddsdsd')
        console.log(this.fromDate)
        console.log(this.convertJalaliDateToTimestamp(this.fromDate))

        this.request.persianDate = this.fromDate
      }
      if (this.toDate != null) {
        this.request.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'jYYYY/jMM/jDD').format('MM')
      return new Date(Date.UTC(year, month - 1)).getTime()
    }
  }
}

</script>
