<template>
  <v-select
    v-if="!me.cityCode"
    :label="$t('common.city')"
    :value="value"
    :items="cities"
    :disabled="(locationAccess === 'UNIVERSAL' || locationAccess === 'PROVINCE' || isDisabled === true)"
    :rules="isShowRules ? [ v => !!v || $t('user.validation.required') ] : []"
    item-text="title"
    item-value="id"
    outlined
    dense
    clearable
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
  <city-viewer
    v-else
    v-model="me.cityCode"
    :province="me.provinceCode"
    message=""
  />
</template>

<script>
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'
import cityViewer from './cityViewer'
import locationManager from '@/repository/location_manager'

export default defineComponent({
  name: 'CitySelectorComponent',
  components: { cityViewer },
  props: {
    icon: {
      type: String,
      default: 'mdi-map-marker'
    },
    value: {
      type: Number,
      default: 0
    },
    province: {
      type: Number,
      default: 0
    },
    locationAccess: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isShowRules: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { $axios, store } = useContext()
    const cities = ref([])
    const me = computed(() => store.getters['user/me'])
    locationManager.getCities(props.province, $axios).then((res) => {
      cities.value = res
    })

    watch(() => me.cityCode, (first, second) => {
      if (me.cityCode) {
        emit('input', me.cityCode)
      }
    })

    watch(() => props.province, (first, second) => {
      locationManager.getCities(props.province, $axios).then((res) => {
        cities.value = res
      })
    })

    return {
      cities,
      me
    }
  }
})
</script>
