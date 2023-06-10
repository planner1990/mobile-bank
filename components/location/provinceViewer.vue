<template>
  <div>
    <v-input
      v-if="condition === 'table'"
      hide-details="auto"
      :messages="$t(message)"
    >
      {{ province }}
    </v-input>
    <v-select
      v-else
      :label="$t('common.province')"
      :value="province"
      item-text="title"
      item-value="id"
      :items="province"
      :disabled="true"
      outlined
      dense
      @input="$emit('input', $event)"
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
  name: 'ProvinceViewerComponent',
  props: {
    icon: {
      type: String,
      default: 'mdi-map-marker'
    },
    value: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: 'delivery.province'
    },
    condition: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $axios } = useContext()
    const province = ref('')
    if (props.value) {
      locationManager.getProvince(props.value, $axios).then((res) => {
        province.value = res.title
      })
    }

    watch(() => props.value, (first, second) => {
      locationManager.getProvince(props.value, $axios).then((res) => {
        province.value = res.title
      })
    })

    return {
      province,
      showItem
    }
  }
})
</script>
<style scoped>
.v-input__slot {
  justify-content: center !important;
}
</style>
