<template>
  <apexcharts type="line" height="500" :options="chartOptions" :series="series" style="width: 95%" />
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'LineChart',
  components: {
    apexcharts: VueApexCharts
  },
  props: {
    title: {
      type: Text,
      required: true
    },
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
      series: [{
        name: this.title,
        data: this.getSeriesProps
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line'
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: this.title,
          align: 'center'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.getLabelsProps
        }
      }
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
      this.series[0].data = this.getSeriesProps
      this.chartOptions.xaxis.categories = this.getLabelsProps
    }
  }
}

</script>
