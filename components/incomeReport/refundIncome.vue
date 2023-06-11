<template>
  <v-data-table
    dense
    item-key="operationUrl"
    sort-by="operationUrl"
    :items="refundList"
    :headers="headers"
    class="fullScreen"
    :loading="loading"
    :footer-props="{
      'items-per-page-options': [20, 50, 100, 500, 1000]
    }"
  >
    <template #[`item.successfulAmount`]="{ item }">
      {{ priceFormat(item.successfulAmount) }}
    </template>
    <template #[`item.successFulCount`]="{ item }">
      {{ priceFormat(item.successFulCount) }}
    </template>
    <template #[`item.failedCount`]="{ item }">
      {{ priceFormat(item.failedCount) }}
    </template>
    <template #[`item.failedAmount`]="{ item }">
      {{ priceFormat(item.failedAmount) }}
    </template>
  </v-data-table>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'RefundIncomeComponent',
  props: {
    refundList: Object([]),
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return 0
      }
    }
  },

  data () {
    return {
      downloadLoading: false,
      totalNumberOfItems: 0,
      headers: [
        { text: this.$t('income.headers.amount'), value: 'amount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.countSuccess'), value: 'successFulCount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.amountSuccess'), value: 'successFulAmount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.countFail'), value: 'failedCount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.amountFail'), value: 'failedAmount', sortable: false, align: 'center' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
