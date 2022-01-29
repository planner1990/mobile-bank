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
          <v-select
            v-model="request.customerListFilter.customerType"
            :items="customerType"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('customer.customerType')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col cols="1" />
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
            format="HH:mm jYYYY/jMM/jDD"
            @close="checkIsNullFromDate()"
          />
        </v-col>
        <v-col cols="1" />
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
            format="HH:mm jYYYY/jMM/jDD"
            @close="checkIsNullToDate()"
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
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
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      roles: userManager.userRoles,
      customerType: userManager.customerType,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
    }
  },
  mounted: function () {
    defaultSearchModel.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultSearchModel.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    this.filter = Object.assign(this.value, defaultSearchModel)
  },
  methods: {
    search () {
      this.loading = true
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
    },
    checkIsNullFromDate () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
    },
    checkIsNullToDate () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
      return '00:00 ' + year + '/' + month + '/' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')

      return '23:59 ' + year + '/' + month + '/' + day
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'HH:mm jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'HH:mm jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'HH:mm jYYYY/jMM/jDD').format('DD')
      const hour = moment(date, 'HH:mm jYYYY/jMM/jDD').format('HH')
      const minute = moment(date, 'HH:mm jYYYY/jMM/jDD').format('mm')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, 0)
      const d = new Date(gmtDate)
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }
  }
}

</script>
