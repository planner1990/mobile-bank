<template>
  <apexcharts type="line" height="400" :options="chartOptions" :series="series" style="width: 95%" />
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
      type: String,
      required: true
    },
    getLabelsProps: {
      type: Array,
      required: true
    },
    getSeriesProps: {
      type: Array,
      required: true
    },
    change: {
      type: Number,
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
          height: 500,
          type: 'line',
          toolbar: {
            show: false
          },
          fontFamily: 'B Yekan'
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#800000',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },
        lineOptions: {
          hideDots: true,
          regionFill: true
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            return value
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 15,
            borderRadius: 10,
            borderColor: '#fff',
            opacity: 0.9
          }
        },
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 3
        },
        colors: ['#FF1654'],
        title: {
          text: this.title,
          align: 'center'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.4
          }
        },
        plotOptions: {
          bar: {
            lineWidth: '20%'
          }
        },
        xaxis: {
          labels: {
            rotate: 90
          },
          categories: this.getLabelsProps
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: false,
              color: '#aaaaaa'
            },
            labels: {
              offsetX: 0,
              offsetY: 0,
              style: {
                colors: '#444444'
              },
              formatter: (val) => {
                return val
              }
            },
            title: {
              text: 'count',
              offsetX: 0,
              offsetY: 0,
              style: {
                color: '#FF1654'
              }
            }
          }
        ],
        legend: {
          horizontalAlign: 'right',
          offsetX: 40
        }
      }
    }
  },
  watch: {
    // trigger change props or base data
    change: {
      handler: function () {
        this.updateChart()
      },
      immediate: true
    }
  },
  methods: {
    updateChart () {
      this.series[0].data = this.getSeriesProps
      this.chartOptions = {
        chart: this.chartOptions.chart,
        theme: this.chartOptions.theme,
        lineOptions: this.chartOptions.lineOptions,
        dataLabels: this.chartOptions.dataLabels,
        stroke: this.chartOptions.stroke,
        markers: this.chartOptions.markers,
        colors: this.chartOptions.colors,
        title: this.chartOptions.title,
        grid: this.chartOptions.grid,
        plotOptions: this.chartOptions.plotOptions,
        xaxis: {
          labels: this.chartOptions.xaxis.labels,
          categories: this.getLabelsProps
        },
        yaxis: this.chartOptions.yaxis,
        legend: this.chartOptions.legend
      }
    }
  }
}

</script>
