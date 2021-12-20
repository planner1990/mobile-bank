<template>
  <v-container
    tag="section"
    fluid
  >
    <v-row>
      <v-col cols="2">
        <paymentFilter v-model="searchModel" @search="search" />
      </v-col>
      <v-col
        cols="10"
      >
        <v-data-table
          dense
          item-key="id"
          :items="payments"
          :headers="headers"
          class="elevation-5"
          sort-desc-by="date"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page.sync="searchModel.paginate.length"
          :page.sync="searchModel.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="paginate"
          @update:items-per-page="paginate"
        >
          <template #[`item.date`]="{ item }">
            {{ moment(item.date) }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ priceFormat(item.amount) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import paymentFilter from '~/components/paymentFilter.vue'
import paymentManager from '~/repository/payment_manager'

export default {
  components: {
    paymentFilter
  },
  data: function () {
    return {
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'paymentDate',
            direction: 'desc'
          }
        }
      },
      totalNumberOfItems: 0,
      guids: [
        {
          icon: 'mdi-eye',
          description: 'guide.detailGuid'
        },
        {
          icon: 'mdi-broom',
          description: 'guide.clearButton'
        }
      ],
      loading: false,
      headers: [
        { text: this.$t('headers.sourceDepositNumber'), value: 'sourceDepositNumber', sortable: false },
        { text: this.$t('headers.destinationDepositNumber'), value: 'destinationDepositNumber', sortable: false },
        { text: this.$t('headers.nationalCode'), value: 'nationalCode', sortable: false },
        { text: this.$t('headers.amount'), value: 'amount', sortable: false },
        { text: this.$t('headers.date'), value: 'date', sortable: false },
        { text: this.$t('headers.status'), value: 'status', sortable: false }
      ],
      payments: []
    }
  },
  mounted () {
    this.search(this.searchModel)
  },
  methods: {
    async paginate () {
      await this.search(this.searchModel)
    },
    checkLengthOfNationalCode (nationalCode) {
      let nationalId = nationalCode.toString()
      const lengthOfNationalCode = nationalId.length
      if (lengthOfNationalCode < 10) {
        let zero = ''
        for (let i = 0; i < 10 - lengthOfNationalCode; i++) {
          zero += '0'
        }
        nationalId = zero + nationalId
      }
      return nationalId
    },
    async search (searchModel) {
      this.loading = true
      try {
        const response = await paymentManager.getPaymentList(searchModel, this.$axios)
        if (response.status >= 200 && response.status < 300) {
          this.payments = response.data.itemList
          this.totalNumberOfItems = response.data.filteredItem
          setTimeout(() => {
            for (let i = 0; i < this.payments.length; i++) {
              this.payments[i].nationalCode = this.checkLengthOfNationalCode(this.payments[i].nationalCode)
            }
          }, 70)
        }
      } catch {
      }
      this.loading = false
    },
    moment (date) {
      if (date) {
        return momentJalali(date).format('jYYYY/jM/jD')
      }
    },
    priceFormat (amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
