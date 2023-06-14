<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <billReportFilter v-model="searchModel" @search="search" />
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
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #[`item.created_at`]="{ item }">
            {{ convertToJalali(item.created_at) }}
          </template>
          <template #[`item.type`]="{ item }">
            {{ $t('report.billReport.billType.' + item.type) }}
          </template>
          <template #[`item.status`]="{ item }">
            <span v-if="['successAmount', 'successAmountNull'].includes(item.status)" style="color: #84BD00">
              {{ $t('report.billReport.billStatus.' + item.status) }}
            </span>
            <span v-else style="color: #444">
              {{ 'ناموفق' }}
            </span>
          </template>

          <template #[`item.mobile`]="{ item }">
            {{ item.mobile || 'تعیین نشده' }}
          </template>

          <template #item.errorCode="{ item }">
            <template v-if="item.errorCode !== null">
              <v-chip
                :color="getColor(item.errorCode)"
                class="v-chip.v-size--default justify-center"
                label
              >
                {{ item.errorCode }}
              </v-chip>
            </template>
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
import billReportFilter from '~/components/bill-report/billReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'BillReportPage',
  components: {
    billReportFilter
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
        { text: this.$t('report.billReport.headers.type'), value: 'type', sortable: false, align: 'center' },
        { text: this.$t('report.billReport.headers.billId'), value: 'inq_search', sortable: false, align: 'center', width: '20%' },
        { text: this.$t('report.billReport.headers.createDate'), value: 'created_at', sortable: false, align: 'center' },
        { text: this.$t('report.billReport.headers.status'), value: 'status', sortable: false, align: 'center' },
        { text: this.$t('report.billReport.headers.mobile'), value: 'mobile', sortable: false, align: 'center' }
      ],
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
      reportManager.billList(searchModel, this.$axios).then((response) => {
        this.items = response.data.data.data
        this.totalNumberOfItems = response.data.data.total
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
      reportManager.downloadBillList(this.searchModel, this.$axios).then((res) => {
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
