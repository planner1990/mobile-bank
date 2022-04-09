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
        />
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
        <v-col />
        <v-col />
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.errorReportListFilter.operation"
            :items="items"
            item-text="title"
            item-value="url"
            :return-object="false"
            :label="$t('filters.operation')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col
          cols="1"
        />
        <v-col>
          <v-select
            v-model="filter.errorReportListFilter.responseCode"
            :items="errorItems"
            item-text="title"
            item-value=""
            :return-object="false"
            :label="$t('filters.errorCode')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col />
        <v-col />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
// import ProvinceSelector from '@/components/location/provinceSelector.vue'
// import CitySelector from '@/components/location/citySelector'
// import BranchSelector from '~/components/location/branchSelector'
import reportManager from '~/repository/report_manager'
const defaultFilter = {
  errorReportListFilter: {
    operation: null,
    responseCode: null
  },
  dateFilter: {
    from: null,
    to: null
  }
}
export default {
  name: 'ErrorReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker

  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
    this.errorList()
  },
  props: {
    value: Object(defaultFilter)
  },
  data () {
    return {
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      filter: defaultFilter,
      status: reportManager.status,
      responseCodes: reportManager.responseCode,
      operationType: {
        operationType: 'ALL'
      },
      items: [],
      errorItems: []
    }
  },

  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    operation () {
      this.loading = true
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
        console.log(response)
        const operationList = response.data
        const operationCardList = operationList.cardOperation
        operationCardList.push({ divider: true })
        const operationDepositList = operationList.depositOperation
        operationDepositList.push({ divider: true })
        const operationUserList = operationList.userOperation
        operationUserList.push({ divider: true })
        const operationSettingList = operationList.settingOperation
        operationSettingList.push({ divider: true })
        const operationPublicList = operationList.publicOperation
        operationSettingList.push({ divider: true })
        const operationLastList = operationDepositList
        operationCardList.unshift({ divider: true })
        operationCardList.unshift({ header: 'عملیات کارت' })
        operationDepositList.unshift({ divider: true })
        operationDepositList.unshift({ header: 'عملیات حساب' })
        operationDepositList.unshift({ divider: true })
        operationUserList.unshift({ divider: true })
        operationUserList.unshift({ header: 'عملیات کاربری' })
        operationSettingList.unshift({ divider: true })
        operationSettingList.unshift({ header: 'عملیات تنظیمات' })
        operationPublicList.unshift({ divider: true })
        operationPublicList.unshift({ header: 'عملیات عمومی' })
        const array1 = operationLastList.concat(operationCardList, operationUserList, operationSettingList, operationPublicList)
        this.items = array1
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
      reportManager.errorCodeList(this.$axios).then((response) => {
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
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
      }
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      const d = new Date(gmtDate)
      console.log('convertJalaliDateToTimestamp')
      console.log(d.getTime() + (d.getTimezoneOffset() * 60000))
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      console.log('convertJalaliDateToTimestamp1')
      console.log(year + '/' + month + '/' + day)
      return year + '/' + month + '/' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      console.log('convertJalaliDateToTimestamp2')
      console.log(year + '/' + month + '/' + day)
      return year + '/' + month + '/' + day
    }
  }
}
</script>

<style scoped>

</style>
