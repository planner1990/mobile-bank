<template>
  <v-data-table
    dense
    :footer-props="{
      'items-per-page-options': [20, 50, 100, 500, 1000]
    }"
    item-key="operationUrl"
    sort-by="operationUrl"
    :items="others"
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
  </v-data-table>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'OtherStatisticsComponent',
  props: {
    others: Object([]),
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
    }
  }
}
</script>

<style scoped>
</style>
