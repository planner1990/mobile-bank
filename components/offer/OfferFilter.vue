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
                  format="HH:mm jYYYY/jMM/jDD"
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
                  format="HH:mm jYYYY/jMM/jDD"
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
                />
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
                <v-btn :loading="loadingBtnNewSuggest" :disabled="loadingBtnNewSuggest" color="#FB8500" class="btnAddNew" @click="$emit('showCreateDialog')">
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
      seen: false,
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
    defaultFilter.dateFrom = this.convertJalaliDateToTimestamp(this.from)
    defaultFilter.dateTo = this.convertJalaliDateToTimestamp(this.to)
    this.filter = Object.assign(this.value, defaultFilter)
    this.search()
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNullFromDate () {
      if (this.from != null) {
        this.filter.dateFrom = this.convertJalaliDateToTimestamp(this.from)
      }
    },
    checkIsNullToDate () {
      if (this.to != null) {
        this.filter.dateTo = this.convertJalaliDateToTimestamp(this.to)
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
    yesterdayDayFrom: function () {
      const today = new Date()
      const yesterday = new Date(); yesterday.setDate(today.getDate() - 14)

      const year = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      return '00:00 ' + year + '/' + month + '/' + day
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

<style scoped>

</style>
