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
                  format="HH:mm jYYYY/jMM/jDD"
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
                  format="HH:mm jYYYY/jMM/jDD"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.chargeListFilter.phoneNumber"
                  dense
                  outlined
                  :label="$t('customer.phoneNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.chargeListFilter.operator"
                  :items="operator"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.operator')"
                  dense
                  clearable
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.chargeListFilter.sourceType"
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
                <v-text-field
                  v-model="filter.chargeListFilter.source"
                  dense
                  outlined
                  :label="$t('report.transactionReport.transaction.sourceNumber')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.chargeListFilter.requestId"
                  dense
                  outlined
                  :label="$t('filters.trackerId')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.chargeListFilter.amount"
                  :items="chargeAmount"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.chargeAmount')"
                  dense
                  clearable
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.chargeListFilter.result"
                  :items="resultId"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.result')"
                  dense
                  clearable
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.chargeListFilter.transactionId"
                  dense
                  outlined
                  :label="$t('filters.transactionId')"
                />
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  chargeListFilter: {
    phoneNumber: null,
    operator: null,
    sourceNumber: null,
    sourceType: null,
    result: null,
    platform: null,
    amount: null,
    os: null,
    transactionId: null,
    requestId: null,
    responseCode: null
  },
  dateFilter: {
    from: null,
    to: null
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
  name: 'ChargeReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
    // OperationSelector
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      seen: false,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      downloadLoading: false,
      filter: defaultFilter,
      resultId: reportManager.resultId,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      chargeAmount: reportManager.chargeAmount,
      operator: reportManager.operatorType,
      chargeType: reportManager.chargeType,
      items: []
    }
  },
  // computed: {
  //   computedOperation: function () {
  //     return this.filter.transactionListFilter.operation
  //   }
  // },
  mounted: function () {
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search () {
      this.$emit('search', this.filter)
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      reportManager.downloadChargeList(defaultFilter, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'charge-reports.xlsx')
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
