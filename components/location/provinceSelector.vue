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
  name: 'ProvinceSelectorComponent',
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
