<template>
  <v-card
    elevation="5"
    class="fullScreen"
  >
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dark
      dense
      elevation="1"
    >
      تراکنش ها (فیلترها)
      <v-spacer />
    </v-toolbar>
    <v-container fluid>
      <br>
      <v-row>
        <v-col cols="1">
          <v-text-field
            id="createFromTime"
            v-model="fromTime"
            class="v-input1"
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
        <v-col cols="1" style="padding-right: 0;">
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
        <v-col cols="1">
          <v-text-field
            id="createToTime"
            v-model="toTime"
            class="v-input1"
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
        <v-col cols="1" style="padding-right: 0;">
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
        <v-col>
          <v-select
            v-model="filter.transactionListFilter.operation"
            :label="$t('filters.operation')"
            item-value="value"
            dense
            outlined
            required
            clearable
            multiple
            @click="editItem()"
          >
            <template>
              <v-chip v-if="items1.length === 1">
                <span>{{ item[0] }}</span>
              </v-chip>
              <span
                v-else
                class="grey--text text-caption"
              >
                (+{{ items1.length - 1 }} others)
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col>
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
          />
        </v-col>
        <v-col>
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
          />
        </v-col>

        <v-col>
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
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.phoneNumber"
            dense
            outlined
            :label="$t('customer.phoneNumber')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.sourceNumber"
            dense
            outlined
            :label="$t('report.transactionReport.transaction.sourceNumber')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.cif"
            dense
            outlined
            :label="$t('customer.cif')"
          />
        </v-col>
        <!--   <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.amount"
            dense
            outlined
            :label="$t('filters.amount')"
          />
        </v-col>-->
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.requestId"
            dense
            outlined
            :label="$t('filters.trackerId')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filter.transactionListFilter.transactionId"
            dense
            outlined
            :label="$t('filters.transactionId')"
          />
        </v-col>
        <v-col>
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
      <template #top>
        <v-dialog
          v-model="createDialog"
          max-width="1000"
          transition="dialog-bottom-transition"
        >
          <v-card
            :loading="loading"
          >
            <v-card-title class="lightGreen light-green--text font-weight-bold headline">
              {{ $t('user.createDialog') }}
            </v-card-title>
            <v-container>
              <v-form
                ref="form"
              >
                <br>
                <v-row>
                  <v-data-table
                    dense
                    item-key="cardOwnerId"
                    sort-by="cardOwnerId"
                    :items="itemsTransaction"
                    :headers="headersTransaction"
                    class="elevation-5 fullScreen"
                    :hide-default-footer="true"
                  />
                </v-row>
                <br>
                <br>
                <br>
                <br>
                <v-row>
                  <v-col cols="6">
                    <v-card
                      color="#f6f6f6"
                      height="100%"
                    >
                      <v-toolbar
                        class="black--text"
                        color="grey lighten-4"
                        flat
                        dark
                        dense
                        elevation="1"
                      >
                        {{ $t('report.transactionReport.headers.request') }}
                        <v-spacer />
                      </v-toolbar>
                      <v-card-text dir="ltr" class="text-center">
                        <div align="justify" style="width:450px;overflow:auto">
                          <vue-json-pretty :data="requestJson" />
                          <!-- <pre>   //{{ item.responseJson }}

                          </pre>-->
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-flex text-xs-center fill-height>
                      <v-card
                        color="#f6f6f6"
                        height="100%"

                        class="justify-center"
                      >
                        <v-toolbar
                          class="black--text"
                          color="grey lighten-4"
                          flat
                          dark
                          dense
                          elevation="1"
                        >
                          {{ $t('report.transactionReport.headers.response') }}
                          <v-spacer />
                        </v-toolbar>
                        <v-card-text dir="ltr">
                          <div align="justify" style="width:450px;overflow:auto">
                            <vue-json-pretty :data="responseJson" />
                            <!-- <pre>   //{{ item.responseJson }}

                        </pre>-->
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="orange"
                @click="closeTransactionDetailsDialog"
              >
                {{ $t('buttons.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
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
  },
  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    editItem () {
      console.log('item212112')
      this.$emit('edit', this.filter)

      this.createDialog = true
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadTransactionList(defaultFilter, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'transaction-reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
      }).catch((error) => {
        console.log(error)
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
      }).finally(() => {
        this.downloadLoading = false
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

  .v-subheader {
    align-items: center;
    display: flex;
    height: 48px;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0 16px 0 16px;
  }
  .v-input1 {
    font-size: 11px !important;
    letter-spacing: normal;
    text-align: left;
  }
</style>
