<template>
  <v-data-table
    dense
    :footer-props="{
      'items-per-page-options': [20, 50, 100, 500, 1000]
    }"
    item-key="operationUrl"
    sort-by="operationUrl"
    :items="deposits"
    :headers="headers"
    class="fullScreen mb-16"
    :loading="loading"
  >
    <template #[`item.operationTitle`]="{ item }">
      <div v-if="item.operationTitle">
        {{ item.operationTitle }}
      </div>
      <div v-else style="color: #f1b0b094">
        {{ '-' }}
      </div>
    </template>
    <template #[`item.successfulAmount`]="{ item }">
      {{ priceFormat(item.successfulAmount) }}
    </template>
    <template #[`item.successfulNumber`]="{ item }">
      {{ priceFormat(item.successfulNumber) }}
    </template>
    <template #[`item.unsuccessfulNumber`]="{ item }">
      {{ priceFormat(item.unsuccessfulNumber) }}
    </template>

    <!-- Add btn to Footer page -->
    <!-- Add btn to Footer page -->
    <!-- Add btn to Footer page -->
    <template #footer>
      <v-btn
        :loading="downloadLoading"
        :disabled="downloadLoading"
        class="btnOnFooterFixUnderGrid"
        @click="downloadReportsEmit()"
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
  name: 'DepositStatisticsComponent',
  props: {
    deposits: Object([]),
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      downloadLoading: false,
      totalNumberOfItems: 0,
      headers: [
        { text: 'تراکنشها', value: 'operationTitle', sortable: false, width: '25%' },
        { text: 'تعداد موفق', value: 'successfulNumber', sortable: false, width: '25%' },
        { text: 'مبلغ موفق', value: 'successfulAmount', sortable: false, width: '25%' },
        { text: 'تعداد ناموفق', value: 'unsuccessfulNumber', sortable: false, width: '25%' }
      ]
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
    },
    downloadReportsEmit () {
      this.downloadLoading = true
      this.$emit('downloadExcelEmit')
      setTimeout(() => { this.downloadLoading = false }, 6000)
    }
  }
}
</script>

<style scoped>
</style>
