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
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createFromDate"
                  v-model="fromDate"
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
                  format="jYYYY-jMM-jDD HH:mm:ss"
                  @close="checkIsNullFromDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createToDate"
                  v-model="toDate"
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
                  format="jYYYY-jMM-jDD HH:mm:ss"
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
                  style="cursor: pointer !important;"
                  label="انتخاب از بین عملیات ها"
                  clearable
                  @click="editItem()"
                  @click:clear="clearOperationDialog()"
                />
              </v-col>
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
                <v-text-field
                  v-model="filter.transactionListFilter.sourceNumber"
                  dense
                  outlined
                  :label="$t('report.transactionReport.transaction.sourceNumber')"
                />
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
                <v-text-field
                  v-model="filter.transactionListFilter.transactionId"
                  dense
                  outlined
                  :label="$t('filters.transactionId')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
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
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              />
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              />
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              />
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              />
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              />
              <v-col
                class="col-12 col-sm-6 col-md-2 col-lg-2"
                style="float:right;direction:ltr;margin-top: -40px;margin-bottom: 25px"
              >
                <v-btn
                  :loading="loadingBtn"
                  :disabled="loadingBtn"
                  color="#84BD00"
                  class="btnSearch"
                  @click="search"
                >
                  {{ $t('buttons.search') }}
                </v-btn>
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
import tommorowDayTo from '~/plugins/tommorowDayTo'

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
    to: null
    // fromTime: null,
    // toTime: null
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
      lableSelectOperatorRef: '',
      loadingBtn: false,
      seen: true,
      downloadLoading: false,
      createDialog: false,
      fromDate: this.currentDayFrom(),
      fromTime: this.currentTimeFrom(),
      toTime: this.currentTimeTo(),
      toDate: tommorowDayTo.methods.tomorrowDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      status: reportManager.status,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      operationName: reportManager.operationName,
      items: [],
      errorItems: [],
      operationType: {
        operationType: 'LIST'
      }
    }
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.fromDate
    defaultFilter.dateFilter.to = this.toDate
    defaultFilter.transactionListFilter.typeList = 'LIST'
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
    this.errorList()
    setTimeout(() => {
      // this.clearOperationDialog()
    }, 1000, this)
  },
  methods: {
    moment,
    changeLableSelectOperatorRef (input) {
      this.lableSelectOperatorRef = input
    },
    search () {
      this.$emit('search', this.filter)

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    editItem () {
      this.$emit('re_render')
      this.$emit('edit', this.filter)

      this.createDialog = true
    },
    // Remove duplicate values array
    uniqByKeepFirst (a, key) {
      const seen = new Set()
      return a.filter((item) => {
        const k = key(item)
        return seen.has(k) ? false : seen.add(k)
      })
    },
    clearOperationDialog () {
      this.$emit('re_render')
      this.$emit('clearOperationDialog')

      this.lableSelectOperatorRef = ''

      this.createDialog = false
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
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
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
        const errorList = response.data
        errorList.push(200)
        errorList.sort(function (a, b) { return a - b })
        this.errorItems = errorList
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
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
        this.filter.dateFilter.from = this.fromDate
      }
    },
    checkIsNullToDate () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.toDate
      }
    },
    currentTimeFrom: function () {
      return '00:00:00'
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day + ' ' + this.currentTimeFrom()
    },
    currentTimeTo: function () {
      return '00:00:00'
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day + ' ' + this.currentTimeTo()
    }
  }
}
</script>

<style scoped>
</style>
