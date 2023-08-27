<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <customer-statistics-filter v-model="requestObject" @search="search" />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          item-key="username"
          sort-by="username"
          :items="users"
          :headers="headers"
          class="fullScreen mb-16"
          :loading="loading"
          dense
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 500, 1000]
          }"
          :items-per-page.sync="requestObject.paginate.length"
          :page.sync="requestObject.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search (requestObject)"
          @update:items-per-page="search (requestObject)"
        >
          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template #[`item.customerType`]="{ item }">
            {{ $t('customer.customerStatistics.customerTypeTitle.' + item.customerType) }}
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
import { mapMutations } from 'vuex'
import CustomerStatisticsFilter from '~/components/customer-statistics/customerStatisticsFilter'
import userManager from '~/repository/user_manager'
import reportManager from '~/repository/report_manager'

export default {
  name: 'CustomerStatisticsPage',
  components: {
    'customer-statistics-filter': CustomerStatisticsFilter
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
      downloadLoading: false,
      totalNumberOfItems: 0,
      guids: [
        {
          icon: 'mdi-pencil',
          description: 'user.editGuide'
        },
        {
          icon: 'mdi-trash-can',
          description: 'user.deleteGuide'
        },
        {
          icon: 'mdi-broom',
          description: 'user.clearButton'
        }
      ],
      requestObject: {
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'id',
            direction: 'desc'
          }
        }
      },
      loading: false,
      userForm: {
        showPassword: false,
        roles: userManager.userRoles,
        permissions: userManager.userPermissions,
        locationAccess: userManager.locationAccess,
        userObj: {
          userAccessList: []
        }
      },
      createDialog: false,
      deleteUserDialog: false,
      headers: [
        { text: this.$t('customer.customerStatistics.headers.customerType'), value: 'customerType', sortable: false, align: 'center' },
        { text: this.$t('customer.customerStatistics.headers.countNew'), value: 'countNew', sortable: false, align: 'center' },
        { text: this.$t('customer.customerStatistics.headers.countActive'), value: 'countActive', sortable: false, align: 'center' }
      ],
      users: []
    }
  },
  head () {
    return {
      title: 'آمار کاربران' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  computed: {
    computedErrorsInCreateDialog: function () {
      if (this.createUserErrors.length !== 0) {
        this.createUserErrors.forEach((e) => {
          e.isShow = true
        })
        return this.createUserErrors
      } else {
        return []
      }
    }
  },
  mounted () {
    // this.search(this.requestObject, 'mounted')
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    async pagination () {
      await this.search(this.requestObject)
    },
    async search (searchModel) {
      searchModel.page = this.pagination.page
      searchModel.length = this.pagination.rowsPerPage

      this.searchModel = searchModel

      this.loading = true
      try {
        const response = await userManager.getCustomerStatisticsReport(searchModel, this.$axios)
        this.users = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
      } catch (e) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.loading = false
      }
    },

    showErrorsInCreateUserDialog (errors) {
      this.loading = false
      this.createUserErrors = errors
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    downloadReports () {
      this.downloadLoading = true
      reportManager.downloadCustomerStatistics(this.searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'customer-reports.xlsx')
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
</style>
