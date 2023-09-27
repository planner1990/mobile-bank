<template>
  <v-card flat>
    <v-container fluid>
      <!-- main part -->
      <!-- main part -->
      <!-- main part -->
      <div class="main">
        <v-row no-gutters class="pb-2">
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  id="createFromDate"
                  v-model="fromDate"
                  outlined
                  dense
                  :placeholder="$t('filters.fromDate')"
                  :label="$t('filters.createTime')"
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
                  :label="$t('filters.to')"
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
                <v-select
                  v-model="filter.detailFilter.state"
                  :items="refundType"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="'وضعیت ' + $t('filters.refund')"
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
                  v-model="filter.detailFilter.paymentServiceId"
                  :items="paymentServiceId"
                  item-value="value"
                  :item-text="(item)=>$t(item.text)"
                  :return-object="false"
                  :label="'کد پذیرنده'"
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

      <!-- hide part -->
      <!-- hide part -->
      <!-- hide part -->
      <!--      <div v-if="seen" id="hide">-->
      <!--        <hr>-->
      <!--        <div class="main">-->
      <!--          <v-row no-gutters>-->
      <!--            <div class="row mt-5 mr-4 ml-7">-->
      <!--              <v-row>-->
      <!--                <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">-->
      <!--                  <v-text-field-->
      <!--                    id="createFromDate"-->
      <!--                    v-model="fromDate2"-->
      <!--                    outlined-->
      <!--                    dense-->
      <!--                    :placeholder="$t('filters.fromDate')"-->
      <!--                    :label="$t('filters.createTime')"-->
      <!--                  />-->
      <!--                  <p-date-picker-->
      <!--                    v-model="fromDate2"-->
      <!--                    type="datetime"-->
      <!--                    element="createFromDate"-->
      <!--                    color="dimgray"-->
      <!--                    dense-->
      <!--                    outlined-->
      <!--                    popove-->
      <!--                    auto-submit-->
      <!--                    format="HH:mm jYYYY/jMM/jDD"-->
      <!--                    @close="checkIsNullFromDate2()"-->
      <!--                  />-->
      <!--                </v-col>-->
      <!--                <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">-->
      <!--                  <v-text-field-->
      <!--                    id="createToDate"-->
      <!--                    v-model="toDate2"-->
      <!--                    outlined-->
      <!--                    dense-->
      <!--                    :placeholder="$t('filters.toDate')"-->
      <!--                    :label="$t('filters.to')"-->
      <!--                  />-->
      <!--                  <p-date-picker-->
      <!--                    v-model="toDate2"-->
      <!--                    type="datetime"-->
      <!--                    element="createToDate"-->
      <!--                    color="dimgray"-->
      <!--                    dense-->
      <!--                    outlined-->
      <!--                    popove-->
      <!--                    auto-submit-->
      <!--                    format="HH:mm jYYYY/jMM/jDD"-->
      <!--                    @close="checkIsNullToDate2()"-->
      <!--                  />-->
      <!--                </v-col>-->
      <!--                <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">-->
      <!--                  <v-btn-->
      <!--                    :loading="loadingBtn"-->
      <!--                    :disabled="loadingBtn"-->
      <!--                    color="#84BD00"-->
      <!--                    class="btnSearch"-->
      <!--                    @click="search2"-->
      <!--                  >-->
      <!--                    {{ $t('buttons.search') }}-->
      <!--                  </v-btn>-->
      <!--                </v-col>-->
      <!--              </v-row>-->
      <!--            </div>-->
      <!--          </v-row>-->
      <!--        </div>-->
      <!--      </div>-->
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { mapGetters, mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'
import tommorowDayTo from '~/plugins/tommorowDayTo'

const defaultFilter = {
  detailFilter: {
    paymentServiceId: null,
    status: null
  },
  dateFilter: {
    from: null,
    to: null
  }
}

export default {
  name: 'RefundAccountingFilterComponent',
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
      downloadLoading: false,
      fromDate: this.currentDayFrom(),
      toDate: tommorowDayTo.methods.tomorrowDayTo(),
      menu2: false,
      modal2: false,
      filter: defaultFilter,
      status: reportManager.status,
      refundType: reportManager.refundType,
      paymentServiceId: reportManager.paymentServiceId,
      items: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    })
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
    // permission
    checkUserPermissionForShowBtn () {
      if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined ||
        this.currentUser.permissions.find(e => e.name === 'CONFIRM_REFUND') !== undefined ||
        (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')
      ) {
        // نمایش داده شود
        return true
      } else {
        return false
      }
    },
    search () {
      defaultFilter.dateFilter.from = this.fromDate + ':00'
      defaultFilter.dateFilter.to = this.toDate + ':00'
      this.filter = Object.assign(this.value, defaultFilter)
      this.$emit('search', this.filter)
      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 3000)
    },
    refundList (searchModel) {
      this.$emit('refund', this.filter)
    },
    refundConfirmList (searchModel) {
      this.$emit('confirmRefund', this.filter)
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

<style scoped>

</style>
