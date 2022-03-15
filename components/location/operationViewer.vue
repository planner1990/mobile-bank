<template>
  <div>
    <v-input
      v-if="condition === 'table'"
      hide-details="auto"
      :prepend-icon="icon"
      :messages="$t(message)"
    >
      {{ operation }}
    </v-input>
    <v-select
      v-else
      :prepend-icon="icon"
      :label="$t('common.province')"
      :value="operation"
      item-text="title"
      item-value="id"
      :items="operation"
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
  name: 'OperationViewer',
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
    const operation = ref('')

      locationManager.getOperation( $axios).then((res) => {
        operation.value = res.title
      })


    return {
      operation,
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
