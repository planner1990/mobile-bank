<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <customer-statistics-filter v-model="requestObject" @search="search" />
      </v-row>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          item-key="username"
          sort-by="username"
          :items="users"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          dense
          :footer-props="{
            'items-per-page-options': [50, 100, 300, 500, 1000]
          }"
          :items-per-page.sync="requestObject.paginate.length"
          :page.sync="requestObject.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search (requestObject)"
          @update:items-per-page="search (requestObject)"
        >
          <template #top>
            <v-toolbar
              color="lightGreen"
              flat
              dense
              dark
            />
          </template>

          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>

          <template #top />
          <template #[`item.customerType`]="{ item }">
            {{ $t('customer.customerStatistics.customerTypeTitle.' + item.customerType) }}
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import CustomerStatisticsFilter from '@/components/customerStatisticsFilter'
import userManager from '@/repository/user_manager'
import reportManager from '~/repository/report_manager'
// import ProvinceSelector from '@/components/location/provinceSelector.vue'
// import CitySelector from '@/components/location/citySelector'
// import BranchSelector from '@/components/location/branchSelector'

export default {
  components: {
    'customer-statistics-filter': CustomerStatisticsFilter
    // ProvinceSelector,
    // CitySelector,
    // BranchSelector,
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
      // paginate: {
      //   page: 1,
      //   length: 20,
      //   sort: {
      //     property: 'status',
      //     direction: 'desc'
      //   }
      // },
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
        { text: this.$t('customer.customerStatistics.headers.customerType'), value: 'customerType' },
        { text: this.$t('customer.customerStatistics.headers.countNew'), value: 'countNew' },
        { text: this.$t('customer.customerStatistics.headers.countActive'), value: 'countActive' }

      ],
      users: []
    }
  },
  computed: {
    // ...mapGetters({
    //   loggedInUser: 'user/me'
    // }),
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
    //   if (this.userForm.userObj.role === 'ADMIN' || this.userForm.userObj.role === 'REPORTER') {
    //     return this.userForm.locationAccess.filter(e => e.value === 'UNIVERSAL' || e.value === 'PROVINCE')
    //   } else
    //     return this.userForm.locationAccess.filter(e => e.value === 'BRANCH')
    //   }
    //   return []
    // }
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadCustomerStatistics(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'customer-reports.xlsx')
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
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
