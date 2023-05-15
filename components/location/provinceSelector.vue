<template>
  <v-select
    v-if="!me.provinceCode"
    :label="$t('common.province')"
    :value="value"
    item-text="title"
    item-value="id"
    :items="provinces"
    :disabled="(locationAccess === 'UNIVERSAL' || isDisabled === true)"
    :rules="isShowRules ? [ v => !!v || $t('user.validation.required') ] : []"
    outlined
    dense
    clearable
    @input="$emit('input', $event)"
  />
  <province-viewer
    v-else
    v-model="me.provinceCode"
    message=""
  />
</template>

<script>
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'
import ProvinceViewer from '@/components/location/provinceViewer'

export default defineComponent({
  name: 'ProvinceSelector',
  components: {
    ProvinceViewer
  },
  props: {
    icon: {
      type: String,
      default: 'mdi-map-marker'
    },
    value: {
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
    const provinces = ref([])
    const me = computed(() => store.getters['user/me'])
    if (me.provinceCode) {
      emit('input', me.provinceCode)
    }
    watch(() => me.provinceCode, (first, second) => {
      emit('input', me.provinceCode)
    })

    locationManager.getProvinces($axios).then((res) => {
      provinces.value = res
    })
    return {
      provinces,
      me
    }
  }
})
</script>
