<template>
  <v-row
    justify="center"
  >
    <v-data-table
      dense
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="others"
      :headers="headers"
      class="elevation-5 fullScreen"
      :loading="loading"
    />
  </v-row>
</template>

<script>
export default {
  name: 'Other',
  props: {
    others: Object([])

  },
  data () {
    return {
      downloadLoading: false,
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: 'تراکنشها', value: 'operationTitle', sortable: false },
        { text: 'تعداد موفق', value: 'internet.successfulNumber', sortable: false },
        { text: 'مبلغ موفق', value: 'internet.successfulAmount', sortable: false },
        { text: 'تعداد ناموفق', value: 'internet.unsuccessfulNumber', sortable: false }

      ]
    }
  }
}
</script>

<style scoped>

</style>
