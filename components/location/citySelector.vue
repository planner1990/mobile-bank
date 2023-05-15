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
  />
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
  name: 'CitySelector',
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
