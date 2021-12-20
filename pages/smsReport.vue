<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <smsReportFilter v-model="searchModel" @search="search" />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          item-key="id"
          :items="onlineDeposits"
          :headers="headers"
          class="elevation-5"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top>
            <v-toolbar
              color="lightGreen"
              flat
              dense
              dark
            >
              <v-btn
                :disabled="downloadEnable"
                :loading="downloadLoading"
                color="warning"
                class="mb-2"
                small
                @click="downloadSMSReport()"
              >
                {{ $t('headers.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('onlineDepositStatus.' + item.status + '.name') }}
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { mapMutations } from 'vuex'
import smsReportFilter from '~/components/smsReportFilter.vue'
import reportManager from '~/repository/report_manager'

export default {
  name: 'SmsReport',
  components: {
    smsReportFilter
  },
  data () {
    return {
      requestToDownloadSMSReports: {
        reportFilter: {
          nationalCode: '',
          customerNo: '',
          status: []
        },
        dateFilter: {
          from: '',
          to: ''
        },
        locationFilter: {
          provinceCode: '',
          cityCode: '',
          branchCode: ''
        },
        paginate: {
          page: 1,
          length: 1,
          sort: {
            property: 'UNKNOWN',
            direction: 'desc'
          }
        }
      },
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'createdDate',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      downloadLoading: false,
      downloadEnable: true,
      headers: [
        { text: this.$t('report.smsReport.headers.nationalCode'), value: 'nationalCode', sortable: false },
        { text: this.$t('report.smsReport.headers.customerNo'), value: 'customerNo', sortable: false },
        { text: this.$t('report.smsReport.headers.depositNo'), value: 'depositNo', sortable: false },
        { text: this.$t('common.status'), value: 'status', sortable: false }
      ],
      onlineDeposits: []
    }
  },
  mounted () {
    this.search(this.searchModel)
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    checkLengthOfNationalCode (nationalCode) {
      let nationalId = nationalCode.toString()
      const lengthOfNationalCode = nationalId.length
      if (lengthOfNationalCode < 10) {
        let zero = ''
        for (let i = 0; i < 10 - lengthOfNationalCode; i++) {
          zero += '0'
        }
        nationalId = zero + nationalId
      }
      return nationalId
    },
    search (searchModel) {
      this.loading = true
      this.assignSearchModelToSMSReport(searchModel)
      reportManager.smsReport(searchModel, this.$axios).then((response) => {
        this.onlineDeposits = response.data.itemList
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
      }).finally(() => {
        this.loading = false
      })
    },
    assignSearchModelToSMSReport (searchModel) {
      this.requestToDownloadSMSReports.dateFilter = searchModel.dateFilter
      this.requestToDownloadSMSReports.locationFilter = searchModel.locationFilter
      this.requestToDownloadSMSReports.reportFilter = searchModel.reportFilter
      this.downloadEnable = false
    },
    downloadSMSReport () {
      this.downloadLoading = true
      reportManager.downloadSmsReport(this.requestToDownloadSMSReports, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'report.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
      }).catch((error) => {
        error.response.data.text().then((serverResponse) => {
          serverResponse = JSON.parse(serverResponse)
          if (serverResponse) {
            this.alert({
              color: 'orange',
              content: serverResponse.detailList.length !== 0 ? serverResponse.detailList[0].type : serverResponse.error_message
            })
          } else {
            this.alert({
              color: 'orange',
              content: 'messages.failed'
            })
          }
        })
      }).finally(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
