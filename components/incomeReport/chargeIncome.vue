<template>
  <v-row
    justify="center"
  >
    <v-data-table
      dense
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="chargeList"
      :headers="headers"
      class="elevation-5 fullScreen"
      :loading="loading"
    >
      <template #[`item.operator`]="{ item }">
        {{ $t('report.chargeReport.operatorType.' + item.operator) }}
      </template>
      <template #[`item.amount`]="{ item }">
        {{ $t('income.constants.' + item.amount) }}
      </template>
      <template #[`item.count`]="{ item }">
        {{ priceFormat(item.count) }}
      </template>
      <template #[`item.sum`]="{ item }">
        {{ priceFormat(item.sum) }}
      </template>
      <template #[`item.incomeAmount`]="{ item }">
        {{ priceFormat(item.incomeAmount) }}
      </template>
      <template #[`item.coIncomeShareAmount`]="{ item }">
        {{ priceFormat(item.coIncomeShareAmount) }}
      </template>
    </v-data-table>
  </v-row>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'ChargeIncomeComponent',
  props: {
    chargeList: Object([]),
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
        { text: this.$t('income.headers.operator'), value: 'operator' },
        { text: this.$t('income.headers.amount'), value: 'amount' },
        { text: this.$t('income.headers.count'), value: 'count' },
        { text: this.$t('income.headers.sum'), value: 'sum' },
        { text: this.$t('income.headers.incomePercent'), value: 'incomePercent' },
        { text: this.$t('income.headers.incomeAmount'), value: 'incomeAmount' },
        { text: this.$t('income.headers.coSharePercent'), value: 'coSharePercent' },
        { text: this.$t('income.headers.coShareAmount'), value: 'coIncomeShareAmount' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
