<template>
  <v-card>
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dense
      dark
    >
      {{ $t("user.title") }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('user.search') }}
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
      <v-text-field
        id="my-custom-input"
        v-model="fromDate"
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
      <v-text-field
        v-model="request.userFilter.username"
        :label="$t('user.username')"
        dense
        outlined
      />
      <v-text-field
        v-model="request.userFilter.username"
        :label="$t('user.customerNumber')"
        dense
        outlined
      />
      <v-text-field
        v-model="request.userFilter.customerName"
        :label="$t('user.customerName')"
        dense
        outlined
      />
      <v-select
        v-model="request.userFilter.role"
        :items="roles"
        :item-text="(item) => $t(item.text)"
        item-value="value"
        :label="$t('user.role')"
        dense
        outlined
      >
        <template #append>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
              stroke="#84BD00"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </v-select>
      <v-select
        v-model="request.userFilter.status"
        :items="status"
        :item-text="(item) => $t(item.text)"
        item-value="value"
        :label="$t('user.status.title')"
        dense
        outlined
      >
        <template #append>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
              stroke="#84BD00"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </v-select>
    </v-container>
  </v-card>
</template>

<script>
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
  name: 'UsersFilterComponent',
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
