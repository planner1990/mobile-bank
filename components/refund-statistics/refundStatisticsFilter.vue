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

<!--<v-btn-->
<!--  class="mb-2"-->
<!--  small-->
<!--  color="warning"-->
<!--  :loading="loading"-->
<!--  @click="confirm"-->
<!--&gt;-->
<!--{{ $t('buttons.confirmRefundStatistics') }}-->
<!--</v-btn>-->

<script>
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

const defaultFilter = {
  dateFilter: {
    from: null,
    to: null
  }
}
export default {
  name: 'RefundStatisticsFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object({})
  },
  data () {
    return {
      loadingBtn: false,
      fromDate: this.currentDayFrom(),
      toDate: this.currentDayTo(),
      downloadLoading: false,
      loading: false,
      time: null,
      filter: defaultFilter,
      items: []
    }
  },
  mounted: function () {
    defaultFilter.dateFilter.from = this.fromDate + ':00'
    defaultFilter.dateFilter.to = this.toDate + ':00'
    this.filter = Object.assign(this.value, defaultFilter)
  },
  methods: {
    search () {
      this.$emit('search', this.filter)

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    confirm () {
      this.$emit('confirm', this.filter)
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
