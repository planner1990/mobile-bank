<template>
  <v-row
    justify="center"
  >
    <v-data-table
      dense
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="transferList"
      :headers="headers"
      class="elevation-5 fullScreen"
      :loading="loading"
    >
      <template #[`item.transactionName`]="{ item }">
        {{ $t('income.constants.' + item.transactionName) }}
      </template>
      <template #[`item.coShareAmount`]="{ item }">
        {{ priceFormat(item.coShareAmount) }}
      </template>
      <template #[`item.feeSum`]="{ item }">
        {{ priceFormat(item.feeSum) }}
      </template>
      <template #[`item.transactionCount`]="{ item }">
        {{ priceFormat(item.transactionCount) }}
      </template>
    </v-data-table>
  </v-row>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'TransferIncome',
  props: {
    transferList: Object([]),
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
        { text: this.$t('income.headers.transactionName'), value: 'transactionName' },
        { text: this.$t('income.headers.transactionCount'), value: 'transactionCount' },
        { text: this.$t('income.headers.feeSum'), value: 'feeSum' },
        { text: this.$t('income.headers.coSharePercent'), value: 'coSharePercent' },
        { text: this.$t('income.headers.coShareAmount'), value: 'coShareAmount' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
