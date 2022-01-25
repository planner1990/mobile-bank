<template>
  <v-row
    justify="center"
  >
    <p> {{ cards.length }}</p>
    <v-data-table
      dense
      item-key="operationUrl"
      sort-by="operationUrl"
      :items="cards"
      :headers="headers"
      class="elevation-5 fullScreen"
      :loading="loading"
    />
  </v-row>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cards: Object([])

  },
  data () {
    return {
      downloadLoading: false,
      searchModel: {
        paginate: {
          page: 1,
          length: 20,
          sort: {
            property: 'operationDate',
            direction: 'desc'
          }
        }
      },

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
