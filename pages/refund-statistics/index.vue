<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <v-row
        justify="center"
      >
        <refundStatisticsFilter v-model="searchModel" @search="search" @confirm="confirm" />
      </v-row>
      <br>
      <br>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          :footer-props="{
            'items-per-page-options': [50, 100, 300, 500, 1000]
          }"
          :items="items"
          :headers="headers"
          class="fullScreen"
          :loading="loading"
          :items-per-page.sync="searchModel.paginate.length"
          :server-items-length="totalNumberOfItems"
        >
          <template #top />
          <template #[`item.date`]="{ item }">
            {{ item.date }}
          </template>
          <template #[`item.state`]="{ item }">
            <template v-if="item.state !== null" class="justify-center">
              <v-chip
                style="font-size: 13px !important;"
                :color="getColorState(item.state)"
                label
                class="v-chip1 justify-center"
              >
                {{ $t('report.refundReport.refundTypeNum.' + item.state) }}
              </v-chip>
            </template>
          </template>
          <template #[`item.number`]="{ item }">
            {{ item.number }}
          </template>
          <template #[`item.sum`]="{ item }">
            {{ priceFormat(item.sum) }}
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import momentJalali from 'moment-jalaali'
import { mapMutations } from 'vuex'
import refundStatisticsFilter from '~/components/refund-statistics/refundStatisticsFilter'
import refundStatisticsManager from '~/repository/refundStatistics_manager'

export default {
  name: 'RefundStatisticsPage',
  components: {
    refundStatisticsFilter
  },
  data () {
    return {
      searchModel: {
        paginate: {
          page: 1,
          length: 50
        }
      },
      totalNumberOfItems: 0,
      loading: false,
      headers: [
        { text: this.$t('refundStatistics.date'), value: 'date', sortable: false },
        { text: this.$t('refundStatistics.state'), value: 'state', sortable: false },
        { text: this.$t('refundStatistics.number'), value: 'number', sortable: false },
        { text: this.$t('refundStatistics.sum'), value: 'sum', sortable: false, align: 'center' }],

      items: []
    }
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    getColor (status) {
      if (status >= 200 && status <= 299) {
        return 'success'
      } else if (status !== null) {
        return 'red'
      }
    },
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    search (searchModel) {
      this.loading = true
      refundStatisticsManager.details(searchModel, this.$axios).then((response) => {
        this.items = response.data.details
        this.totalNumberOfItems = response.data.details.length
        this.loading = false
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    confirm (searchModel) {
      refundStatisticsManager.confirm(searchModel, this.$axios).then(() => {
        this.alert({
          color: 'success',
          content: 'messages.successful'
        })
        this.search(searchModel)
      }).catch((error) => {
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    convertToJalali (date) {
      if (date !== null) {
        return this.moment(date).format('HH:mm:ss jYYYY/jM/jD')
      }
    },
    moment (date) {
      return momentJalali(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    getColorState (state) {
      if (state === 0) {
        return '#ffff00'
      } else if (state === 1) {
        return 'success'
      } else if (state === 4) {
        return '#EEE8AA'
      } else if (state === 5) {
        return '#66CDAA'
      } else if (state === 3) {
        return '#ff9933'
      } else if (state === 6) {
        return '#5b90bf'
      } else if (state === 2) {
        return 'red'
      } else if (state === 7) {
        return 'rgba(255,51,246,0.74)'
      }
    }
  }
}
</script>

<style scoped>
.v-data-footer {
  font-size: 1.05rem !important;
}
.v-chip.v-size--default {
  border-radius: 16px;
  font-size: 10px;
  height: 20px;
  width: 60px;
  color: white;
  padding: 0 5px;
}
.v-chip1 {
  border-radius: 16px;
  font-size: 8px!important;
  height: 20px;
  width: 100px !important;
  color: black !important;
  padding: 0 0px !important;
}
</style>
