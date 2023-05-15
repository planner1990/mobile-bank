<template>
  <v-select
    v-if="true"
    :label="$t('common.province')"
    :value="value"
    item-text="title"
    item-value="id"
    :items="operations"
    :disabled="false"
    outlined
    dense
    clearable
    @input="$emit('input', $event)"
  />
  <operation-viewer
    v-else
    v-model="operations"
    message=""
  />
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'
import OperationViewer from '@/components/location/operationViewer'

export default defineComponent({
  name: 'OperationSelectorComponent',
  components: {
    OperationViewer
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
    const { $axios } = useContext()
    const operations = ref([])
    console.log('majid')
    locationManager.getOperation($axios).then((res) => {
      operations.value = res
    })
    return {
      operations
    }
  }
})
</script>
