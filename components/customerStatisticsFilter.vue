<template>
  <v-card
    elevation="5"
    class="fullScreen"
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
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
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
        <v-col cols="2">
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
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-btn
            color="success"
            small
            class="mr-10"
            @click="search"
          >
            {{ $t('buttons.search') }}
          </v-btn>
        </v-col>
        <v-col cols="10" />
        <v-col>
          <v-btn
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="downloadReports(defaultFilter)"
          >
            {{ $t('report.download') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import userManager from '@/repository/user_manager'
import reportManager from '~/repository/report_manager'

const defaultSearchModel = {
  persianDate: null
}

export default {
  name: 'LoanFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  mounted: function () {
    // defaultSearchModel.persianDate = this.convertJalaliDateToTimestamp(this.fromMonth, this.fromYear)
    console.log(this.currentYear() + this.currentMonth())
    defaultSearchModel.persianDate = this.currentYear() + '/' + this.currentMonth()
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadCustomerStatistics(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'customer-reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
      }).catch((error) => {
        console.log(error)
        this.alert({
          color: 'error',
          content: 'global.failed'
        })
      }).finally(() => {
        this.downloadLoading = false
      })
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
