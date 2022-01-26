<template>
  <v-card
    elevation="10"
    class="fullScreen"
    color="#f6f6f6"
  >
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dark
      dense
      elevation="1"
    >
      {{ $t('titles.filters') }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('buttons.search') }}
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            id="my-custom-input"
            v-model="fromDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.fromDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="fromDate"
            element="my-custom-input"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            @close="checkIsNull()"
          />
        </v-col>
        <v-col
          cols="1"
        />
        <v-col>
          <v-text-field
            id="custom-input"
            v-model="toDate"
            prepend-icon="mdi-calendar-month"
            outlined
            dense
            :placeholder="$t('filters.toDate')"
            format="jYYYY/jMM/jDD"
            input-format="jYYYY/jMM/jDD"
          />
          <p-date-picker
            v-model="toDate"
            element="custom-input"
            color="dimgray"
            dense
            outlined
            popove
            auto-submit
            @close="checkIsNull()"
          />
        </v-col>
        <v-col />
        <v-col />
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.errorReportListFilter.operation"
            :items="status"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.operation')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col
          cols="1"
        />
        <v-col>
          <v-select
            v-model="filter.errorReportListFilter.errorCode"
            :items="errorCode"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :return-object="false"
            :label="$t('filters.errorCode')"
            prepend-icon="mdi-clipboard-list"
            dense
            clearable
            outlined
          />
        </v-col>
        <v-col />
        <v-col />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
// import ProvinceSelector from '@/components/location/provinceSelector.vue'
// import CitySelector from '@/components/location/citySelector'
// import BranchSelector from '~/components/location/branchSelector'
import reportManager from '~/repository/report_manager'
const defaultFilter = {
  errorReportListFilter: {
    operation: null,
    responseCode: null
  },
  dateFilter: {
    from: null,
    to: null
  }
}
export default {
  name: 'ErrorReportFilter',
  components: {
    PDatePicker: VuePersianDatetimePicker

  },
  props: {
    value: Object({})
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
      filter: defaultFilter,
      status: reportManager.status,
      errorCode: reportManager.errorCode
    }
  },

  methods: {
    search () {
      this.$emit('search', this.filter)
    },
    checkIsNull () {
      if (this.fromDate != null) {
        this.filter.dateFilter.from = this.convertJalaliDateToTimestamp(this.fromDate)
      }
      if (this.toDate != null) {
        this.filter.dateFilter.to = this.convertJalaliDateToTimestamp(this.toDate, 23, 59, 59)
      }
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'jYYYY/jM/jD').format('YYYY')
      const month = moment(date, 'jYYYY/jM/jD').format('MM')
      const day = moment(date, 'jYYYY/jM/jD').format('DD')
      return new Date(Date.UTC(year, month - 1, day)).getTime()
    }
  }
}
</script>

<style scoped>

</style>
