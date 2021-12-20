<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col cols="2">
        <generalReportFilter v-model="searchModel" @search="search" />
      </v-col>
      <v-col
        cols="10"
      >
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="tableHeaders"
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
              class="black--text"
              color="lightGreen"
              flat
              dark
              dense
            >
              <v-btn
                color="warning"
                :loading="downloadLoading"
                dark
                small
                @click="downloadReports(searchModel)"
              >
                {{ $t('report.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('onlineDepositStatus.' + item.status + '.name') }}
          </template>
          <template #[`item.date`]="{ item }">
            {{ moment(item.date) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import momentJalali from 'moment-jalaali'
import GeneralReportFilter from '~/components/generalReportFilter'
import reportManager from '~/repository/report_manager'
export default {
  name: 'GeneralReport',
  components: {
    GeneralReportFilter

  },
  data () {
    return {
      isDisableDownloadButton: true,
      downloadLoading: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'status',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      tableHeaders: [],
      items: []
    }
  },
  computed: {
    headers () {
      if (this.searchModel.reportFilter.groupBy === 'none') {
        return [
          { text: this.$t('headers.status'), value: 'status', sortable: false },
          { text: this.$t('headers.number'), value: 'number', sortable: false }
        ]
      } else if (this.searchModel.reportFilter.groupBy === 'province') {
        return [
          { text: this.$t('headers.status'), value: 'status', sortable: false },
          { text: this.$t('headers.province'), value: 'provinceName', sortable: false },
          { text: this.$t('headers.number'), value: 'number', sortable: false }
        ]
      } else if (this.searchModel.reportFilter.groupBy === 'city') {
        return [
          { text: this.$t('headers.status'), value: 'status', sortable: false },
          { text: this.$t('headers.province'), value: 'provinceName', sortable: false },
          { text: this.$t('headers.city'), value: 'cityName', sortable: false },
          { text: this.$t('headers.number'), value: 'number', sortable: false }
        ]
      } else if (this.searchModel.reportFilter.groupBy === 'branch') {
        return [
          { text: this.$t('headers.status'), value: 'status', sortable: false },
          { text: this.$t('headers.province'), value: 'provinceName', sortable: false },
          { text: this.$t('headers.city'), value: 'cityName', sortable: false },
          { text: this.$t('headers.branch'), value: 'branchName', sortable: false },
          { text: this.$t('headers.number'), value: 'number', sortable: false }
        ]
      } else if (this.searchModel.reportFilter.groupBy === 'date') {
        return [
          { text: this.$t('headers.status'), value: 'status', sortable: false },
          { text: this.$t('headers.date'), value: 'date', sortable: false },
          { text: this.$t('headers.number'), value: 'number', sortable: false }
        ]
      }
      return []
    }
  },
  mounted () {
    this.search(this.searchModel)
  },
  methods: {
    async search (searchModel) {
      this.loading = true
      try {
        const response = await reportManager.onlineDepositReport(searchModel, this.$axios)
        if (response.status >= 200 && response.status < 300) {
          this.items = response.data.itemList
          this.totalNumberOfItems = response.data.filteredItem
          this.tableHeaders = this.headers
          this.isDisableDownloadButton = false
        }
      } catch {
      }
      this.loading = false
    },
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadOnlineDepositReport(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
      }).catch((error) => {
        console.log(error)
        this.alert({
          color: 'error',
          content: 'global.failed'
        })
      }).finally(() => {
        this.downloadLoading = false
      })
    },
    moment (date) {
      if (date) {
        return momentJalali(date).format('jYYYY/jM/jD')
      }
    }
  }
}
</script>
