<template>
  <div>
    <v-input
      v-if="condition === 'table'"
      hide-details="auto"
      :messages="$t(message)"
    >
      {{ value }}
    </v-input>
    <v-combobox
      v-else
      :label="$t('common.branch')"
      :value="branch"
      :items="branch"
      :disabled="true"
      item-text="title"
      item-value="id"
      outlined
      dense
      @input="$emit('input', $event.id)"
    >
      <template #item="{ item }">
        <span>
          {{ item.title + ' - ' + item.id }}
        </span>
      </template>
    </v-combobox>
  </div>
</template>

<script>
import { defineComponent, useContext, ref, watch } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'

export default defineComponent({
  name: 'BranchViewerComponent',
  props: {
    icon: {
      type: String,
      default: 'mdi-office-building-marker-outline'
    },
    value: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: 'delivery.branchCode'
    },
    condition: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $axios } = useContext()
    const branch = ref('-')
    if (props.value) {
      locationManager.getBranch(props.value, $axios).then((res) => {
        if (res.length > 0) {
          branch.value = res[0].title
        }
      })
    }

    watch(() => props.value, (first, second) => {
      locationManager.getBranch(props.value, $axios).then((res) => {
        if (res.length > 0) {
          branch.value = res[0].title
        }
      })
    })

    return {
      branch
    }
  }
})
</script>

<style scoped>
/deep/ .v-input {
  font-size: 14px;
}
</style>
