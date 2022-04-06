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
      dark
      dense
      elevation="1"
    >
      {{ $t('titles.filters') }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('buttons.search') }}
      </v-btn>
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
            format="HH:mm jYYYY/jMM/jDD"
            @close="checkIsNullFromDate()"
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
            format="HH:mm jYYYY/jMM/jDD"
            @close="checkIsNullToDate()"
          />
        </v-col>
        <!--      <province-selector-->
        <!--        v-model="filter.locationFilter.provinceCode"-->
        <!--      />-->
        <!--      <city-selector-->
        <!--        v-model="filter.locationFilter.cityCode"-->
        <!--        :province="computedProvince"-->
        <!--      />-->
        <!--      <branch-selector-->
        <!--        v-model="filter.locationFilter.branchCode"-->
        <!--        :province="computedProvince"-->
        <!--        :city="computedCity"-->
        <!--      />-->
        <v-col>
          <v-select
            v-model="filter.offerListFilter.status"
            :items="status"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('offer.status')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.offerListFilter.title"
            dense
            outlined
            :label="$t('offer.title')"
            prepend-icon="mdi-account"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import reportManager from '~/repository/report_manager'
const defaultFilter = {
  offerListFilter: {
    status: null,
    title: null,
    dateFrom: null,
    dateTo: null
  }
}
export default {
  name: 'TransactionReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
    // OperationSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      operationName: reportManager.operationName,
      status: reportManager.offerStatus,
      items: [],
      errorItems: []
    }
  },
  mounted: function () {
    defaultFilter.offerListFilter.dateFrom = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.offerListFilter.dateTo = this.convertJalaliDateToTimestamp(this.toDate)
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
    this.errorList()
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    operation () {
      this.loading = true
      reportManager.operationList(this.$axios).then((response) => {
        console.log(response)
        const operationList = response.data
        this.items = operationList
        console.log(operationList)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          console.log('error.response is null')
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
    },
    errorList () {
      this.loading = true
      reportManager.errorList(this.$axios).then((response) => {
        console.log(response)
        const errorList = response.data
        this.errorItems = errorList
        console.log(errorList)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          console.log('error.response is null')
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
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
      console.log(d.getTime() + (d.getTimezoneOffset() * 60000))
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }

  }
}
</script>

<style scoped>

</style>
