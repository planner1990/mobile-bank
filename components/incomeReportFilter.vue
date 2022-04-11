<template>
  <v-card
    elevation="10"
    class="fullScreen"
  >
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dense
      dark
    >
      {{ $t("income.title") }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('customer.search') }}
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            id="createFromMonth"
            v-model="fromMonth"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.month')"
          />
          <p-date-picker
            v-model="fromMonth"
            type="month"
            element="createFromMonth"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            format="jMM"
            @close="checkIsNull()"
          />
        </v-col>
        <v-col>
          <v-text-field
            id="createFromYear"
            v-model="fromYear"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.month')"
          />
          <p-date-picker
            v-model="fromYear"
            type="year"
            element="createFromYear"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            format="jYYYY"
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
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import userManager from '@/repository/user_manager'

const defaultSearchModel = {
  persianDate: null,
  month: null,
  year: null
}

export default {
  name: 'IncomeReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  mounted: function () {
    // defaultSearchModel.persianDate = this.convertJalaliDateToTimestamp(this.fromMonth, this.fromYear)
    console.log(this.currentYear() + this.currentMonth())
    defaultSearchModel.persianDate = this.currentYear() + '/' + this.currentMonth()
    defaultSearchModel.month = this.currentMonth()
    defaultSearchModel.year = this.currentYear()
    this.filter = Object.assign(this.value, defaultSearchModel)
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      fromMonth: this.currentMonth(),
      fromYear: this.currentYear(),
      roles: userManager.userRoles,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
    }
  },
  methods: {
    search () {
      this.loading = true
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
    },
    checkIsNull () {
      if (this.fromYear != null) {
        console.log('sddsdsd')
        console.log(this.convertJalaliDateToTimestamp(this.fromYear))
        console.log(this.convertJalaliDateToTimestamp(this.fromMonth))

        defaultSearchModel.persianDate = this.convertJalaliDateToTimestamp(this.fromMonth, this.fromYear)
        console.log(defaultSearchModel.persianDate)
      }
    },
    convertJalaliDateToTimestamp (month, year) {
      return year + '/' + month
    },
    currentMonth: function () {
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      return month
    },
    currentYear: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')

      return year
    }
  }
}

</script>
