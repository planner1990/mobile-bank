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
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
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
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
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
                  v-model="duration"
                  :items="options"
                  item-value="value"
                  :item-text="(item) => $t(item.text)"
                  :return-object="false"
                  :label="$t('filters.duration')"
                  dense
                  outlined
                  @change="checkIsNull()"
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
  name: 'TransactionStatusFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      seen: false,
      duration: null,
      operation: null,
      fromDate: this.yesterdayDayFrom(),
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
  mounted: function () {
    console.log('mounted function' + this.selected)
    defaultFilter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
    defaultFilter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate)
    // defaultFilter.transactionChartDto.duration = this.duration

    this.filter = Object.assign(this.value, defaultFilter)
    // console.log('mounted operation' + this.operation())
    // this.operation()
    this.search()
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
    yesterdayDayFrom: function () {
      const today = new Date()
      const yesterday = new Date(); yesterday.setDate(today.getDate() - 14)

      const year = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
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
