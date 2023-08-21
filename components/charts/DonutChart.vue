<template>
  <apexcharts ref="realtimeChart" height="1000" :options="chartOptions" :series="series" />
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'DonutChartComponent',
  components: {
    apexcharts: VueApexCharts
  },
  props: {
    getLabelsProps: {
      type: Array,
      required: true
    },
    getSeriesProps: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chartOptions: {
        dataLabels: {
          formatter: function (val, opts) {
            return Math.round(val) + '%'
          }
        },
        chart: {
          id: 'vuechart-example',
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%'
            }
          }
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          markers: {
            offsetX: 5
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          }
        },
        labels: this.getLabelsUpdate
      },
      series: this.getSeriesUpdate
    }
  },
  watch: {
    // trigger change props or base data
    getSeriesProps: {
      handler: function () {
        this.updateChart()
      },
      immediate: true
    }
  },
  methods: {
    updateChart () {
      this.series = this.getSeriesProps
      this.chartOptions.labels = this.getLabelsProps
    }
  }
}

</script>
