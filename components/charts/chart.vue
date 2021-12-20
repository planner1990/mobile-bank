<template>
  <canvas ref="ctx" />
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { Chart, registerables } from 'chart.js'

export default defineComponent({
  name: 'MyChart',
  props: {
    data: Object({}),
    value: Int32Array
  },
  setup (props) {
    const ctx = ref(null)
    let chart = null
    Chart.register(...registerables)
    const update = function () {
      chart.update()
    }
    onMounted(() => {
      chart = new Chart(ctx.value, {
        type: 'bar',
        data: props.data,
        options: {
          plugins: {
            title: {
              display: true,
              text: ''
            }
          },
          responsive: true,
          interaction: {
            intersect: false
          },
          scales: {
            x: {
              stacked: true,
              max: 100
            },
            y: {
              stacked: true,
              max: 100
            }
          }
        }
      })
    })
    return {
      ctx,
      chart,
      update
    }
  }
})

</script>
