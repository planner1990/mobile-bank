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
                  format="jYYYY-jMM-jDD HH:mm"
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
                  format="jYYYY-jMM-jDD HH:mm"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.billListFilter.billId"
                  dense
                  outlined
                  :label="$t('filters.billId')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.billListFilter.billType"
                  :items="billType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.billType')"
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
                  v-model="filter.billListFilter.gatewayApi"
                  :items="gatewayType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.gatewayType')"
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
                  v-model="filter.billListFilter.status"
                  :items="statusType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('filters.statusBill')"
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

      <!-- hide part -->
      <!-- hide part -->
      <!-- hide part -->
      <div v-if="seen" id="hide">
        <v-row>
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="filter.billListFilter.mobile"
                  label="شماره موبایل"
                  dense
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" />
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" />
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" />
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" />
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
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
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  billListFilter: {
    billId: null,
    billType: null,
    gatewayApi: null,
    mobile: null
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
  name: 'BillReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      seen: true,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      downloadLoading: false,
      filter: defaultFilter,
      billType: reportManager.billType,
      gatewayType: reportManager.gatewayType,
      statusType: reportManager.statusType,
      items: []
    }
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.fromDate
    defaultFilter.dateFilter.to = this.toDate
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search () {
      this.$emit('search', this.filter)

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    checkIsNullFromDate () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.fromDate + ':00'
      }
    },
    checkIsNullToDate () {
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.toDate + ':00'
      }
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    }
  }
}
</script>
