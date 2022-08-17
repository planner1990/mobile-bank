<template>
  <v-card
    elevation="0"
  >
    <v-card-title primary-title class="font-weight-bold text-h5">
      {{ $t('titles.createdFile') }}
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex xs3>
          <CreatedFileFilter v-model="searchModel" @search="search" />
        </v-flex>
        <v-flex xs9>
          <v-data-table
            dense
            item-key="id"
            :items="items"
            :headers="headers"
            class="elevation-5"
            :loading="loading"
            :footer-props="{
              'items-per-page-options': [10, 20, 30, 40, 50]
            }"
            :items-per-page.sync="searchModel.paginate.length"
            :page.sync="searchModel.paginate.page"
            :server-items-length="totalNumberOfItems"
            @update:page="search (searchModel)"
            @update:items-per-page="search (searchModel)"
          >
            <template #[`item.status`]="{ item }">
              {{ $t('created.status.' + item.status) }}
            </template>
            <template #[`item.fromDate`]="{ item }">
              {{ moment(item.fromDate) }}
            </template>
            <template #[`item.createdDate`]="{ item }">
              {{ moment(item.createdDate) }}
            </template>
            <template #[`item.toDate`]="{ item }">
              {{ moment(item.toDate) }}
            </template>
            <template #[`item.deliveryType`]="{ item }">
              {{ deliveryType(item.deliveryType) }}
            </template>
            <template #[`item.download`]="{ item }">
              <v-btn
                class="mx-2"
                plain
                :href="download(item.id)"
                target="_blank"
              >
                <v-icon>
                  mdi-cloud-download
                </v-icon>
              </v-btn>
            </template>
            <template #[`item.changeStatus`]="{ item }">
              <v-btn
                small
                elevation="0"
                color="success"
                :disabled="item.status !== 1"
                @click="changeStatus(item.id)"
              >
                {{ $t('buttons.changeStatus') }}
              </v-btn>
            </template>
            <template #[`item.printAddress`]="{ item }">
              <v-btn
                small
                elevation="0"
                color="success"
                :href="printAddress(item.id)"
              >
                {{ $t('buttons.printAddress') }}
              </v-btn>
              <v-btn
                small
                elevation="0"
                color="success"
                :href="printAddressV2(item.id)"
              >
                {{ $t('buttons.printAddressV2') }}
              </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import momentJalali from 'moment-jalaali'
import createdFileFilter from '~/components/createdFileFilter'
import openDepositFileManager from '~/repository/open_deposit_file_manager'

export default {
  name: 'Created',
  components: {
    createdFileFilter
  },
  data () {
    return {
      changeStatusDisable: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'extractDate',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('buttons.changeStatus'), value: 'changeStatus', sortable: false, align: 'center' },
        { text: this.$t('headers.printAddress'), value: 'printAddress', sortable: false, align: 'center' },
        { text: this.$t('headers.status'), value: 'status', sortable: false },
        { text: this.$t('headers.deliveryType'), value: 'deliveryType', sortable: false },
        { text: this.$t('headers.createdDate'), value: 'createdDate', sortable: false },
        { text: this.$t('headers.startDate'), value: 'fromDate', sortable: false },
        { text: this.$t('headers.endDate'), value: 'toDate', sortable: false },
        { text: this.$t('headers.number'), value: 'rowsNumber', sortable: false },
        { text: this.$t('headers.download'), value: 'download', sortable: false }
      ],
      items: []
    }
  },
  mounted () {
    this.search(this.searchModel)
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    search (searchModel) {
      this.loading = true
      openDepositFileManager.list(searchModel, this.$axios).then((response) => {
        this.items = response.data.itemList
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
    download (fileId) {
      return process.env.VUE_APP_Host + '/opened-deposit-file/download/' + fileId + '?authorization=' + sessionStorage.getItem('mob-jwtKey').toString()
    },
    async changeStatus (fileId) {
      await openDepositFileManager.update(fileId, this.$axios)
    },
    printAddress (fileId) {
      return process.env.VUE_APP_Host + '/opened-deposit-file/print-address/' + fileId + '?authorization=' + sessionStorage.getItem('mob-jwtKey').toString()
    },
    printAddressV2 (fileId) {
      return process.env.VUE_APP_Host + '/opened-deposit-file/print-address-v2/' + fileId + '?authorization=' + sessionStorage.getItem('mob-jwtKey').toString()
    },
    moment (date) {
      if (date) {
        return momentJalali(date).format('hh:mm jYYYY/jM/jD')
      } else {
        return null
      }
    },
    deliveryType (type) {
      if (type === null) {
        return this.$t('deliveryType.empty')
      } else if (type === 'BRANCH') {
        return this.$t('deliveryType.branch')
      } else if (type === 'ADDRESS' || type === 'NEW_ADDRESS') {
        return this.$t('deliveryType.address')
      }
    }
  }
}
</script>
