<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <user-filter v-model="searchModel" @search="search" />
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
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search (searchModel)"
          @update:items-per-page="search (searchModel)"
        >
          <template #[`item.role`]="{ item }">
            <v-chip>{{ $t('user.roles.'+ item.role.role) }}</v-chip>
          </template>

          <template #[`item.permissions`]="{ item }">
            <ul v-if="item.permissions.length > 0">
              <li v-for="(data, index) in item.permissions" :key="index">
                {{ $t('user.permissions.' + data.name) }}
              </li>
            </ul>
            <span v-else style="color: #444">{{ "-" }}</span>
          </template>

          <template #[`item.provinceCode`]="{ item }">
            <province-viewer v-model="item.provinceCode" icon="" message="" :condition="'table'" />
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

          <!-- گزینه ویرایش و حذف و ... -->
          <!-- گزینه ویرایش و حذف و ... -->
          <!-- گزینه ویرایش و حذف و ... -->
          <template v-if="checkPermissionBtn()" #[`item.actions`]="{ item }">
            <center>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    v-bind="attrs"
                    style="background: rgba(132, 189, 0, 0.1);border-radius: 8px;height: 40px;width:40px;box-shadow: unset;min-width: 5px !important;"
                    color="#84BD00"
                    @click="editItem(item)"
                    v-on="on"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 12C13.3261 12 14.5979 11.4732 15.5355 10.5355C16.4732 9.59785 17 8.32608 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7C7 8.32608 7.52678 9.59785 8.46447 10.5355C9.40215 11.4732 10.6739 12 12 12Z"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.2091 15.74L15.6691 19.28C15.5291 19.42 15.3991 19.68 15.3691 19.87L15.1791 21.22C15.1091 21.71 15.4491 22.05 15.9391 21.98L17.2891 21.79C17.4791 21.76 17.7491 21.63 17.8791 21.49L21.4191 17.95C22.0291 17.34 22.3191 16.63 21.4191 15.73C20.5291 14.84 19.8191 15.13 19.2091 15.74Z"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.6992 16.25C18.9992 17.33 19.8392 18.17 20.9192 18.47"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.41016 22C3.41016 18.13 7.26016 15 12.0002 15C13.0402 15 14.0402 15.15 14.9702 15.43"
                        stroke="#84BD00"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </v-btn>
                </template>
                <span>ویرایش کاربر</span>
              </v-tooltip>
            </center>
          </template>

          <!-- گزینه کاربر جدید + دیالوگ باکس کاربر جدید -->
          <!-- گزینه کاربر جدید + دیالوگ باکس کاربر جدید -->
          <!-- گزینه کاربر جدید + دیالوگ باکس کاربر جدید -->
          <template #top>
            <v-dialog
              v-model="createDialog"
              persistent
              max-width="70%"
              transition="dialog-bottom-transition"
            >
              <!-- btn new user | edit user -->
              <template v-if="checkPermissionBtn()" #activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  class="mb-2"
                  v-bind="attrs"
                  small
                  style="background: #FB8500;border-radius: 8px;font-size: 14px !important;height: 36px;position: absolute;left: 2%;margin-top: 9px;"
                  v-on="on"
                >
                  کاربر جدید
                  <svg
                    style="margin-right: 5px"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.27344 14.6667C2.27344 12.0867 4.8401 10 8.0001 10C8.6401 10 9.2601 10.0867 9.8401 10.2467M8.0001 8.00004C8.88416 8.00004 9.73201 7.64885 10.3571 7.02373C10.9822 6.39861 11.3334 5.55076 11.3334 4.66671C11.3334 3.78265 10.9822 2.93481 10.3571 2.30968C9.73201 1.68456 8.88416 1.33337 8.0001 1.33337C7.11605 1.33337 6.2682 1.68456 5.64308 2.30968C5.01796 2.93481 4.66677 3.78265 4.66677 4.66671C4.66677 5.55076 5.01796 6.39861 5.64308 7.02373C6.2682 7.64885 7.11605 8.00004 8.0001 8.00004Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.993 11.9867H11.0063M11.9997 11.0134V13.0067M14.6663 12C14.6663 12.2134 14.6397 12.42 14.5863 12.62C14.5263 12.8867 14.4197 13.1467 14.2797 13.3734C14.0447 13.7684 13.7108 14.0954 13.311 14.3221C12.9113 14.5489 12.4593 14.6677 11.9997 14.6667C11.3433 14.6686 10.7103 14.4235 10.2263 13.98C10.0263 13.8067 9.85301 13.6 9.71968 13.3734C9.46591 12.9603 9.33203 12.4848 9.33301 12C9.33257 11.6497 9.40125 11.3028 9.53511 10.979C9.66896 10.6553 9.86537 10.3612 10.1131 10.1134C10.3608 9.86574 10.6549 9.66933 10.9787 9.53547C11.3024 9.40161 11.6494 9.33294 11.9997 9.33338C12.7863 9.33338 13.4997 9.67338 13.9797 10.22C14.4063 10.6934 14.6663 11.32 14.6663 12Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </v-btn>
              </template>

              <v-card
                :loading="loading"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                  @click="createDialog = false"
                >
                  <g clip-path="url(#clip0_401_143)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_143">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <v-card-title
                  v-if="!isShowTitleOfEditDialog"
                  primary-title
                  class=" font-weight-bold text-h5"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ 'ایجاد کاربر جدید' }}
                </v-card-title>
                <v-card-title
                  v-if="isShowTitleOfEditDialog"
                  primary-title
                  class=" font-weight-bold text-h5"
                  style="border-bottom: 1px solid #D8D8D8;"
                >
                  {{ 'ویرایش کاربر' }}
                </v-card-title>
                <v-spacer class="mb-3" />

                <!--body dialog -->
                <!--body dialog -->
                <!--body dialog -->
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-row no-gutters>
                      <v-col style="width:20%; ">
                        <v-text-field
                          v-model="userForm.userObj.username"
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
                      <v-col style="width:20%; ">
                        <v-text-field
                          v-if="!userForm.userObj.id"
                          v-model="userForm.userObj.password"
                          :counter="16"
                          :label="$t('user.password')"
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
                          :label="$t('user.password')"
                          :type="userForm.showPassword ? 'text' : 'Password'"
                          :append-icon="userForm.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          outlined
                          dense
                          @click:append="userForm.showPassword = !userForm.showPassword"
                        />
                      </v-col>
                      <v-col style="width:20%; ">
                        <v-select
                          v-model="userForm.userObj.role"
                          :items="roles"
                          :item-text="(item) => $t(item.text)"
                          :rules="[ v => !!v || $t('user.validation.required') ]"
                          item-value="value"
                          :label="$t('user.role')"
                          outlined
                          dense
                          required
                          clearable
                          @change="clearAllDataInForm()"
                        >
                          <template #append>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                                stroke="#84BD00"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col style="width:20%; ">
                        <v-select
                          v-model="userForm.userObj.userAccessList"
                          :items="computedUserAccessList"
                          :item-text="(item) => $t(item.text)"
                          item-value="value"
                          :label="$t('user.permission')"
                          outlined
                          dense
                          required
                          multiple
                        >
                          <template #selection="{ item, index }">
                            <span v-if="index === 0" style="font-size: 14px;">
                              <span>{{ $t(item.text) }}</span>
                            </span>
                            <span
                              v-if="index === 1"
                              class="blue--text text-caption"
                              style="margin-right: 10px"
                            >
                              (+{{ userForm.userObj.userAccessList.length - 1 }})
                            </span>
                          </template>

                          <template #append>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                                stroke="#84BD00"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </template>
                        </v-select>
                      </v-col>

                      <v-col style="width:20%; direction:ltr">
                        <v-btn
                          v-if="!isShowTitleOfEditDialog"
                          :loading="loadingBtnInsert"
                          :disabled="loadingBtnInsert"
                          color="#84BD00"
                          class="btnSave"
                          @click="save()"
                        >
                          {{ $t('buttons.submit') }}
                        </v-btn>
                        <v-btn
                          v-if="isShowTitleOfEditDialog"
                          :loading="loadingBtnInsert"
                          :disabled="loadingBtnInsert"
                          color="#84BD00"
                          class="btnSave"
                          @click="save()"
                        >
                          {{ $t('buttons.edit') }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>

                  <!-- show error server -->
                  <!-- show error server -->
                  <!-- show error server -->
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
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import UserFilter from '~/components/User/searchFilter'
import userManager from '~/repository/user_manager'
import provinceViewer from '~/components/location/provinceViewer'
import branchViewer from '~/components/location/branchViewer'

export default {
  name: 'UserPage',
  components: {
    'user-filter': UserFilter,
    provinceViewer,
    branchViewer
  },
  data: function () {
    return {
      roles: userManager.userRoles,
      isShowTitleOfEditDialog: false,
      totalNumberOfItems: 0,
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
      loading: false,
      loadingBtnInsert: false,
      userForm: {
        permissions: userManager.userPermissions,
        showPassword: false,
        userObj: {
          userAccessList: []
        }
      },
      createDialog: false,
      deleteUserDialog: false,
      headers: [
        { text: '', value: '', sortable: false, align: 'center', width: '5%' },
        { text: this.$t('user.username'), value: 'username', sortable: false, align: 'right', width: '20%' },
        { text: this.$t('user.role'), value: 'role', sortable: false, align: 'right', width: '20%' },
        { text: this.$t('user.permission'), value: 'permissions', align: 'right', width: '20%' },
        { text: this.$t('user.statusHeader'), value: 'status', sortable: false, width: '20%' },
        { text: '', value: 'actions', sortable: false, align: 'center', width: '15%' }
      ],
      users: []
    }
  },
  head () {
    return {
      title: 'مدیران سیستم' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    }),
    computedUserAccessList: function () {
      const operationAccess = []

      if (this.userForm.userObj.role === 'ROLE_PANEL_USER') {
        // کارگزار شعبه
        this.userForm.permissions.forEach((e) => {
          if ([
            'OFFER_ACCESS',
            'ADMIN_ACCESS',
            'ACCOUNTING_ACCESS',
            'CREATE_USER',
            'CONFIRM_REFUND'
          ].includes(e.value)) {
            operationAccess.push(e)
          }
        })
      } else if (this.userForm.userObj.role === 'ROLE_PANEL_REPORT') {
        // گزارش گیر
        this.userForm.permissions.forEach((e) => {
          if ([
            'REPORTER_ACCESS'
          ].includes(e.value)) {
            operationAccess.push(e)
          }
        })
      } else {
        // کاربر ادمین - مدیر
        this.userForm.permissions.forEach((e) => {
          if (e.value !== 'REPORTER_ACCESS') {
            operationAccess.push(e)
          }
        })
      }

      return operationAccess
    },
    computedProvince: function () {
      if (this.userForm.userObj.provinceCode) {
        return this.userForm.userObj.provinceCode
      } else {
        return this.currentUser.provinceCode
      }
    },

    computedCity: function () {
      if (this.userForm.userObj.cityCode) {
        return this.userForm.userObj.cityCode
      } else {
        return this.currentUser.cityCode
      }
    }
  },
  mounted () {
    // this.search(this.searchModel, 'mounted')
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    checkPermissionBtn () {
      let outcome = true

      if (this.currentUser.permissions.find(e => e.name !== 'FULL_ACCESS') && this.currentUser.role.role !== 'ROLE_PANEL_ADMIN') {
        if (this.currentUser.permissions.find(e => e.name !== 'CREATE_USER')) {
          outcome = false
        }
      }

      return outcome
    },
    clearAllDataInForm () {
      delete this.userForm.userObj.userAccessList
      this.resetValidation()
    },
    paginate () {
      this.search(this.searchModel)
    },
    search (searchModel) {
      this.loading = true
      userManager.getUserList(searchModel, this.$axios).then((response) => {
        this.users = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
      }).finally(() => {
        this.loading = false
      })
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
    },
    // new Or update users
    save () {
      if (this.validate()) {
        this.loading = true
        try {
          if (this.userForm.userObj.id) {
            userManager.updateUser(this.userForm.userObj, this.userForm.userObj.id, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.search(this.searchModel)
            }).catch((error) => {
              if (error.response) {
                this.alert({
                  content: error.response.data.details.length !== 0 ? error.response.data.details[0].type : error.response.data.errorMessage,
                  color: 'error'
                })
              } else {
                this.alert({
                  color: 'error',
                  content: 'messages.failed'
                })
              }
            })
          } else {
            userManager.createUser(this.userForm.userObj, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.search(this.searchModel)
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
            })
          }
        } catch (e) {
          this.showErrorsInCreateUserDialog(e.response.data.detailList)
        } finally {
          this.cancel()
        }
      }
    },
    showErrorsInCreateUserDialog (errors) {
      this.loading = false
      this.createUserErrors = errors
    },
    editItem (item) {
      const userAccessList = []
      item.permissions.forEach((item) => {
        userAccessList.push(item.name)
      })

      this.userForm.userObj = {
        id: item.id,
        username: item.username,
        password: null,
        provinceCode: item.provinceCode,
        cityCode: item.cityCode,
        branchCode: item.branchCode,
        role: item.role.role,
        userAccessList: userAccessList
      }
      this.createDialog = true
      this.isShowTitleOfEditDialog = true
    },
    del (item) {
      this.deleteUserDialog = true
      this.item = item
    },
    cancel () {
      this.loading = false
      this.userForm.userObj = {}
      this.userForm.userObj.id = null
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

<style scoped>
  /deep/ .theme--light.v-chip:not(.v-chip--active) {
    background: #e0e0e0;
  }
  /deep/ .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 14px;
    height: 32px;
  }
  /deep/ .theme--light.v-chip {
    border-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.87);
  }
  /deep/ .v-chip {
    align-items: center;
    cursor: default;
    display: inline-flex;
    line-height: 20px;
    max-width: 100%;
    outline: none;
    overflow: hidden;
    padding: 0 12px;
    position: relative;
    text-decoration: none;
    transition-duration: 0.28s;
    transition-property: box-shadow, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: middle;
    white-space: nowrap;
  }
</style>
