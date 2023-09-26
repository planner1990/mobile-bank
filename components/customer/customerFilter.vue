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
                  :min="moment(fromDate, 'YYYY-MM-DD').add(2, 'd').utc().format('YYYY-MM-DD')"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="request.customerListFilter.nationalCode"
                  :label="$t('customer.nationalCode')"
                  dense
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="request.customerListFilter.phoneNumber"
                  :label="$t('customer.phoneNumber')"
                  dense
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="request.customerListFilter.cif"
                  :label="$t('customer.cif')"
                  dense
                  outlined
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="request.customerListFilter.customerType"
                  :items="customerType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('customer.customerType')"
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
                  v-model="request.customerListFilter.fullName"
                  :label="$t('customer.name')"
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
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import userManager from '~/repository/user_manager'

const defaultSearchModel = {
  customerListFilter: {
    cif: null,
    nationalCode: null,
    phoneNumber: null,
    customerType: null,
    fullName: null
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
  name: 'LoanFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      loadingBtn: false,
      seen: true,
      downloadLoading: false,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      roles: userManager.userRoles,
      customerType: userManager.customerType,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
    }
  },
  mounted: function () {
    defaultSearchModel.dateFilter.from = this.fromDate
    defaultSearchModel.dateFilter.to = this.toDate
    this.filter = Object.assign(this.value, defaultSearchModel)
  },
  methods: {
    search () {
      this.loading = true
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    moment,
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
