<template>
  <v-card elevation="5" class="fullScreen">
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dark
      dense
      elevation="1"
    >
      آمار تراکنش ها (فیلترها)
      <v-spacer />
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
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
        </v-col>
        <v-col cols="3">
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
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="operation"
            :items="operationName"
            item-value="url"
            :item-text="(item) => $t(item.text)"
            :return-object="false"
            :label="$t('filters.operationName')"
            dense
            clearable
            outlined
            @change="checkIsNull()"
          />
        </v-col>
        <v-col cols="3">
          <!-- <select v-model="selected">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select> -->
          <v-select
            v-model="duration"
            :items="options"
            item-value="value"
            :item-text="(item) => $t(item.text)"
            :return-object="false"
            :label="$t('filters.duration')"
            dense
            outlined
            @change="checkIsNull()"
          />
        </v-col>
      </v-row>
      <v-row no-gutters style="direction:ltr">
        <v-col>
          <v-btn color="success" small class="mr-10" @click="search">
            {{ $t('buttons.search') }}
          </v-btn>
        </v-col>
        <v-col cols="10" />
        <!-- <v-col>
          <v-btn
            color="warning"
            :loading="downloadLoading"
            dark
            small
            @click="downloadReports(defaultFilter)"
          >
            {{ $t('report.download') }}
          </v-btn>
        </v-col> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  transactionChartDto: {
    duration: 'daily',
    operation: '/loan-request/accept-contract',
    searchMode: 'count'
  },
  dateFilter: {
    from: null,
    to: null
  }

}

export default {
  name: 'TransactionStatusFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  mounted: function () {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii' + this.selected)
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    // defaultFilter.transactionChartDto.duration = this.duration

    this.filter = Object.assign(this.value, defaultFilter)
    // console.log('llllllllllllllll' + this.operation())
    // this.operation()
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      duration: null,
      operation: null,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      filter: defaultFilter,
      operationName: reportManager.operationName2,
      options: [
        { text: 'روزانه', value: 'daily' },
        { text: 'ماهیانه', value: 'monthly' }
      ],
      operationType: {
        operationType: 'LIST'
      }

    }
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
      }
      if (this.duration != null) {
        this.filter.transactionChartDto.duration = this.duration
      }
      if (this.operation != null) {
        this.filter.transactionChartDto.operation = this.operation
      }
    },
    // operation () {
    //   this.loading = true
    //   reportManager.operationList(this.operationType, this.$axios).then((response) => {
    //     const operationList = response.data
    //     const operationCardList = operationList.cardOperation
    //     operationCardList.push({ divider: true })
    //     const operationDepositList = operationList.depositOperation
    //     operationDepositList.push({ divider: true })
    //     const operationUserList = operationList.userOperation
    //     operationUserList.push({ divider: true })
    //     const operationSettingList = operationList.settingOperation
    //     operationSettingList.push({ divider: true })
    //     const operationPublicList = operationList.publicOperation
    //     operationSettingList.push({ divider: true })
    //     const operationLastList = operationDepositList
    //     operationCardList.unshift({ divider: true })
    //     operationCardList.unshift({ header: 'عملیات کارت' })
    //     operationDepositList.unshift({ divider: true })
    //     operationDepositList.unshift({ header: 'عملیات حساب' })
    //     operationDepositList.unshift({ divider: true })
    //     operationUserList.unshift({ divider: true })
    //     operationUserList.unshift({ header: 'عملیات کاربری' })
    //     operationSettingList.unshift({ divider: true })
    //     operationSettingList.unshift({ header: 'عملیات تنظیمات' })
    //     operationPublicList.unshift({ divider: true })
    //     operationPublicList.unshift({ header: 'عملیات عمومی' })
    //     const array1 = operationLastList.concat(operationCardList, operationUserList, operationSettingList, operationPublicList)

    //     console.log('pppppppp' + array1)
    //     this.items = array1
    //   }).catch((error) => {
    //     if (error.response) {
    //       this.alert({
    //         color: 'orange',
    //         content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
    //       })
    //     } else {
    //       this.alert({
    //         color: 'orange',
    //         content: 'messages.failed'
    //       })
    //     }
    //     this.loading = false
    //   })
    // },

    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      return new Date(Date.UTC(year, month - 1, day)).getTime()
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '/' + month + '/' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      return year + '/' + month + '/' + day
    }
  }
}
</script>

<style scoped>
</style>
