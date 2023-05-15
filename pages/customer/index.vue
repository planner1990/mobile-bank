<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <customer-filter v-model="requestObject" @search="search" />
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
        </v-data-table>
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
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import moment from 'moment-jalaali'
import CustomerFilter from '~/components/customer/customerFilter'
import userManager from '~/repository/user_manager'

export default {
  name: 'CustomerPage',
  components: {
    'customer-filter': CustomerFilter
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
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
        { text: this.$t('customer.headers.id'), value: 'id' },
        { text: this.$t('customer.customerType'), value: 'customerType' },
        { text: this.$t('customer.phoneNumber'), value: 'phoneNumber' },
        { text: this.$t('customer.cif'), value: 'cif' },
        { text: this.$t('customer.name'), value: 'fullName' },
        { text: this.$t('customer.headers.depositOrCard'), value: 'cardOrDeposit' },
        { text: this.$t('customer.headers.registerDate'), value: 'registerDate' },
        { text: '', value: 'actions', sortable: false, align: 'center' }

      ],
      users: [],
      createUserErrors: []
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
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
