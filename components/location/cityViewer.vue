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
    >
      <template #append>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
            stroke="#84BD00"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </v-select>
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
    const city = ref('تعیین نشده')
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

<style scoped>
/deep/ .v-input {
  font-size: 14px;
}
</style>
