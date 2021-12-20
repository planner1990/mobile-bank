<template>
  <v-container
    tag="section"
    fluid
  >
    <v-row>
      <v-col
        md="3"
      >
        <user-filter v-model="requestObject" @search="search" />
      </v-col>
      <v-col>
        <v-data-table
          item-key="username"
          sort-by="username"
          :items="users"
          :headers="headers"
          class="elevation-5"
          :loading="loading"
          dense
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
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
            >
              <v-dialog
                v-model="createDialog"
                persistent
                max-width="640"
                transition="dialog-bottom-transition"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="warning"
                    class="mb-2"
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ $t('user.newUser') }}
                  </v-btn>
                </template>
                <v-card
                  :loading="loading"
                >
                  <v-card-title v-if="!isShowTitleOfEditDialog" primary-title class="lightGreen font-weight-bold text-h5">
                    {{ $t('user.createDialog') }}
                  </v-card-title>
                  <v-card-title v-if="isShowTitleOfEditDialog" primary-title class="lightGreen font-weight-bold text-h5">
                    {{ $t('user.editDialog') }}
                  </v-card-title>
                  <v-container>
                    <v-form
                      ref="form"
                    >
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="userForm.userObj.username"
                            :disabled="isShowTitleOfEditDialog"
                            prepend-icon="mdi-account"
                            :counter="16"
                            :label="$t('user.username')"
                            :rules="[
                              v => !!v || $t('user.validation.required'),
                              v => (v && v.length <= 16 && v.length >= 4) || $t('user.validation.length')
                            ]"
                            outlined
                            dense
                            required
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-if="!userForm.userObj.id"
                            v-model="userForm.userObj.password"
                            prepend-icon="mdi-form-textbox-password"
                            :label="$t('user.password')"
                            :counter="16"
                            :rules="[
                              v => !!v || $t('user.validation.required'),
                              v => (v && v.length <= 16 && v.length >= 7) || $t('user.validation.length')
                            ]"
                            :type="userForm.showPassword ? 'text' : 'Password'"
                            :append-icon="userForm.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            required
                            dense
                            outlined
                            @click:append="userForm.showPassword = !userForm.showPassword"
                          />
                          <v-text-field
                            v-if="!!userForm.userObj.id"
                            v-model="userForm.userObj.password"
                            prepend-icon="mdi-form-textbox-password"
                            :label="$t('user.password')"
                            :type="userForm.showPassword ? 'text' : 'Password'"
                            :append-icon="userForm.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            outlined
                            dense
                            @click:append="userForm.showPassword = !userForm.showPassword"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select
                            v-model="userForm.userObj.role"
                            prepend-icon="mdi-account-cog"
                            :items="userForm.roles"
                            :item-text="(item) => $t(item.text)"
                            item-value="value"
                            :label="$t('user.role')"
                            :rules="[ v => !!v || $t('user.validation.required') ]"
                            outlined
                            dense
                            required
                            clearable
                            @change="clearAllDataInForm()"
                          />
                        </v-col>
                        <v-col>
                          <v-select
                            v-model="userForm.userObj.locationAccess"
                            prepend-icon="mdi-home-lock"
                            :items="computedLocationAccess"
                            :item-text="(item) => $t(item.text)"
                            item-value="value"
                            :disabled="(userForm.userObj.role === 'OPERATOR' || userForm.userObj.role === undefined || userForm.userObj.role === null)"
                            :readonly="userForm.userObj.role === 'OPERATOR'"
                            :label="$t('user.locationAccess.title')"
                            :rules="[ v => !!v || $t('user.validation.required') ]"
                            outlined
                            dense
                            required
                            clearable
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select
                            v-model="userForm.userObj.userAccessList"
                            prepend-icon="mdi-folder-lock"
                            :items="computedUserAccessList"
                            :item-text="(item) => $t(item.text)"
                            item-value="value"
                            :disabled="(userForm.userObj.role === 'REPORTER' || userForm.userObj.role === 'OPERATOR' || userForm.userObj.role === undefined || userForm.userObj.role === null)"
                            :readonly="userForm.userObj.role === 'OPERATOR'"
                            :label="$t('user.permission')"
                            outlined
                            dense
                            required
                            clearable
                            multiple
                          />
                        </v-col>
                        <v-col>
                          <province-selector
                            v-model="userForm.userObj.provinceCode"
                            icon="mdi-map-marker"
                            :location-access="userForm.userObj.locationAccess"
                            :is-show-rules="((userForm.userObj.provinceCode === undefined || userForm.userObj.provinceCode === null || userForm.userObj.provinceCode === '') && (userForm.userObj.locationAccess === 'PROVINCE' || userForm.userObj.locationAccess === 'BRANCH'))"
                            :is-disabled="(userForm.userObj.role === undefined || userForm.userObj.role === null || userForm.userObj.locationAccess === undefined || userForm.userObj.locationAccess === null)"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <city-selector
                            v-model="userForm.userObj.cityCode"
                            :province="computedProvince"
                            :location-access="userForm.userObj.locationAccess"
                            :is-disabled="(userForm.userObj.role === undefined || userForm.userObj.role === null || userForm.userObj.role === 'ADMIN'|| userForm.userObj.role === 'REPORTER')"
                            :is-show-rules="userForm.userObj.role === 'OPERATOR' && (userForm.userObj.cityCode === undefined || userForm.userObj.cityCode === null)"
                            icon="mdi-map-marker"
                          />
                        </v-col>
                        <v-col>
                          <branch-selector
                            v-model="userForm.userObj.branchCode"
                            icon="mdi-bank"
                            :city="computedCity"
                            :province="computedProvince"
                            :location-access="userForm.userObj.locationAccess"
                            :is-disabled="(userForm.userObj.role === undefined || userForm.userObj.role === null || userForm.userObj.role === 'ADMIN'|| userForm.userObj.role === 'REPORTER')"
                            :is-show-rules="userForm.userObj.role === 'OPERATOR' && (userForm.userObj.branchCode === undefined || userForm.userObj.branchCode === null)"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                    <v-row
                      v-for="(error, index) in computedErrorsInCreateDialog"
                      :key="index"
                    >
                      <v-col>
                        <v-alert
                          v-model="createUserErrors[index].isShow"
                          dismissible
                          dense
                          type="error"
                          elevation="2"
                          icon="mdi-alert-decagram-outline"
                          @click:close="createUserErrors[index].isShow = false"
                        >
                          {{ error.type }}
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="success"
                      @click="save"
                    >
                      {{ $t('buttons.submit') }}
                    </v-btn>
                    <v-btn
                      color="warning"
                      @click="closeCreateUserDialog"
                    >
                      {{ $t('buttons.cancel') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #[`item.role`]="{ item }">
            {{ $t('user.roles.'+item.role.role) }}
          </template>
          <template #[`item.locationAccess`]="{ item }">
            {{ $t('user.locationAccess.'+ item.locationAccess) }}
          </template>
          <template #[`item.provinceCode`]="{ item }">
            <province-viewer v-model="item.provinceCode" icon="" message="" :condition="'table'" />
          </template>
          <template #[`item.cityCode`]="{ item }">
            <city-viewer v-model="item.cityCode" :province="item.provinceCode" icon="" message="" :condition="'table'" />
          </template>
          <template #[`item.branchCode`]="{ item }">
            <branch-viewer v-model="item.branchCode" icon="" message="" :condition="'table'" />
          </template>
          <template #[`item.status`]="{ item }">
            <span v-if="item.status === 1">
              {{ $t('user.active') }}
            </span>
            <span v-else-if="item.status === 0">
              {{ $t('user.inactive') }}
            </span>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <!--            <v-icon-->
            <!--              small-->
            <!--              class="mr-2"-->
            <!--              :disabled="item.status === 0"-->
            <!--              @click.stop="del(item)"-->
            <!--            >-->
            <!--              mdi-trash-can-->
            <!--            </v-icon>-->
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import UserFilter from '@/components/User/searchFilter'
import userManager from '@/repository/user_manager'
import ProvinceSelector from '@/components/location/provinceSelector.vue'
import CitySelector from '@/components/location/citySelector'
import BranchSelector from '@/components/location/branchSelector'
import provinceViewer from '@/components/location/provinceViewer'
import cityViewer from '@/components/location/cityViewer'
import branchViewer from '@/components/location/branchViewer'

export default {
  components: {
    'user-filter': UserFilter,
    ProvinceSelector,
    CitySelector,
    BranchSelector,
    cityViewer,
    provinceViewer,
    branchViewer
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
          length: 20,
          sort: {
            property: 'status',
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
        { text: this.$t('user.username'), value: 'username' },
        { text: this.$t('user.role'), value: 'role' },
        { text: this.$t('user.locationAccess.title'), value: 'locationAccess' },
        { text: this.$t('user.province'), value: 'provinceCode' },
        { text: this.$t('user.city'), value: 'cityCode' },
        { text: this.$t('user.branch'), value: 'branchCode' },
        { text: this.$t('headers.status'), value: 'status' },
        { text: '', value: 'actions', sortable: false }
      ],
      users: [],
      createUserErrors: []
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'user/me'
    }),
    computedProvince: function () {
      if (this.userForm.userObj.provinceCode) {
        return this.userForm.userObj.provinceCode
      } else {
        return this.loggedInUser.provinceCode
      }
    },
    computedCity: function () {
      if (this.userForm.userObj.cityCode) {
        return this.userForm.userObj.cityCode
      } else {
        return this.loggedInUser.cityCode
      }
    },
    computedLocationAccess: function () {
      if (this.userForm.userObj.role === 'ADMIN' || this.userForm.userObj.role === 'REPORTER') {
        return this.userForm.locationAccess.filter(e => e.value === 'UNIVERSAL' || e.value === 'PROVINCE')
      } else if (this.userForm.userObj.role === 'OPERATOR') {
        const tmp = this.userForm.locationAccess.filter(e => e.value === 'BRANCH')
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.userForm.userObj.locationAccess = tmp[0].value
        return tmp
      }
      return []
    },
    computedUserAccessList: function () {
      if (this.userForm.userObj.role === 'OPERATOR') {
        const temp = this.userForm.permissions.filter(e => e.value === 'EXPORT_OPENED_DEPOSIT_FILE')
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.userForm.userObj.userAccessList = [temp[0].value]
        return temp
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.userForm.userObj.userAccessList = []
        return this.userForm.permissions
      }
    },
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
    // async pagination () {
    //   await this.search(this.requestObject)
    // },
    clearAllDataInForm () {
      delete this.userForm.userObj.locationAccess
      delete this.userForm.userObj.userAccessList
      delete this.userForm.userObj.provinceCode
      delete this.userForm.userObj.cityCode
      delete this.userForm.userObj.branchCode
      this.resetValidation()
    },
    async search (searchModel) {
      // searchModel.page = this.pagination.page
      // searchModel.length = this.pagination.rowsPerPage
      this.loading = true
      try {
        const response = await userManager.getUserList(searchModel, this.$axios)
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
              // this.alert({
              //   color: 'orange',
              //   content: e.response.data.error_message
              // })
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
              // this.alert({
              //   color: 'orange',
              //   content: e.response.data.error_message
              // })
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
