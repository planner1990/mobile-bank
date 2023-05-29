<template>
  <v-data-table
    dense
    item-key="operationUrl"
    sort-by="operationUrl"
    :items="transferList"
    :headers="headers"
    class="fullScreen"
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

    <!-- Add btn to Footer page -->
    <!-- Add btn to Footer page -->
    <!-- Add btn to Footer page -->
    <template #footer>
      <v-btn
        :loading="downloadLoading"
        :disabled="downloadLoading"
        style="top: 50px;width: 146px;height: 36px;background: #84BD00;box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;"
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
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'TransferIncomeComponent',
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
