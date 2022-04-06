<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <chargeReportFilter v-model="searchModel" @search="search" />
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
          :server-items-length="totalNumberOfItems"
        >
          <template #top>
            <v-dialog
              v-model="createDialog"
              max-width="640"
              persistent
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
                  {{ $t('report.download') }}
                </v-btn>
              </template>
              <v-card
                :loading="loading"
              >
                <v-card-title class="lightGreen black--text font-weight-bold headline">
                  {{ $t('user.createDialog') }}
                </v-card-title>
                <v-container>
                  <v-form
                    ref="form"
                  >
                    <v-row>
                      <v-data-table
                        dense
                        item-key="cardOwnerId"
                        sort-by="cardOwnerId"
                        :items="items1"
                        :headers="headers2"
                        class="elevation-5 fullScreen"
                        :loading="loading"
                        :hide-default-footer="true"
                        :items-per-page.sync="searchModel.paginate.length"
                        :server-items-length="totalNumberOfItems"
                      />
                    </v-row>
                    <v-row>
                      <v-data-table
                        dense
                        item-key="cardOwnerId"
                        sort-by="cardOwnerId"
                        :items="items1"
                        :headers="headers2"
                        :hide-default-footer="true"
                        class="elevation-5 fullScreen"
                        :loading="loading"
                        :items-per-page.sync="searchModel.paginate.length"
                        :server-items-length="totalNumberOfItems"
                      />
                    </v-row>
                  </v-form>
                </v-container>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="success"
                    @click="save"
                  >
                    {{ $t('global.submit') }}
                  </v-btn>
                  <v-btn
                    color="orange"
                    @click="cancel"
                  >
                    {{ $t('global.cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

          <!--   <template #[`item.source`]="{ item }">
            {{ $t('report.transactionReport.status.' + item.source) }}
          </template>-->

          <!--   <template #[`item.platform`]="{ item }">
            &lt;!&ndash;            {{ item }}&ndash;&gt;
            {{ test(item.platform) }}
            &lt;!&ndash;            {{ $t('report.transactionReport.platform.' + item.platform) }}&ndash;&gt;
          </template>-->
          <!-- <template #[`item.operationDate`]="{ item }">
            {{ moment(item.operationDate) }}
          </template>-->
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import chargeReportFilter from '~/components/chargeReportFilter'
import reportManager from '~/repository/report_manager'

export default {
  name: 'OperatorReport',
  components: {
    chargeReportFilter
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
        { text: this.$t('report.transactionReport.headers.transactionId'), value: 'id', sortable: false },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'trackerId', sortable: false },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'phoneNumber', sortable: false },
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'source', sortable: false },
        { text: this.$t('report.transactionReport.headers.chargeType'), value: 'chargeType', sortable: false },
        { text: this.$t('report.transactionReport.headers.operator'), value: 'operator', sortable: false },
        { text: this.$t('report.transactionReport.headers.sellTime'), value: 'requestTime', sortable: false },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'errorCode', sortable: false }],

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
    search (searchModel) {
      this.loading = true
      reportManager.chargeList(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
        console.log(this.items)
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
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
    downloadReports (searchModel) {
      this.downloadLoading = true
      delete searchModel.paginate
      reportManager.downloadOperatorActivity(searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'operator-reports.xlsx')
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
    test (platform) {
      console.log(platform)
    },
    moment (date) {
      return momentJalali(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
