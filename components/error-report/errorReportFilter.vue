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
                  id="my-custom-input"
                  v-model="fromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                />
                <p-date-picker
                  v-model="fromDate"
                  element="my-custom-input"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jYYYY-jMM-jDD"
                  @close="checkIsNull()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="custom-input"
                  v-model="toDate"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                />
                <p-date-picker
                  v-model="toDate"
                  element="custom-input"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jYYYY-jMM-jDD"
                  :min="moment(fromDate, 'YYYY-MM-DD').add(2, 'd').utc().format('YYYY-MM-DD')"
                  @close="checkIsNull()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.errorReportListFilter.operation"
                  :items="items"
                  item-text="title"
                  item-value="url"
                  :return-object="false"
                  :label="$t('filters.operation')"
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
                  v-model="filter.errorReportListFilter.responseCode"
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
                  v-model="filter.errorReportListFilter.errorType"
                  :items="errorTypeItems"
                  :item-value="(item) => item.value"
                  :item-text="(item) => $t(item.title)"
                  :return-object="false"
                  :label="$t('filters.errorType')"
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
                <v-btn :loading="loadingBtn" :disabled="loadingBtn" color="#84BD00" class="btnSearch" @click="search">
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

const defaultFilter = {
  errorReportListFilter: {
    operation: null,
    responseCode: null,
    errorType: null
  },
  dateFilter: {
    from: null,
    to: null
  },
  paginate: {
    page: 1,
    length: 50,
    sort: {
      property: 'errorCode',
      direction: 'desc'
    }
  }
}
export default {
  name: 'ErrorReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object(defaultFilter)
  },
  data () {
    return {
      loadingBtn: false,
      seen: true,
      fromDate: this.yesterdayDayFrom(),
      toDate: this.currentDayTo(),
      filter: defaultFilter,
      status: reportManager.status,
      responseCodes: reportManager.responseCode,
      operationType: {
        operationType: 'ALL'
      },
      items: [],
      errorItems: [],
      errorTypeItems: reportManager.errorType,
      downloadLoading: false
    }
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.fromDate + ' ' + '00:00:00'
    defaultFilter.dateFilter.to = this.toDate + ' ' + '00:00:00'
    this.filter = Object.assign(this.value, defaultFilter)
    this.operation()
    this.errorList()
  },
  methods: {
    search () {
      this.$emit('search', this.filter)

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    operation: function () {
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
        this.errorItems = response.data.reverse()
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
    moment,
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.fromDate + ' ' + '00:00:00'
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.toDate + ' ' + '00:00:00'
      }
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day
    },
    yesterdayDayFrom: function () {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 14)

      const year = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day
    }
  }
}
</script>

<style scoped>

</style>
