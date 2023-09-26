<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <customer-filter v-model="requestObject" @search="search" />
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
          <template #top />

          <template #[`item.registerDate`]="{ item }">
            {{ convertToJalali(item.registerDate) }}
          </template>
          <template #[`item.customerType`]="{ item }">
            {{ $t('customer.customerStatistics.customerTypeTitle.' + item.customerType) }}
          </template>
          <template #[`item.cardOrDeposit`]="{ item }">
            <v-row v-for="cord in item.cardOrDeposit" :key="cord" class="my-1 " style="direction: ltr" align-content="center">
              <v-col class="mx-0 my-0 px-0 py-0" style="direction: ltr">
                {{ cord }}
              </v-col>
            </v-row>
          </template>
          <template #[`item.cif`]="{ item }">
            <div v-if="item.cif">
              {{ item.cif }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.cardOrDeposit`]="{ item }">
            <div v-if="item.cardOrDeposit && item.cardOrDeposit.length !== 0">
              {{ item.cardOrDeposit }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
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

        <!-- dialog -->
        <!-- dialog -->
        <!-- dialog -->
        <v-dialog
          v-model="deleteUserDialog"
          max-width="290"
        >
          <v-card
            dark
            color="primary"
          >
            <v-card-title class="headline">
              {{ $t('messages.warning') }}
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="mb-2"
                small
                color="success"
                @click="deleteItem(item)"
              >
                {{ $t('messages.ok') }}
              </v-btn>
              <v-btn
                class="mb-2"
                small
                color="error"
                @click="deleteUserDialog = false"
              >
                {{ $t('buttons.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import CustomerFilter from '~/components/customer/customerFilter'
import userManager from '~/repository/user_manager'
import reportManager from '~/repository/report_manager'

export default {
  name: 'CustomerPage',
  components: {
    'customer-filter': CustomerFilter
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
        { text: this.$t('customer.headers.id'), value: 'id', sortable: false, align: 'center' },
        { text: this.$t('customer.customerType'), value: 'customerType', sortable: false, align: 'center' },
        { text: this.$t('customer.phoneNumber'), value: 'phoneNumber', sortable: false, align: 'center' },
        { text: this.$t('customer.cif'), value: 'cif', sortable: false, align: 'center' },
        { text: this.$t('customer.name'), value: 'fullName', sortable: false, align: 'center' },
        { text: this.$t('customer.headers.depositOrCard'), value: 'cardOrDeposit', sortable: false, align: 'center' },
        { text: this.$t('customer.headers.registerDate'), value: 'registerDate', sortable: false, align: 'center' }
      ],
      users: [],
      createUserErrors: []
    }
  },
  head () {
    return {
      title: 'لیست کاربران' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
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
    clearAllDataInForm () {
      delete this.userForm.userObj.locationAccess
      delete this.userForm.userObj.userAccessList
      delete this.userForm.userObj.provinceCode
      delete this.userForm.userObj.cityCode
      delete this.userForm.userObj.branchCode
      this.resetValidation()
    },
    async search (searchModel) {
      this.loading = true
      this.searchModel = searchModel
      try {
        const response = await userManager.getCustomerList(searchModel, this.$axios)
        this.users = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
      } catch (e) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.loading = false
      }
    },
    convertToJalali (date) {
      return moment(date).format('hh:mm:ss jYYYY/jM/jD')
    },
    showErrorsInCreateUserDialog (errors) {
      this.loading = false
      this.createUserErrors = errors
    },
    save () {
      if (this.loggedInUser.provinceCode) {
        this.userForm.userObj.provinceCode = this.loggedInUser.provinceCode
      }
      if (this.loggedInUser.cityCode) {
        this.userForm.userObj.cityCode = this.loggedInUser.cityCode
      }
      if (this.loggedInUser.branchCode) {
        this.userForm.userObj.branchCode = this.loggedInUser.branchCode
      }
      if (this.validate()) {
        this.loading = true
        try {
          if (this.userForm.userObj.id) {
            userManager.updateUser(this.userForm.userObj, this.userForm.userObj.id, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.closeCreateUserDialog()
              this.search(this.requestObject)
            }).catch((e) => {
              this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          } else {
            if (this.userForm.userObj.role === 'OPERATOR' &&
              (this.userForm.userObj.cityCode === undefined || this.userForm.userObj.cityCode === null ||
                this.userForm.userObj.branchCode === undefined || this.userForm.userObj.branchCode === null ||
                this.userForm.userObj.provinceCode === undefined || this.userForm.userObj.provinceCode === null
              )
            ) {
              return ''
            }
            userManager.createUser(this.userForm.userObj, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.closeCreateUserDialog()
              this.search(this.requestObject)
            }).catch((e) => {
              this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          }
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      }
    },
    editItem (item) {
      this.userForm.userObj = {
        id: item.id,
        username: item.username,
        password: null,
        provinceCode: item.provinceCode,
        cityCode: item.cityCode,
        branchCode: item.branchCode,
        role: item.role.role,
        locationAccess: item.locationAccess,
        userAccessList: item.userAccess
      }
      this.createDialog = true
      this.isShowTitleOfEditDialog = true
    },
    del (item) {
      this.deleteUserDialog = true
      this.item = item
    },
    async deleteItem (item) {
      try {
        const res = await userManager.deleteUser(item.id, this.$axios)
        if (res.status === 204) {
          this.alert({
            color: 'success',
            content: 'messages.successful'
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      } catch (error) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.deleteUserDialog = false
      }
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

      reportManager.downloadCustomer(this.searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'customer-reports.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        // ------------
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
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style scoped>
  .fullScreen {
    width: 100%;
  }
</style>
