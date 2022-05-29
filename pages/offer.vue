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
          :items="offers"
          :headers="headers"
          class="elevation-5 fullScreen"
          :loading="loading"
          dense
          :footer-props="{
            'items-per-page-options': [50, 100, 200, 400, 500]
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
                max-width="1000"
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
                        <v-col cols="3">
                          <v-text-field
                            v-model="offerForm.offerObj.title"
                            prepend-icon="mdi-account"
                            :counter="16"
                            :label="$t('offer.title')"
                            outlined
                            dense
                            required
                          />
                        </v-col>
                        <v-col cols="3">
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
                        <v-col cols="3">
                          <v-text-field
                            v-model="offerForm.offerObj.url"
                            :label="$t('offer.url')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="offerForm.offerObj.type"
                            :items="offerTypDisplayItem"
                            item-value="value"
                            :item-text="(item)=>(item.text)"
                            :return-object="false"
                            :label="$t('offer.type')"
                            prepend-icon="mdi-clipboard-list"
                            dense
                            clearable
                            outlined
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <v-text-field
                            id="createFromDate"
                            v-model="from"
                            prepend-icon="mdi-calendar-month"
                            outlined
                            dense
                            :placeholder="$t('filters.fromDate')"
                          />
                          <p-date-picker
                            v-model="from"
                            type="datetime"
                            element="createFromDate"
                            color="dimgray"
                            dense
                            outlined
                            popove
                            format="HH:mm jYYYY/jMM/jDD"
                            @close="checkIsNullFromDate()"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            id="createToDate"
                            v-model="to"
                            prepend-icon="mdi-calendar-month"
                            outlined
                            dense
                            :placeholder="$t('filters.toDate')"
                          />
                          <p-date-picker
                            v-model="to"
                            type="datetime"
                            element="createToDate"
                            color="dimgray"
                            dense
                            outlined
                            popove
                            format="HH:mm jYYYY/jMM/jDD"
                            @close="checkIsNullToDate()"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="offerForm.offerObj.alternativeUrl"
                            :label="$t('offer.alternativeUrl')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="offerForm.offerObj.to"
                            :items="offerToTypeItem"
                            item-value="value"
                            :item-text="(item)=>$t(item.text)"
                            :return-object="false"
                            :label="$t('offer.to')"
                            prepend-icon="mdi-clipboard-list"
                            dense
                            clearable
                            outlined
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <v-text-field
                            v-model="offerForm.offerObj.uri"
                            :label="$t('offer.uri')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="offerForm.offerObj.offerType"
                            :items="offerType"
                            item-value="value"
                            :item-text="(item)=>$t(item.text)"
                            :return-object="false"
                            :label="$t('offer.offerType')"
                            prepend-icon="mdi-clipboard-list"
                            dense
                            clearable
                            outlined
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-file-input
                            v-model="offerForm.offerObj.file"
                            show-size
                            outlined
                            dense
                            :rules="[
                              v => !!v || $t('user.validation.required')

                            ]"
                            validate-on-blur
                            label="File input"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <v-textarea
                            v-model="offerForm.offerObj.description"
                            :label="$t('offer.description')"
                            prepend-icon="mdi-account"
                            outlined
                            full-width
                            height="80"
                            dense
                          />
                        </v-col>
                        <v-col cols="1">
                          <v-checkbox
                            v-model="checkbox1"
                            dense
                            :label="`  غعال`"
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
                      @click="closeCreateOfferDialog"
                    >
                      {{ $t('buttons.cancel') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="createParamDialog"
                persistent
                max-width="860"
                transition="dialog-bottom-transition"
              >
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
                            v-model="offerForm.paramObj.key"
                            :label="$t('offer.key')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="offerForm.paramObj.value"
                            :label="$t('offer.value')"
                            prepend-icon="mdi-account"
                            outlined
                            dense
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="success"
                      @click="saveParam"
                    >
                      {{ $t('buttons.submit') }}
                    </v-btn>
                    <v-btn
                      color="warning"
                      @click="closeCreateParamDialog"
                    >
                      {{ $t('buttons.cancel') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-data-table
                  item-key="username"
                  sort-by="username"
                  :items="params"
                  :headers="headersParam"
                  class="elevation-5 fullScreen"
                  :loading="loading"
                  dense
                  :footer-props="{
                    'items-per-page-options': [10, 20, 30, 40, 50]
                  }"
                  :items-per-page.sync="paramObject.paginate.length"
                  :page.sync="paramObject.paginate.page"
                  :server-items-length="totalNumberOfItems"
                  @update:page="searchParams (paramObject)"
                  @update:items-per-page="searchParams (paramObject)"
                />
              </v-dialog>
            </v-toolbar>
          </template>

          <template #[`item.addParams`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="addParams(item)"
            >
              mdi-pencil
            </v-icon>
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

          <template #[`item.dateFrom`]="{ item }">
            {{ convertToJalali(item.dateFrom) }}
          </template>
          <template #[`item.dateTo`]="{ item }">
            {{ convertToJalali(item.dateTo) }}
          </template>
          <template #[`item.os`]="{ item }">
            {{ $t('offer.toTypeFilter.' + item.os) }}
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('offer.offerStatusFilter.' + item.status) }}
          </template>
          <template #[`item.type`]="{ item }">
            {{ $t('offer.offerTypeFilter.' + item.type) }}
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
import moment from 'moment-jalaali'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import OfferFilter from '~/components/OfferFilter'
import reportManager from '~/repository/report_manager'
import userManager from '~/repository/user_manager'
export default {
  components: {
    'offer-filter': OfferFilter,
    PDatePicker: VuePersianDatetimePicker
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
      file: '',
      checkbox1: true,
      from: this.currentDayFrom(),
      to: this.currentDayTo(),
      offerType: reportManager.offerType,
      offerToTypeItem: reportManager.offerToType,
      offerTypDisplayItem: reportManager.offerTypDisplay,
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
      paramObject: {
        id: null,
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'id'
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
        },
        paramObj: {
        }
      },
      createDialog: false,
      createParamDialog: false,
      deleteUserDialog: false,
      headers: [
        { text: this.$t('offer.title'), value: 'title' },
        { text: this.$t('offer.widgetTitle'), value: 'widgetTitle' },
        { text: this.$t('offer.active'), value: 'status' },
        { text: this.$t('offer.description'), value: 'content' },
        { text: this.$t('offer.url'), value: 'url' },
        { text: this.$t('offer.alternativeUrl'), value: 'alternativeUrl' },
        { text: this.$t('offer.uri'), value: 'uri' },
        { text: this.$t('offer.type'), value: 'type' },
        { text: this.$t('offer.to'), value: 'os' },
        { text: this.$t('offer.dateFrom'), value: 'dateFrom' },
        { text: this.$t('offer.dateTo'), value: 'dateTo' },
        { text: this.$t('offer.addParams'), value: 'addParams', sortable: false },
        { text: '', value: 'actions', sortable: false }
      ],
      headersParam: [
        { text: this.$t('offer.key'), value: 'key' },
        { text: this.$t('offer.value'), value: 'value' }
      ],
      offers: [],
      params: [],
      createUserErrors: []
    }
  },
  mounted: function () {
    console.log('mount')
    this.offerForm.offerObj.dateFrom = this.convertJalaliDateToTimestamp(this.from)
    this.offerForm.offerObj.dateTo = this.convertJalaliDateToTimestamp(this.to)
    console.log(this.offerForm)
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'user/me'
    }),
    computedErrorsInCreateDialog: function () {
      if (this.createUserErrors !== undefined && this.createUserErrors !== null && this.createUserErrors.length !== 0) {
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
      console.log('searchModel')
      console.log(searchModel)
      this.loading = true
      try {
        const response = await reportManager.listOffer(searchModel, this.$axios)
        this.offers = response.data.itemList
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
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    async searchParams (searchModel) {
      // searchModel.page = this.pagination.page
      // searchModel.length = this.pagination.rowsPerPage
      this.loading = true
      try {
        const response = await reportManager.listParam(searchModel, this.$axios)
        this.params = response.data.itemList
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
    addParams (item) {
      console.log(item)
      this.offerForm.paramObj = {
        id: item.id
      }
      this.createParamDialog = true
    },
    editItem (item) {
      console.log(item)
      this.offerForm.offerObj = {
        id: item.id,
        title: item.title,
        widgetTitle: item.widgetTitle,
        url: item.url,
        alternativeUrl: item.alternativeUrl,
        dateFrom: item.dateFrom,
        dateTo: item.dateTo,
        uri: item.uri,
        type: item.type,
        offerType: item.type,
        description: item.description,
        to: item.to,
        file: item.file
      }
      this.createDialog = true
      this.isShowTitleOfEditDialog = true
    },
    checkIsNullFromDate () {
      console.log('checkIsNullFromDate')
      if (this.from != null) {
        console.log('checkIsNullFromDate')
        this.offerForm.offerObj.dateFrom = this.convertJalaliDateToTimestamp(this.from)
        console.log('checkIsNullFromDate')
      }
      console.log('checkIsNullFromDate')
    },
    checkIsNullToDate () {
      console.log('checkIsNullToDate')
      if (this.to != null) {
        console.log('checkIsNullToDate is')
        this.offerForm.offerObj.dateTo = this.convertJalaliDateToTimestamp(this.to)
      }
      console.log('checkIsNullToDate is 2')
    },
    showErrorsInCreateUserDialog (errors) {
      this.loading = false
      this.createUserErrors = errors
    },
    save () {
      const formData = new FormData()
      console.log('formData')
      console.log(this.offerForm.offerObj)
      formData.append('file', this.offerForm.offerObj.file)
      formData.append('title', this.offerForm.offerObj.title)
      formData.append('description', this.offerForm.offerObj.description)
      formData.append('url', this.offerForm.offerObj.url)
      formData.append('alternativeUrl', this.offerForm.offerObj.alternativeUrl)
      formData.append('uri', this.offerForm.offerObj.uri)
      formData.append('dateFromStr', this.offerForm.offerObj.dateFrom)
      formData.append('dateToStr', this.offerForm.offerObj.dateTo)
      formData.append('type', this.offerForm.offerObj.type)
      formData.append('offerType', this.offerForm.offerObj.offerType)
      formData.append('widgetTitle', this.offerForm.offerObj.widgetTitle)
      formData.append('status', this.checkbox1)

      if (this.validate()) {
        this.loading = true
        try {
          console.log(this.offerForm)
          if (this.offerForm.offerObj.id) {
            formData.append('id', this.offerForm.offerObj.id)
            console.log('update')
            reportManager.updateUploadOffer(formData, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.loading = false
              this.closeCreateUserDialog()
              this.search(this.requestObject)
            }).catch((e) => {
              console.log(e)
              console.log('error')
              this.loading = false
              this.alert({
                color: 'orange',
                content: e.response.data.error_message
              })
              this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          } else {
            reportManager.uploadOffer(formData, this.$axios).then(() => {
              /*     this.alert({
                color: 'success',
                content: 'messages.successful'
              }) */
              this.loading = false
              this.closeCreateUserDialog()
              this.search(this.requestObject)
              console.log('error')
            }).catch((e) => {
              console.log('error1')
              this.loading = false
              /*      this.alert({
                color: 'orange',
                content: e.response.data.error_message
              }) */
              this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          }
        } catch (e) {
          this.loading = false
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
            .finally(() => {
              this.loading = false
            })
        }
      }
    },
    saveParam () {
      if (this.validate()) {
        this.loading = true
        this.paramObject.id = this.offerForm.paramObj.id
        this.searchParams(this.paramObject)
        try {
          // if (this.offerForm.paramObj.id) {
          console.log('update')
          console.log(this.offerForm.paramObj)
          reportManager.addParams(this.offerForm.paramObj, this.$axios).then(() => {
            this.alert({
              color: 'success',
              content: 'messages.successful'
            })
            this.closeCreateParamDialog()
            this.paramObject.id = this.offerForm.paramObj.id
            this.searchParams(this.paramObject)
            console.log('error1')
          }).catch((e) => {
            console.log('error')
            this.alert({
              color: 'orange',
              content: e.response.data.error_message
            })
            this.showErrorsInCreateUserDialog(e.response.data.detailList)
          })
        //  }
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      }
    },
    closeCreateUserDialog () {
    /*  this.loading = false
      this.offerForm.offerObj = {}
      this.reset()
      this.resetValidation() */
      this.createDialog = false
      /* if (this.isShowTitleOfEditDialog) {
        this.isShowTitleOfEditDialog = false
      } */
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
    closeCreateOfferDialog () {
      this.loading = false
      this.offerForm.offerObj = {}
      // this.reset()
      // this.resetValidation()
      this.createDialog = false
      this.createUserErrors = null
    /*  if (this.isShowTitleOfEditDialog) {
        this.isShowTitleOfEditDialog = false
      } */
    },
    closeCreateParamDialog () {
      this.loading = false
      this.offerForm.offerObj = {}
      this.reset()
      this.resetValidation()
      this.createUserErrors = null
      /*  if (this.isShowTitleOfEditDialog) {
          this.isShowTitleOfEditDialog = false
        } */
    },
    validate () {
      console.log('validate')
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
      return '00:00 ' + year + '/' + month + '/' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')

      return '23:59 ' + year + '/' + month + '/' + day
    },
    convertJalaliDateToTimestamp (date) {
      console.log(date)
      const year = moment(date, 'HH:mm jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'HH:mm jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'HH:mm jYYYY/jMM/jDD').format('DD')
      const hour = moment(date, 'HH:mm jYYYY/jMM/jDD').format('HH')
      const minute = moment(date, 'HH:mm jYYYY/jMM/jDD').format('mm')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, 0)
      const d = new Date(gmtDate)
      //  console.log(d.getTime() + (d.getTimezoneOffset() * 60000))
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
