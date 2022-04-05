<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <offer-filter v-model="requestObject" @search="search" />
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
              class="black--text"
              color="lightGreen"
              flat
              dense
              dark
            >
              <v-dialog
                v-model="createDialog"
                persistent
                max-width="860"
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
                    {{ $t('offer.newOffer') }}
                  </v-btn>
                </template>
                <v-card
                  :loading="loading"
                >
                  <v-card-title v-if="!isShowTitleOfEditDialog" primary-title class="lightGreen font-weight-bold text-h5">
                    {{ $t('offer.dialogTitle') }}
                  </v-card-title>
                  <v-container>
                    <v-form
                      ref="form"
                    >
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.title"
                            :disabled="isShowTitleOfEditDialog"
                            prepend-icon="mdi-account"
                            :counter="16"
                            :label="$t('offer.title')"
                            :rules="[
                              v => !!v || $t('user.validation.required'),
                              v => (v && v.length <= 16 && v.length >= 4) || $t('user.validation.length')
                            ]"
                            outlined
                            dense
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.widgetTitle"
                            :label="$t('offer.widgetTitle')"
                            :counter="16"
                            prepend-icon="mdi-account"
                            required
                            dense
                            outlined
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.url"
                            :label="$t('offer.url')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.alternativeUrl"
                            :label="$t('offer.alternativeUrl')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.dateFrom"
                            :label="$t('offer.dateFrom')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.dateTo"
                            :label="$t('offer.dateTo')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.type"
                            :label="$t('offer.type')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.uri"
                            :label="$t('offer.uri')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.offerType"
                            :label="$t('offer.offerType')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.offerObj.description"
                            :label="$t('offer.description')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-file-input
                          v-model="offerForm.offerObj.file"
                          show-size
                          outlined
                          dense
                          label="File input"
                        />
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
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import OfferFilter from '@/components/OfferFilter'
import reportManager from '@/repository/report_manager'
import userManager from '@/repository/user_manager'

export default {
  components: {
    'offer-filter': OfferFilter
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
      file: '',
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
        userObj: {
          userAccessList: []
        }
      },
      offerForm: {
        offerObj: {
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
      const formData = new FormData()
      formData.append('file', this.offerForm.offerObj.file)
      formData.append('title', this.offerForm.offerObj.title)
      formData.append('description', this.offerForm.offerObj.description)
      formData.append('url', this.offerForm.offerObj.url)
      formData.append('alternativeUrl', this.offerForm.offerObj.alternativeUrl)
      formData.append('uri', this.offerForm.offerObj.uri)
      formData.append('dateFrom', this.offerForm.offerObj.dateFrom)
      formData.append('dateTo', this.offerForm.offerObj.dateTo)
      formData.append('type', this.offerForm.offerObj.type)
      formData.append('offerType', this.offerForm.offerObj.offerType)
      formData.append('widgetTitle', this.offerForm.offerObj.widgetTitle)

      if (this.validate()) {
        this.loading = true
        try {
          reportManager.uploadOffer(formData, this.$axios).then(() => {
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
            //   this.showErrorsInCreateUserDialog(e.response.data.detailList)
          })
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      }
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
