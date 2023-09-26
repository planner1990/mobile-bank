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
                  v-model="from"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                />
                <p-date-picker
                  v-model="from"
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
                  v-model="to"
                  outlined
                  dense
                  :placeholder="$t('filters.toDate')"
                />
                <p-date-picker
                  v-model="to"
                  type="datetime"
                  element="createToDate"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jYYYY-jMM-jDD HH:mm"
                  :min="moment(from, 'YYYY-MM-DD').add(2, 'd').utc().format('YYYY-MM-DD')"
                  @close="checkIsNullToDate()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="filter.status"
                  :items="status"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="$t('offer.status')"
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
                  v-model="filter.title"
                  dense
                  outlined
                  :label="$t('offer.title')"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
                <v-btn :loading="loadingBtn" :disabled="loadingBtn" color="#84BD00" class="btnSearch" @click="search">
                  {{ $t('buttons.search') }}
                </v-btn>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
                <v-btn
                  :loading="loadingBtnNewSuggest"
                  :disabled="loadingBtnNewSuggest"
                  color="#FB8500"
                  class="btnAddNew"
                  @click="$emit('showCreateDialog')"
                >
                  {{ 'افزودن پیشنهاد روز +' }}
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
import { mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'

const defaultFilter = {
  status: null,
  title: null,
  dateFrom: null,
  dateTo: null
}
export default {
  name: 'OfferFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      loadingBtnNewSuggest: false,
      seen: true,
      from: this.yesterdayDayFrom(),
      to: this.currentDayTo(),
      time: null,
      menu2: false,
      modal2: false,
      downloadLoading: false,
      filter: defaultFilter,
      osName: reportManager.osName,
      platform: reportManager.platform,
      source: reportManager.source,
      operationName: reportManager.operationName,
      status: reportManager.offerStatus,
      items: [],
      errorItems: []
    }
  },
  mounted: function () {
    defaultFilter.dateFrom = this.from
    defaultFilter.dateTo = this.to
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
    moment,
    checkIsNullFromDate () {
      if (this.from != null) {
        this.filter.dateFrom = this.from + ':00'
      }
    },
    checkIsNullToDate () {
      if (this.to != null) {
        this.filter.dateTo = this.to + ':00'
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
    },
    yesterdayDayFrom: function () {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 14)

      const year = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    }
  }
}
</script>

<style scoped>

</style>
