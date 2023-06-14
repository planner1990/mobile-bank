<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <chargeReportFilter v-model="searchModel" @search="search" />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          dense
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 500, 1000]
          }"
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="fullScreen mb-16"
          :loading="loading"
          :items-per-page.sync="searchModel.paginate.length"
          :server-items-length="totalNumberOfItems"
        >
          <template #[`item.requestTime`]="{ item }">
            {{ convertToJalali(item.requestTime) }}
          </template>
          <template #[`item.sourceType`]="{ item }">
            {{ $t('report.transactionReport.source.' + item.sourceType) }}
          </template>
          <template #[`item.chargeType`]="{ item }">
            {{ $t('report.chargeReport.chargeType.' + item.chargeType) }}
          </template>
          <template #[`item.url`]="{ item }">
            {{ $t('report.refundReport.refundUrlType.' + item.url) }}
          </template>
          <template #[`item.operator`]="{ item }">
            {{ $t('report.chargeReport.operatorType.' + item.operator) }}
          </template>

          <template #[`item.requestId`]="{ item }">
            <div v-if="item.requestId">
              {{ item.requestId }}
            </div>
            <div v-else style="color: #aaa">
              {{ 'تعیین نشده' }}
            </div>
          </template>

          <template #[`item.errorCode`]="{ item }">
            <div v-if="item.errorCode || item.errorCode === 0" class="chip" :style="'color: ' + getColor(item.errorCode)">
              {{ item.errorCode }}
            </div>
            <div v-else class="chip" :style="'color: ' + getColor(null)">
              {{ 'تعیین نشده' }}
            </div>
          </template>

          <template #[`item.detail`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>

          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <!-- Add btn to Footer page -->
          <template #footer>
            <v-btn
              :loading="downloadLoading"
              :disabled="downloadLoading"
              class="btnOnFooterFixUnderGrid"
              @click="downloadReports()"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.0013 7.33334V11.3333M6.0013 11.3333L7.33464 10M6.0013 11.3333L4.66797 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6654 6.66668V10C14.6654 13.3333 13.332 14.6667 9.9987 14.6667H5.9987C2.66536 14.6667 1.33203 13.3333 1.33203 10V6.00001C1.33203 2.66668 2.66536 1.33334 5.9987 1.33334H9.33203" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6654 6.66668H11.9987C9.9987 6.66668 9.33203 6.00001 9.33203 4.00001V1.33334L14.6654 6.66668Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span style="margin-right:5px; font-size: 16px;line-height: 16px;text-align: center;color: #FFFFFF;">
                {{ $t('report.download') }}
              </span>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment-jalaali'
import { mapMutations } from 'vuex'
import chargeReportFilter from '~/components/charge-report/chargeReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'ChargeReportPage',
  components: {
    chargeReportFilter
  },
  data () {
    return {
      downloadLoading: false,
      userForm: {
        showPassword: false,
        userObj: {}
      },
      createDialog: false,
      deleteUserDialog: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'id',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.transactionId'), value: 'id', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.requestId'), value: 'requestId', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'mobileNumber', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'source', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.chargeType'), value: 'chargeType', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.operator'), value: 'operator', sortable: false, align: 'right' },
        { text: this.$t('report.chargeReport.headers.amount'), value: 'amount', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.sellTime'), value: 'requestTime', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'errorCode', sortable: false, align: 'center' }],

      items: []
    }
  },
  // mounted () {
  //   this.search(this.searchModel)
  // },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    getColor (status) {
      if (status >= 200 && status <= 299) {
        return '#84BD00'
      } if (status === null) {
        return '#f1b0b0'
      } else {
        return '#444444'
      }
    },
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    search (searchModel) {
      this.loading = true
      reportManager.chargeList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        console.log(this.items)
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
      }).catch((error) => {
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
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    closeCreateUserDialog () {
      this.createUserErrors = []
      this.loading = false
      this.userForm.userObj = {}
      this.reset()
      this.resetValidation()
      this.createDialog = false
      if (this.isShowTitleOfEditDialog) {
        this.isShowTitleOfEditDialog = false
      }
    },
    convertToJalali (date) {
      if (date !== null) {
        return moment(date).format('HH:mm:ss jYYYY/jM/jD')
      }
    },
    test (platform) {
      console.log(platform)
    },
    moment (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadReports () {
      this.downloadLoading = true
      reportManager.downloadChargeList(this.searchModel, this.$axios).then((res) => {
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
    }
  }
}
</script>
<style scoped>
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 10px;
    height: 20px;
    width: 60px;
    color: white;
    padding: 0 5px;
  }
</style>
