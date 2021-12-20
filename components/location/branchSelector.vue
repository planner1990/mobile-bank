<template>
  <v-select
    v-if="!me.branchCode"
    :prepend-icon="icon"
    :label="$t('common.branch')"
    :items="branches"
    :value="value"
    :disabled="(locationAccess === 'UNIVERSAL' || locationAccess === 'PROVINCE' || isDisabled === true)"
    :rules="isShowRules ? [ v => !!v || $t('user.validation.required') ] : []"
    item-text="title"
    item-value="id"
    clearable
    outlined
    dense
    @input="$emit('input', $event)"
  >
    <template #item="{ item }">
      <span>
        {{ item.title + ' - ' + item.id }}
      </span>
    </template>
  </v-select>
  <branch-viewer
    v-else
    v-model="me.branchCode"
    :value="me.branchCode"
  />
</template>

<script>
import { defineComponent, useContext, ref, watch, computed } from '@nuxtjs/composition-api'
import locationManager from '@/repository/location_manager'
import BranchViewer from '~/components/location/branchViewer'

export default defineComponent({
  name: 'BranchSelector',
  components: {
    BranchViewer
  },
  props: {
    icon: {
      type: String,
      default: 'mdi-office-building-marker-outline'
    },
    value: {
      type: Number,
      default: 0
    },
    province: {
      type: Number,
      default: 0
    },
    city: {
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
  setup (props) {
    const { $axios, store } = useContext()
    const branches = ref([])
    const me = computed(() => store.getters['user/me'])
    if (me.provinceCode && me.cityCode) {
      locationManager.getBranches(me.provinceCode, me.cityCode, $axios).then((res) => {
        branches.value = res
      })
    } else {
      locationManager.getBranches(props.province, props.city, $axios).then((res) => {
        branches.value = res
      })
    }

    watch(() => [props.city, me], (first, second) => {
      locationManager.getBranches(me.provinceCode || props.province, me.cityCode || props.city, $axios).then((res) => {
        branches.value = res
      })
    })

    return {
      branches,
      me
    }
  }
})
</script>
