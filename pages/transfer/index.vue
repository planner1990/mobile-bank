<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <transferFilter v-model="searchModel" @search="search" />
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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment-jalaali'
import { mapMutations } from 'vuex'
import transferFilter from '~/components/transfer/transferFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'BillReportPage',
  components: {
    transferFilter
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
        { text: this.$t('transfer.headers.customer'), value: 'customer', sortable: false, align: 'center' },
        { text: this.$t('transfer.headers.source'), value: 'source', sortable: false, align: 'center', width: '20%' },
        { text: this.$t('transfer.headers.destination'), value: 'destination', sortable: false, align: 'center' },
        { text: this.$t('transfer.headers.requestTime'), value: 'requestTime', sortable: false, align: 'center' },
        { text: this.$t('transfer.headers.amount'), value: 'amount', sortable: false, align: 'center' },
        { text: this.$t('transfer.headers.userTransferFee'), value: 'userTransferFee', sortable: false, align: 'center' },
        { text: this.$t('transfer.headers.serviceTransferShare'), value: 'serviceTransferShare', sortable: false, align: 'center' }
      ],
      items: []
    }
  },
  head () {
    return {
      title: 'انتقال وجه' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  mounted () {
    this.search(this.searchModel, 'mounted')
  },
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
