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
    locationManager.getOperation($axios).then((res) => {
      operations.value = res
    })
    return {
      operations
    }
  }
})
</script>
