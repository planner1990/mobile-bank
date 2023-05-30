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
                  id="createFromMonth"
                  v-model="fromMonth"
                  outlined
                  dense
                  :placeholder="$t('filters.month')"
                />
                <p-date-picker
                  v-model="fromMonth"
                  type="month"
                  element="createFromMonth"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jMM"
                  @close="checkIsNull()"
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createFromYear"
                  v-model="fromYear"
                  outlined
                  dense
                  :placeholder="$t('filters.month')"
                />
                <p-date-picker
                  v-model="fromYear"
                  type="year"
                  element="createFromYear"
                  color="dimgray"
                  dense
                  outlined
                  popove
                  auto-submit
                  format="jYYYY"
                  @close="checkIsNull()"
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

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapMutations } from 'vuex'
import userManager from '~/repository/user_manager'
import reportManager from '~/repository/report_manager'

const defaultSearchModel = {
  persianDate: null,
  month: null,
  year: null,
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
  name: 'IncomeReportFilterComponent',
  components: {
    PDatePicker: VuePersianDatetimePicker
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      loadingBtn: false,
      seen: false,
      tabsModel: false,
      downloadLoading: false,
      fromMonth: this.currentMonth(),
      fromYear: this.currentYear(),
      roles: userManager.userRoles,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
    }
  },
  mounted: function () {
    // defaultSearchModel.persianDate = this.convertJalaliDateToTimestamp(this.fromMonth, this.fromYear)
    console.log(this.currentYear() + this.currentMonth())
    defaultSearchModel.persianDate = this.currentYear() + '/' + this.currentMonth()
    defaultSearchModel.month = this.currentMonth()
    defaultSearchModel.year = this.currentYear()
    this.filter = Object.assign(this.value, defaultSearchModel)
    this.search()
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search () {
      this.loading = true
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadTransactionStatistics(defaultSearchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'operator-reports.xlsx')
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
    checkIsNull () {
      if (this.fromYear != null) {
        defaultSearchModel.persianDate = this.convertJalaliDateToTimestamp(this.fromMonth, this.fromYear)
        defaultSearchModel.year = this.fromYear
        defaultSearchModel.month = this.fromMonth
      }
    },
    convertJalaliDateToTimestamp (month, year) {
      return year + '/' + month
    },
    currentMonth: function () {
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      return month
    },
    currentYear: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')

      return year
    }
  }
}

</script>
