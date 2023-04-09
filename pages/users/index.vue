<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <user-filter v-model="searchModel" @search="search" />
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
          :items-per-page.sync="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :server-items-length="totalNumberOfItems"
          :footer-props="{
            'items-per-page-options': [50, 100, 200, 500, 1000]
          }"
          @update:page="paginate"
          @update:items-per-page="paginate"
        >
          <!-- دیالوگ ایجاد کاربر جدید یا ویرایش یک کاربر -->
          <!-- دیالوگ ایجاد کاربر جدید یا ویرایش یک کاربر -->
          <!-- دیالوگ ایجاد کاربر جدید یا ویرایش یک کاربر -->
          <template #top>
            <v-toolbar
              class="black--text"
              color="lightGreen"
              flat
              dense
            >
              <v-dialog
                v-model="createDialog"
                max-width="640"
                persistent
                transition="dialog-bottom-transition"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="orange"
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
                  <v-card-title class="lightGreen black--text font-weight-bold headline">
                    {{ $t('user.createUserDialog') }}
                  </v-card-title>
                  <v-container>
                    <v-form
                      ref="form"
                    >
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="userForm.userObj.username"
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
                            prepend-icon="mdi-lock"
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
                            prepend-icon="mdi-lock"
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
                        <v-col cols="6">
                          <v-select
                            v-model="userForm.userObj.role"
                            prepend-icon="mdi-account-lock"
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
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="userForm.userObj.userAccessList"
                            prepend-icon="mdi-folder-lock"
                            :items="computedUserAccessList"
                            :item-text="(item) => $t(item.text)"
                            item-value="value"
                            :label="$t('user.permission')"
                            outlined
                            dense
                            required
                            clearable
                            multiple
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
                      color="orange"
                      @click="cancel"
                    >
                      {{ $t('buttons.cancel') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <!-- سایر تغییرات برای ستون های جدول -->
          <!-- سایر تغییرات برای ستون های جدول -->
          <!-- سایر تغییرات برای ستون های جدول -->

          <template #[`item.role`]="{ item }">
            <v-chip>{{ $t('user.roles.'+ item.role.role) }}</v-chip>
          </template>

          <template #[`item.permissions`]="{ item }">
            <span v-if="item.permissions.length > 0">
              <span
                v-for="(data, index) in item.permissions"
                :key="index"
              >
                {{ $t('user.permissions.'+ data.name) }}
                <br>
              </span>
            </span>
            <span v-else />
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

          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import UserFilter from '~/components/User/searchFilter'
import userManager from '~/repository/user_manager'
import provinceViewer from '~/components/location/provinceViewer'
import branchViewer from '~/components/location/branchViewer'

export default {
  components: {
    'user-filter': UserFilter,
    provinceViewer,
    branchViewer
  },
  data: function () {
    return {
      roles: userManager.userRoles,

      pagination: {
        rowsPerPage: 10,
        page: 1,
        totalItems: 0
      },
      totalNumberOfItems: 0,
      searchModel: {
        page: 1,
        length: 10
      },
      loading: false,
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
        { text: this.$t('user.username'), value: 'username', sortable: false },
        { text: this.$t('user.role'), value: 'role', sortable: false },
        { text: this.$t('user.permission'), value: 'permissions' },
        { text: this.$t('user.statusHeader'), value: 'status', sortable: false },
        { text: this.$t('user.edit'), value: 'actions', sortable: false, align: 'center' }
      ],
      users: []

    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    }),
    computedUserAccessList: function () {
      if (this.userForm.userObj.role !== 'ROLE_PANEL_ADMIN') {
        return this.userForm.permissions.filter(e => e.value !== 'FULL_ACCESS')
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.userForm.userObj.userAccessList = []
        return this.userForm.permissions
      }
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
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    clearAllDataInForm () {
      delete this.userForm.userObj.userAccessList
      this.resetValidation()
    },
    paginate () {
      this.search(this.searchModel)
    },
    search (searchModel) {
      searchModel.page = this.pagination.page
      searchModel.length = this.pagination.rowsPerPage
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
            }).catch((e) => {
              this.alert({
                color: 'error',
                content: 'messages.failed'
              })
              // this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          } else {
            userManager.createUser(this.userForm.userObj, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.search(this.searchModel)
            }).catch((e) => {
              this.alert({
                color: 'error',
                content: 'messages.failed'
              })
              // this.showErrorsInCreateUserDialog(e.response.data.detailList)
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
      console.log('editItem -> ', JSON.stringify(item))
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
