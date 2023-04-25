<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <billReportFilter v-model="searchModel" @search="search" />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          :footer-props="{
            'items-per-page-options': [50, 100, 300, 500, 1000]
          }"
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #top />
          <template #[`item.created_at`]="{ item }">
            {{ convertToJalali(item.created_at) }}
          </template>
          <template #[`item.type`]="{ item }">
            {{ $t('report.billReport.billType.' + item.type) }}
          </template>
          <template #[`item.status`]="{ item }">
            <span v-if="['successAmount', 'successAmountNull'].includes(item.status)">
              {{ $t('report.billReport.billStatus.' + item.status) }}
            </span>
            <span v-else>
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
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import moment from 'moment-jalaali'
import { mapMutations } from 'vuex'
import billReportFilter from '~/components/bill-report/billReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'OperatorReport',
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
        { text: this.$t('report.billReport.headers.type'), value: 'type', sortable: false },
        { text: this.$t('report.billReport.headers.billId'), value: 'inq_search', sortable: false },
        { text: this.$t('report.billReport.headers.createDate'), value: 'created_at', sortable: false },
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
        return 'success'
      } else if (status !== null) {
        return 'red'
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
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 10px;
    height: 20px;
    width: 60px;
    color: white;
    padding: 0 5px;
  }
</style>
