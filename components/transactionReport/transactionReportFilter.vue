<template>
  <v-card flat>
    <v-container fluid>
      <!-- main part -->
      <!-- main part -->
      <!-- main part -->
      <div class="main">
        <v-row style="margin-top: -5px;">
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-1 col-lg-1">
                <v-text-field
                  id="createFromTime"
                  v-model="fromTime"
                  outlined
                  dense
                  :placeholder="$t('filters.fromTime')"
                />
                <p-date-picker
                  v-model="fromTime"
                  type="time"
                  element="createFromTime"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm"
                  @close="checkIsNullFromTime()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-1 col-lg-1" style="padding-right: 0;">
                <v-text-field
                  id="createFromDate"
                  v-model="fromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
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
                  format="jYYYY/jMM/jDD"
                  @close="checkIsNullFromDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-1 col-lg-1">
                <v-text-field
                  id="createToTime"
                  v-model="toTime"
                  outlined
                  dense
                  :placeholder="$t('filters.toTime')"
                />
                <p-date-picker
                  v-model="toTime"
                  type="time"
                  element="createToTime"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="HH:mm"
                  @close="checkIsNullToTime()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-1 col-lg-1" style="padding-right: 0;">
                <v-text-field
                  id="createToDate"
                  v-model="toDate"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                />
                <p-date-picker
                  v-model="toDate"
                  type="date"
                  element="createToDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jYYYY/jMM/jDD"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.transactionListFilter.phoneNumber"
                  dense
                  outlined
                  :label="$t('customer.phoneNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  dense
                  outlined
                  :value="lableSelectOperatorRef"
                  color="gray"
                  @click="editItem()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.transactionListFilter.responseCode"
                  :items="errorItems"
                  item-text="title"
                  item-value=""
                  :return-object="false"
                  :label="$t('filters.errorCode')"
                  dense
                  clearable
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
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
                <div class="row" style="margin-top: -1px">
                  <div ref="arrowShowExtraFilterTop" style="width: 20%;margin-right: 10px;margin-top: -3px;cursor: pointer;" @click="seen = !seen">
                    <svg
                      v-if="!seen"
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="53" height="53" rx="12" fill="#F6F6F6" />
                      <g clip-path="url(#clip0_559_883)">
                        <path d="M35.2675 22.6008L28 29.8525L20.7325 22.6008L18.5 24.8333L28 34.3333L37.5 24.8333L35.2675 22.6008Z" fill="#757575" />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_883">
                          <rect width="38" height="38" fill="white" transform="translate(9 9)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      v-else
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="53" height="53" rx="12" fill="#e2dfdf" />
                      <g clip-path="url(#clip0_559_892)">
                        <path d="M20.7325 33.3992L28 26.1475L35.2675 33.3992L37.5 31.1667L28 21.6667L18.5 31.1667L20.7325 33.3992Z" fill="#757575" />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_892">
                          <rect width="38" height="38" fill="white" transform="matrix(-1 0 0 -1 47 47)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div style="width: 75%">
                    <v-btn
                      :loading="loadingBtn"
                      :disabled="loadingBtn"
                      color="#84BD00"
                      class="btnSearch"
                      @click="search"
                    >
                      {{ $t('buttons.search') }}
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>

      <!-- hide part -->
      <!-- hide part -->
      <!-- hide part -->
      <div v-if="seen" id="hide">
        <v-row>
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.transactionListFilter.result"
                  :items="status"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.result')"
                  dense
                  clearable
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
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.transactionListFilter.sourceType"
                  :items="source"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.source')"
                  dense
                  clearable
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
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.transactionListFilter.sourceNumber"
                  dense
                  outlined
                  :label="$t('report.transactionReport.transaction.sourceNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.transactionListFilter.cif"
                  dense
                  outlined
                  :label="$t('customer.cif')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.transactionListFilter.requestId"
                  dense
                  outlined
                  :label="$t('filters.trackerId')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <div class="row" style="margin-top: -1px">
                  <v-text-field
                    v-model="filter.transactionListFilter.transactionId"
                    dense
                    outlined
                    :label="$t('filters.transactionId')"
                  />
                </div>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="margin-top: -40px;">
                <v-select
                  v-model="filter.transactionListFilter.os"
                  :items="osName"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.osName')"
                  dense
                  clearable
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
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  transactionListFilter: {
    // smsId: null,
    phoneNumber: null,
    operation: [],
    sourceNumber: null,
    sourceType: null,
    result: null,
    platform: null,
    requestId: null,
    os: null,
    transactionId: null,
    amount: null,
    cif: null,
    responseCode: null,
    typeList: null
  },
  dateFilter: {
    from: null,
    to: null,
    fromTime: null,
    toTime: null
  },
  paginate: {
    page: 1,
    length: 50,
    sort: {
      property: 'id',
      direction: 'desc'
    }
  }
}
export default {
  name: 'TransactionReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker

    // OperationSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      lableSelectOperatorRef: 'انتخاب یک عملیات',
      loadingBtn: false,
      seen: false,
      downloadLoading: false,
      createDialog: false,
      fromDate: this.currentDayFrom(),
      fromTime: this.currentTimeFrom(),
      toTime: this.currentTimeTo(),
      toDate: this.currentDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      status: reportManager.status,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      operationName: reportManager.operationName,
      items1: ['amin', 'majid'],
      items: [],
      errorItems: [],
      operationType: {
        operationType: 'LIST'
      }
    }
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate, this.fromTime)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, this.toTime)
    defaultFilter.transactionListFilter.typeList = 'LIST'
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
    this.errorList()

    this.search()
  },
  methods: {
    changeLableSelectOperatorRef (input) {
      console.log('*** components/transactionReport/transactionReportFilter.vue changeLableSelectOperatorRef', input)
      this.lableSelectOperatorRef = input
    },
    search () {
      this.$emit('search', this.filter)
    },
    editItem () {
      this.$emit('re_render')
      this.$emit('edit', this.filter)

      this.createDialog = true
    },
    // دریافت لیست عملیات ها
    operation () {
      this.loading = true
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
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

        this.items = operationLastList.concat(operationCardList, operationUserList, operationSettingList, operationPublicList)
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
    checkIsNullFromDate () {
      if (this.fromDate != null) {
        console.log('this.fromTime')
        console.log(this.fromTime)
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate, this.fromTime)
      }
    },
    checkIsNullFromTime () {
      if (this.fromDate != null) {
        console.log('this.fromTime')
        console.log(this.fromTime)
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate, this.fromTime)
      }
    },
    checkIsNullToDate () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, this.toTime)
      }
    },
    checkIsNullToTime () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, this.toTime)
      }
    },
    currentTimeFrom: function () {
      return '00:00'
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
      return year + '/' + month + '/' + day
    },
    currentTimeTo: function () {
      return '23:59'
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')

      return year + '/' + month + '/' + day
    },
    convertJalaliDateToTimestamp (date, time) {
      const year = moment(date, 'jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'jYYYY/jMM/jDD').format('DD')
      const hour = moment(time, 'HH:mm').format('HH')
      const minute = moment(time, 'HH:mm').format('mm')
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
