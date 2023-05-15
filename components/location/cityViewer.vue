<template>
  <div>
    <v-input
      v-if="condition === 'table'"
      hide-details="auto"
      :messages="$t(message)"
    >
      {{ city }}
    </v-input>
    <v-select
      v-else
      :label="$t('common.city')"
      :value="city"
      :items="city"
      :disabled="true"
      item-text="title"
      item-value="id"
      outlined
      dense
    />
  </div>
</template>

<script>
import { defineComponent, useContext, ref, watch } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'
import showItem from '~/components/showItem'

export default defineComponent({
  name: 'CityViewerComponent',
  props: {
    icon: {
      type: String,
      default: 'mdi-map-marker'
    },
    province: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: 'delivery.city'
    },
    condition: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $axios } = useContext()
    const city = ref('')
    if (props.value) {
      locationManager.getCities(props.province, $axios).then((res) => {
        const ix = res.findIndex((value, index) => value.id === props.value)
        if (ix >= 0) {
          city.value = res[ix].title
        }
      })
    }

    watch(() => [props.province, props.value], (first, second) => {
      locationManager.getCities(props.province, $axios).then((res) => {
        const ix = res.findIndex((value, index) => value.id === props.value)
        if (ix >= 0) {
          city.value = res[ix].title
        }
      })
    })

    return {
      city,
      showItem
    }
  }
})
</script>
