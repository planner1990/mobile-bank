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
  name: 'Deposit',
  props: {
    deposits: Object([])

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
      loading: false,
      headers: [
        { text: 'تراکنشها', value: 'operationTitle', sortable: false },
        { text: 'تعداد موفق', value: 'successfulNumber', sortable: false },
        { text: 'مبلغ موفق', value: 'successfulAmount', sortable: false },
        { text: 'تعداد ناموفق', value: 'unsuccessfulNumber', sortable: false }

      ]
    }
  }
}
</script>

<style scoped>

</style>
