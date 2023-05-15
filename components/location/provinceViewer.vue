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
    />
  </div>
</template>

<script>
import { defineComponent, useContext, ref, watch } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'
import showItem from '~/components/showItem'

export default defineComponent({
  name: 'ProvinceViewer',
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
