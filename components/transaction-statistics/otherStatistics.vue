<template>
  <v-row
    justify="center"
  >
    <v-data-table
      dense
      :footer-props="{
        'items-per-page-options': [50, 100, 300, 500, 1000]
      }"
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="others"
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
        { text: 'تراکنشها', value: 'operationTitle', sortable: false },
        { text: 'تعداد موفق', value: 'successfulNumber', sortable: false },
        { text: 'مبلغ موفق', value: 'successfulAmount', sortable: false },
        { text: 'تعداد ناموفق', value: 'unsuccessfulNumber', sortable: false }

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
