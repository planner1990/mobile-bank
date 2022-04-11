<template>
  <v-row
    justify="center"
  >
    <v-data-table
      dense
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="deposits"
      :headers="headers"
      class="elevation-5 fullScreen"
      :loading="loading"
    >
      <template #[`item.successfulAmount`]="{ item }">
        {{ priceFormat(item.successfulAmount) }}
      </template>
      <template #[`item.successfulNumber`]="{ item }">
        {{ priceFormat(item.successfulNumber) }}
      </template>
      <template #[`item.unsuccessfulNumber`]="{ item }">
        {{ priceFormat(item.unsuccessfulNumber) }}
      </template>
    </v-data-table>
  </v-row>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'RefundIncome',
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
        { text: this.$t('income.headers.amount'), value: 'successFulAmount' },
        { text: this.$t('income.headers.countSuccess'), value: 'successFulCount' },
        { text: this.$t('income.headers.amountSuccess'), value: 'successFulAmount' },
        { text: this.$t('income.headers.countFail'), value: 'failedCount' },
        { text: this.$t('income.headers.amountFail'), value: 'failedAmount' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
