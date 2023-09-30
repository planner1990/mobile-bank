<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <transactionQueryReportFilter
          ref="refTransactionReportFilter"
          v-model="searchModel"
          @okOperationDialog="okOperationDialog"
          @clearOperationDialog="clearOperationDialog"
          @search="search"
          @edit="editItem2()"
          @re_render="re_render()"
          @listItemPreviewSelectedFun="keyTopBar++"
        />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          dense
          item-key="cardOwnerId"
          sort-by="cardOwnerId"
          :items="items"
          :headers="headers"
          class="fullScreen mb-16"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 500, 1000]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search(searchModel)"
          @update:items-per-page="search(searchModel)"
        >
          <template #[`item.sourceNumber`]="{ item }">
            <div v-if="item.sourceNumber">
              {{ item.sourceNumber }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.requestTime`]="{ item }">
            {{ convertToJalali(item.requestTime) }}
          </template>
          <template #[`item.platform`]="{ item }">
            {{ $t('report.transactionReport.platform.' + item.platform) }}
          </template>
          <template #[`item.sourceType`]="{ item }">
            {{ $t('report.transactionReport.source.' + item.sourceType) }}
          </template>
          <template #[`item.cif`]="{ item }">
            <div v-if="item.cif">
              {{ item.cif }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>

          <template #[`item.operation`]="{ item }">
            <div v-if="item.operation">
              {{ item.operation }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>

          <template #[`item.mobileNumber`]="{ item }">
            <div v-if="item.mobileNumber">
              {{ item.mobileNumber }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.amount`]="{ item }">
            <div v-if="item.amount">
              {{ priceFormat(item.amount) }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.responseCode`]="{ item }">
            <div v-if="item.responseCode || item.responseCode === 0" class="chip" :style="'color: ' + getColor(item.responseCode)">
              {{ item.responseCode }}
            </div>
            <div v-else style="color: #444">
              {{ '-' }}
            </div>
          </template>

          <!-- details -->
          <!-- details -->
          <!-- details -->
          <template #[`item.detail`]="{ item }">
            <v-btn
              small
              elevation="0"
              style="color: #84BD00;border-radius: 8px;height: 36px;font-weight: bold;width: 80px;"
              color="rgba(132, 189, 0, 0.1)"
              @click="editItem(item)"
            >
              {{ $t('global.review') }}
            </v-btn>
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

        <!-- Dialog show details request -->
        <!-- Dialog show details request -->
        <!-- Dialog show details request -->
        <v-dialog
          v-model="createDialog"
          max-width="1200"
          transition="dialog-bottom-transition"
        >
          <v-card :loading="loading">
            <!-- title -->
            <!-- title -->
            <!-- title -->
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
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_401_143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
              {{ $t('user.createDialog') }}
            </v-card-title>

            <v-container>
              <v-form
                ref="form"
              >
                <!-- row database -->
                <v-row>
                  <v-data-table
                    id="detailsTableShowDialog"
                    height="20px"
                    dense
                    item-key="cardOwnerId"
                    sort-by="cardOwnerId"
                    :items="itemsTransaction"
                    :headers="headersTransaction"
                    class="fullScreen"
                    :hide-default-footer="true"
                  >
                    <template #[`item.responseTime`]="{ item }">
                      <span>
                        {{ convertToJalali(item.responseTime) }}
                      </span>
                    </template>
                  </v-data-table>
                </v-row>
                <!-- request original details -->
                <v-row>
                  <v-col cols="6">
                    <v-card
                      color="#fff"
                      height="100%"
                    >
                      <v-toolbar
                        class="black--text"
                        color="white"
                        flat
                        dark
                        dense
                        style="border-bottom: 2px solid #D8D8D8 !important;"
                      >
                        {{ $t('report.transactionReport.headers.request') }}
                        <v-spacer />
                      </v-toolbar>
                      <v-card-text dir="ltr" class="text-center">
                        <div style="line-height: 3;">
                          <vue-json-pretty
                            :data="requestJson"
                            show-key-value-space="true"
                            render-node-value="true"
                            render-node-key="true"
                            show-line-number="true"
                            show-double-quotes="true"
                            show-length="true"
                          />
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-flex text-xs-center fill-height>
                      <v-card
                        color="#fff"
                        height="100%"

                        class="justify-center"
                      >
                        <v-toolbar
                          class="black--text"
                          color="white"
                          flat
                          dark
                          dense
                          style="border-bottom: 2px solid #D8D8D8 !important;"
                        >
                          {{ $t('report.transactionReport.headers.response') }}
                          <v-spacer />
                        </v-toolbar>
                        <v-card-text dir="ltr">
                          <div style="line-height: 3;">
                            <vue-json-pretty
                              :data="responseJson"
                              show-key-value-space="true"
                              render-node-value="true"
                              render-node-key="true"
                              show-line-number="true"
                              show-double-quotes="true"
                              show-length="true"
                            />
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- Dialog show selector for operation select عملیات -->
        <!-- Dialog show selector for operation select عملیات -->
        <!-- Dialog show selector for operation select عملیات -->
        <v-dialog
          v-model="operationDialog"
          width="1000"
          transition="dialog-bottom-transition"
        >
          <v-card
            :loading="loading"
          >
            <!-- title -->
            <!-- title -->
            <!-- title -->
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="position: absolute;left: 20px; top: 18px;cursor: pointer"
              @click="closeTransactionDetailsDialog()"
            >
              <g clip-path="url(#clip0_401_143)">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_401_143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <v-card-title class=" black--text font-weight-bold headline" style="border-bottom: 0 solid #D8D8D8;">
              <v-row no-gutters>
                <v-col cols="4">
                  <!-- search box -->
                  <!-- search box -->
                  <!-- search box -->
                  <v-select
                    v-model="search_selectedOperationModel"
                    :items="search_listOperation"
                    :item-value="(item)=>item.url"
                    :item-text="(item)=>item.title"
                    label="جستجو"
                    outlined
                    clearable
                    dense
                    :disabled="!buttonCloseModal"
                    class="mb-4 text-field"
                    @change="changeSelectedSearchOperation()"
                    @click="focusAfterDelay()"
                  >
                    <template #prepend-item>
                      <v-list-item dark>
                        <v-list-item-content dark>
                          <v-text-field
                            :key="keyTab"
                            ref="focus_SearchOperationList"
                            v-model="search_selectedOperationModel_title"
                            placeholder="نام یک عملیات را وارد کنید"
                            @input="call_SearchOperationList"
                          />
                        </v-list-item-content>
                      </v-list-item>
                    </template>

                    <template #append>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1654 20.1667L18.332 18.3334M10.5404 19.25C11.684 19.25 12.8164 19.0248 13.8729 18.5872C14.9294 18.1495 15.8894 17.5081 16.6981 16.6994C17.5067 15.8908 18.1482 14.9308 18.5858 13.8742C19.0235 12.8177 19.2487 11.6853 19.2487 10.5417C19.2487 9.39811 19.0235 8.26572 18.5858 7.20917C18.1482 6.15263 17.5067 5.19263 16.6981 4.38399C15.8894 3.57534 14.9294 2.93389 13.8729 2.49626C12.8164 2.05862 11.684 1.83337 10.5404 1.83337C8.23077 1.83337 6.01577 2.75086 4.38264 4.38399C2.74951 6.01712 1.83203 8.23211 1.83203 10.5417C1.83203 12.8513 2.74951 15.0663 4.38264 16.6994C6.01577 18.3326 8.23077 19.25 10.5404 19.25Z" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="1" />
                <v-col v-if="showTopBar" :key="keyTopBar" cols="7" style="color: #aaa;font-size: 12px;line-height: 16px;max-height: 60px;overflow-y: scroll;direction: ltr;text-align: right;">
                  <div v-for="(x, key) in listItemPreviewSelectedFun()" :key="key">
                    {{ x }}
                  </div>
                </v-col>
              </v-row>
            </v-card-title>

            <v-container>
              <v-form
                ref="form"
              >
                <v-card color="">
                  <v-row>
                    <v-tabs
                      v-model="tabsModel"
                      align-with-title
                      color="success"
                      grow
                    >
                      <v-tab href="#depositOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.depositOperation') }}
                      </v-tab>
                      <v-tab-item value="depositOperation">
                        <deposit-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#cardOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.cardOperation') }}
                      </v-tab>
                      <v-tab-item value="cardOperation">
                        <card-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#userOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.userOperation') }}
                      </v-tab>
                      <v-tab-item value="userOperation">
                        <user-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#publicOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.publicOperation') }}
                      </v-tab>
                      <v-tab-item value="publicOperation">
                        <public-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#cardReissueOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.cardReissueOperation') }}
                      </v-tab>
                      <v-tab-item value="cardReissueOperation">
                        <card-reissue-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#loanRequestOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.loanRequestOperation') }}
                      </v-tab>
                      <v-tab-item value="loanRequestOperation">
                        <loan-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#onlineDepositOperation" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.onlineDepositOperation') }}
                      </v-tab>
                      <v-tab-item value="onlineDepositOperation">
                        <online-deposit-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <v-tab href="#pichackOperations" class="font-weight-black" @click="re_render()">
                        {{ $t('report.transactionReport.headers.pichackOperation') }}
                      </v-tab>
                      <v-tab-item value="pichackOperations">
                        <pichack-operations :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />
                      </v-tab-item>

                      <!--                      <v-tab href="#bankLoanOperationList" class="font-weight-black" @click="re_render()">-->
                      <!--                        {{ $t('report.transactionReport.headers.bankLoanOperationList') }}-->
                      <!--                      </v-tab>-->
                      <!--                      <v-tab-item value="bankLoanOperationList">-->
                      <!--                        <br>-->
                      <!--                        <bankLoanOperationList :key="keyTab" :list-type="listType" @okOperationDialog="okOperationDialog()" @changeLabelSelectOperation="changeLabelSelectOperation" @refreshLabelTopBar="keyTopBar++" />-->
                      <!--                      </v-tab-item>-->
                    </v-tabs>
                  </v-row>
                </v-card>
              </v-form>
            </v-container>

            <v-card-actions>
              <v-spacer />
              <v-btn
                small
                elevation="0"
                color="rgb(132, 189, 0)"
                style="left: 5px;cursor: pointer;color: #fff;border-radius: 8px;height: 46px;font-weight: bold;width: 136px;font-size: 16px;"
                @click="okOperationDialog()"
              >
                {{ "انتخاب عملیات" }}
              </v-btn>
              <v-btn
                small
                elevation="0"
                color="rgb(26 31 52 / 10%)"
                style="background-color: rgba(26, 31, 52, 0.1);border-color: rgba(26, 31, 52, 0.1);position: absolute;left: 62px;cursor: pointer;color: rgb(62, 31, 151);border-radius: 8px;height: 16px;font-weight: bold;width: 62px;font-size: 10px;top: 22px;"
                @click="clearOperationDialog()"
              >
                {{ "پاک کن" }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'vue-json-pretty/lib/styles.css'
import moment from 'moment-jalaali'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import transactionQueryReportFilter from '~/components/transactionQuery/transactionQueryReportFilter'
import reportManager from '~/repository/report_manager'
import depositOperations from '~/components/transactionQuery/depositOperations'
import cardOperations from '~/components/transactionQuery/cardOperations'
import loanOperations from '~/components/transactionQuery/loanRequestOperations'
import onlineDepositOperations from '~/components/transactionQuery/onlineDepositOperations'
import cardReissueOperations from '~/components/transactionQuery/cardReissueOperations'
import publicOperations from '~/components/transactionQuery/publicOperations'
import userOperations from '~/components/transactionQuery/userOperations'
import pichackOperations from '~/components/transactionQuery/pichackOperations'
// import bankLoanOperationList from '~/components/transactionQuery/bankLoanOperationList'
// import transactionReportFilter from '~/components/transactionReport/transactionReportFilter.vue'

const defaultFilterdetails = {
  transactionListFilter: {
    transactionId: null
  }
}
export default {
  name: 'TransactionQueryPage',
  components: {
    // transactionReportFilter,
    transactionQueryReportFilter,
    depositOperations,
    cardOperations,
    loanOperations,
    cardReissueOperations,
    onlineDepositOperations,
    pichackOperations,
    // bankLoanOperationList,
    userOperations,
    publicOperations,
    VueJsonPretty
  },
  data () {
    return {
      search_selectedOperationModel: '',
      search_selectedOperationModel_title: '',
      search_listOperation: [],
      search_listOperationCopy: [],

      keyTopBar: 1,
      keyTab: 1,
      buttonCloseModal: false,
      downloadLoading: false,
      createDialog: false,
      operationDialog: false,
      createDialog_For_RefundReport: false,
      tabsModel: false,
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
      operationType: {
        operationType: 'QUERY'
      },
      filterDetails: defaultFilterdetails,
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.sourceNumber'), value: 'sourceNumber', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.transactionId'), value: 'id', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.operation'), value: 'operation', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.cif'), value: 'cif', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.phoneNumber'), value: 'mobileNumber', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.amount'), value: 'amount', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.requestTime'), value: 'requestTime', sortable: false, align: 'right' },
        { text: this.$t('report.transactionReport.headers.errorCode'), value: 'responseCode', sortable: false, align: 'right' },
        { text: '', value: 'detail', sortable: false, align: 'center' }
      ],
      headersTransaction: [
        { text: this.$t('report.transactionReport.headers.responseTime'), value: 'responseTime', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.appVersion'), value: 'appVersion', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.osVersion'), value: 'osVersion', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.osName'), value: 'osName', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.ip'), value: 'ip', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.trackerId'), value: 'trackerId', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.traceId'), value: 'traceId', sortable: false, align: 'center' }
      ],
      headersTransactionRequest: [
        { text: this.$t('report.transactionReport.headers.requestJson'), value: 'requestJson', sortable: false, align: 'center' },
        { text: this.$t('report.transactionReport.headers.responseJson'), value: 'responseJson', sortable: false, align: 'center' }
      ],
      headersTransactionLog: [
        { text: this.$t('report.transactionReport.headers.source'), value: 'sourceType', sortable: false, align: 'center' }
      ],
      items: [],
      itemsTransaction: [],
      itemsTransactionData: [],
      requestJson: null,
      responseJson: null,
      refundDetail: null,
      refundDetailsJson: null,
      cardList: [],
      depositList: [],
      cardReissueList: [],
      loanList: [],
      loanPanelList: [],
      depositList1: [],
      onlineDepositList: [],
      otherList: [],
      operationList: [],
      listType: 'query',
      searchOperation: '',
      showTopBar: false
    }
  },
  head () {
    return {
      title: 'درخواست ها' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  computed: {
    ...mapGetters({
      cardOperationList: 'onlineDepositStore/cardOperationList',
      depositOperationList: 'onlineDepositStore/depositOperationList',
      publicOperationList: 'onlineDepositStore/publicOperationList',
      userOperationList: 'onlineDepositStore/userOperationList',
      onlineDepositOperationList: 'onlineDepositStore/onlineDepositOperationList',
      loanRequestOperationList: 'onlineDepositStore/loanRequestOperationList',
      cardReissueOperationList: 'onlineDepositStore/cardReissueOperationList',
      pichakOperationList: 'onlineDepositStore/pichakOperationList'
    })
  },
  mounted () {
    // clear operations
    setTimeout(() => {
      this.clearOperationDialog()
    }, 500, this)

    // this.search(this.searchModel, 'mounted')

    // search operation in textbox
    this.operation()
    this.search_listOperationCopy = [...this.search_listOperation]
  },
  methods: {
    ...mapActions({
      removeAction: 'onlineDepositStore/removeAction'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    re_render () {
      // this.keyTab++
    },
    listItemPreviewSelectedFun () {
      const concatListItemPreviewSelected = sessionStorage.getItem('listItemPreviewSelected_depositOperations') +
        sessionStorage.getItem('listItemPreviewSelected_bankLoanOperationList') +
        sessionStorage.getItem('listItemPreviewSelected_cardOperations') +
        sessionStorage.getItem('listItemPreviewSelected_cardReissueOperations') +
        sessionStorage.getItem('listItemPreviewSelected_loanRequestOperations') +
        sessionStorage.getItem('listItemPreviewSelected_onlineDepositOperations') +
        sessionStorage.getItem('listItemPreviewSelected_pichackOperations') +
        sessionStorage.getItem('listItemPreviewSelected_publicOperations') +
        sessionStorage.getItem('listItemPreviewSelected_userOperations') +
        sessionStorage.getItem('lastSelectTitleOperation')

      sessionStorage.setItem('concatListItemPreviewSelected', concatListItemPreviewSelected)
      const resultFinal = this.uniqByKeepFirst(sessionStorage.getItem('concatListItemPreviewSelected').split('*'), JSON.stringify)

      if (resultFinal.length > 1) { this.showTopBar = true } else { this.showTopBar = false }

      return resultFinal
    },
    focusAfterDelay () {
      setTimeout(() => {
        this.$refs.focus_SearchOperationList.focus()
      }, 200, this)
    },
    getColor (status) {
      if (status >= 200 && status <= 299) {
        return '#84BD00'
      } if (status === null) {
        return '#f1b0b0'
      } else {
        return '#444444'
      }
    },
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    checkUrl (operation, url) {
      if (operation != null) {
        return operation + '\n' + operation
      } else {
        return url + '\n' + url
      }
    },
    editItem2 () {
      this.operationDialog = true
      setTimeout(() => {
        this.buttonCloseModal = true
      }, 500, this)
    },
    editItem (item) {
      this.createDialog = true
      this.itemsTransactionData.splice(0, 1)
      this.itemsTransactionData.push({
        sourceType: item.sourceType,
        sourceNumber: item.sourceNumber,
        platform: item.platform,
        responseCode: item.responseCode,
        appVersion: item.appVersion,
        osVersion: item.osVersion,
        osName: item.osName,
        responseTimeLong: item.responseTimeLong,
        requestId: item.requestId,
        responseTime: item.responseTime,
        traceId: item.traceId,
        ip: item.ip

      })
      defaultFilterdetails.transactionListFilter.transactionId = item.id
      reportManager.transactionDetailsQuery(defaultFilterdetails.transactionListFilter, this.$axios).then((response) => {
        this.itemsTransaction.splice(0, 1)
        // this.itemsTransaction.push(response.data)
        try {
          this.requestJson = JSON.parse(response.data.requestJson)
        } catch (e) {
          this.requestJson = response.data.requestJson
        }
        try {
          this.responseJson = JSON.parse(response.data.responseJson)
        } catch (e) {
          this.responseJson = response.data.responseJson
        }
        this.itemsTransaction.push({
          appVersion: response.data.appVersion,
          osVersion: response.data.osVersion,
          osName: response.data.osName,
          responseLongTime: response.data.responseLongTime,
          requestId: response.data.requestId,
          responseTime: response.data.responseTime,
          ip: response.data.ipAddress,
          traceId: response.data.traceId
        })

        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    closeTransactionDetailsDialog () {
      this.itemsTransaction = []
      this.createDialog = false
      this.itemsTransaction.splice(0, 1)
      this.operationDialog = false
      this.buttonCloseModal = false
    },
    clearOperationDialog () {
      this.operationList = []
      if (this.filterOperation) { this.filterOperation.transactionListFilter.operation = [] }
      sessionStorage.setItem('lastSelectTitleOperation', '')

      sessionStorage.setItem('listItemPreviewSelected_depositOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_bankLoanOperationList', '')
      sessionStorage.setItem('listItemPreviewSelected_cardOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_cardReissueOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_loanRequestOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_onlineDepositOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_pichackOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_publicOperations', '')
      sessionStorage.setItem('listItemPreviewSelected_userOperations', '')

      const listItemPreviewSelectedFun = this.listItemPreviewSelectedFun()
      if (listItemPreviewSelectedFun.length - 1 === 0) {
        this.$refs.refTransactionReportFilter.changeLableSelectOperatorRef('')
      } else {
        this.$refs.refTransactionReportFilter.changeLableSelectOperatorRef(listItemPreviewSelectedFun.length - 1 + ' ' + 'مورد انتخاب شد')
      }

      this.keyTab++
    },
    changeLabelSelectOperation () {
      const listItemPreviewSelectedFun = this.listItemPreviewSelectedFun()
      this.$refs.refTransactionReportFilter.changeLableSelectOperatorRef(listItemPreviewSelectedFun.length - 1 + ' ' + 'مورد انتخاب شد')
    },
    okOperationDialog () {
      const listItemPreviewSelectedFun = this.listItemPreviewSelectedFun()
      this.$refs.refTransactionReportFilter.changeLableSelectOperatorRef(listItemPreviewSelectedFun.length - 1 + ' ' + 'مورد انتخاب شد')

      // add (merge)
      this.cardList = this.cardOperationList
      this.operationList = this.depositOperationList.concat(
        this.cardReissueOperationList,
        this.cardOperationList,
        this.loanRequestOperationList,
        this.onlineDepositOperationList,
        this.publicOperationList,
        this.userOperationList,
        this.pichakOperationList
      )

      this.buttonCloseModal = false
      this.operationDialog = false
    },
    // Remove duplicate values array
    uniqByKeepFirst (a, key) {
      const seen = new Set()
      return a.filter((item) => {
        const k = key(item)
        return seen.has(k) ? false : seen.add(k)
      })
    },
    search (searchModel) {
      this.loading = true

      this.filterOperation = searchModel
      if (this.operationList && this.operationList.length > 0) {
        // Remove duplicate values array
        this.operationList = this.uniqByKeepFirst(this.operationList, JSON.stringify)
        this.filterOperation.transactionListFilter.operation = this.operationList
      }
      if (this.operationList.length === 0) {
        this.filterOperation.transactionListFilter.operation = []
      }

      reportManager.transactionList(this.filterOperation, this.$axios).then((response) => {
        this.items = response.data.itemList
        this.removeAction()
        this.totalNumberOfItems = response.data.filteredItem
        this.loading = false
      }).catch((error) => {
        this.loading = false
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
        .finally(() => {
          this.loading = false
        })
    },
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    downloadReports () {
      this.downloadLoading = true
      reportManager.downloadTransactionList(this.searchModel, this.$axios).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'transaction-reports.xlsx')
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
    },
    moment (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    // دریافت لیست عملیات ها
    // دریافت لیست عملیات ها
    // دریافت لیست عملیات ها
    operation () {
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
        // 200
        this.search_listOperation = response.data.depositOperation.concat(
          response.data.cardOperation,
          response.data.publicOperation,
          response.data.cardReissueOperation,
          response.data.loanOperation,
          response.data.loanPanelOperation,
          response.data.onlineDepositOperation,
          response.data.depositPanelOperation,
          response.data.pichakOperation
        )
        this.search_listOperationCopy = [...this.search_listOperation]
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
    },
    // search operation in textbox
    // search operation in textbox
    // search operation in textbox
    call_SearchOperationList () {
      if (!this.search_selectedOperationModel_title) {
        this.search_listOperation = this.search_listOperationCopy
      }

      this.search_listOperation = this.search_listOperationCopy.filter((operation) => {
        return operation.title.includes(this.search_selectedOperationModel_title)
      })
    },
    // select item in text search
    // select item in text search
    // select item in text search
    changeSelectedSearchOperation () {
      if (this.search_selectedOperationModel) {
        this.clearOperationDialog()

        // get title from operation.url
        this.search_selectedOperationModel_title = this.search_listOperation.filter((operation) => {
          return operation.url === this.search_selectedOperationModel
        })

        sessionStorage.setItem('lastSelectTitleOperation', sessionStorage.getItem('lastSelectTitleOperation') + 'جستجو' + ' -> ' + this.search_selectedOperationModel_title[0].title + '*')

        const listItemPreviewSelectedFun = this.listItemPreviewSelectedFun()
        this.$refs.refTransactionReportFilter.changeLableSelectOperatorRef(listItemPreviewSelectedFun.length - 1 + ' ' + 'مورد انتخاب شد')

        this.search_listOperation = this.search_listOperationCopy
        this.operationList = [this.search_selectedOperationModel]
        this.search_selectedOperationModel_title = ''

        this.buttonCloseModal = false
        this.operationDialog = false
      }
    }
  }
}
</script>

<style scoped>
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 10px;
    height: 20px;
    width: 60px;
    color: white;
    padding: 0 5px;
  }

  /deep/ #detailsTableShowDialog > .v-data-table__wrapper {
    min-height: 110px !important;
  }

  /deep/ .v-tabs-bar.v-item-group > * {
    border-bottom: 2px solid #D8D8D8 !important;
  }
  /deep/ .v-tabs-slider {
    margin-top: -1px !important;
  }
  /deep/ .v-tabs-bar {
    border-radius: inherit !important;
    height: 68px !important;
  }
  /deep/ .v-tab::before {
    border-radius: 10px 10px 0 0 !important;
    top: 10px !important;
  }
  /deep/ .v-tab:before {
    background-color: #e0e0e04d !important;
  }
  /deep/ .v-tab {
    padding: 3px 3px !important;
  }

  /* ***   JSON beautifully   *** */
  /* ***   JSON beautifully   *** */
  /* ***   JSON beautifully   *** */

  /deep/ .vjs-tree__node .vjs-tree__indent.has-line {
    border-left: 2px dashed #bfcbd9 !important;
  }
  /deep/ .vjs-tree__node .vjs-tree__indent {
    -ms-flex: 0 0 2em !important;
    flex: 0 0 2em !important;
  }
  /deep/ .vjs-value__string {
    color: #6fb78f !important;
    line-break: anywhere !important;
  }
  /deep/ .vjs-value__boolean, .vjs-value__number {
    color: #0268b5 !important;
  }

  .center {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
</style>
