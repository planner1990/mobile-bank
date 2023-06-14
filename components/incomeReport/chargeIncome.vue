<template>
  <v-data-table
    dense
    item-key="operationUrl"
    sort-by="operationUrl"
    :items="chargeList"
    :headers="headers"
    class="fullScreen mb-16"
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

    <template #[`item.operator`]="{ item }">
      <div v-if="item.operator">
        {{ item.operator }}
      </div>
      <div v-else style="color: #f1b0b0">
        {{ 'تعیین نشده' }}
      </div>
    </template>
    <template #[`item.amount`]="{ item }">
      <div v-if="item.amount">
        {{ item.amount }}
      </div>
      <div v-else style="color: #f1b0b0">
        {{ 'تعیین نشده' }}
      </div>
    </template>
    <template #[`item.incomePercent`]="{ item }">
      <div v-if="item.incomePercent">
        {{ item.incomePercent }}
      </div>
      <div v-else style="color: #f1b0b0">
        {{ 'تعیین نشده' }}
      </div>
    </template>
    <template #[`item.coSharePercent`]="{ item }">
      <div v-if="item.coSharePercent">
        {{ item.coSharePercent }}
      </div>
      <div v-else style="color: #f1b0b0">
        {{ 'تعیین نشده' }}
      </div>
    </template>
  </v-data-table>
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
        { text: this.$t('income.headers.operator'), value: 'operator', sortable: false, align: 'center' },
        { text: this.$t('income.headers.amount'), value: 'amount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.count'), value: 'count', sortable: false, align: 'center' },
        { text: this.$t('income.headers.sum'), value: 'sum', sortable: false, align: 'center' },
        { text: this.$t('income.headers.incomePercent'), value: 'incomePercent', sortable: false, align: 'center' },
        { text: this.$t('income.headers.incomeAmount'), value: 'incomeAmount', sortable: false, align: 'center' },
        { text: this.$t('income.headers.coSharePercent'), value: 'coSharePercent', sortable: false, align: 'center' },
        { text: this.$t('income.headers.coShareAmount'), value: 'coIncomeShareAmount', sortable: false, align: 'center' }

      ]
    }
  }
}
</script>

<style scoped>

</style>
