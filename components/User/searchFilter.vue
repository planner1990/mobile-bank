<template>
  <v-card>
    <v-toolbar
      class="black--text"
      color="lightGreen"
      flat
      dense
      dark
    >
      {{ $t("user.title") }}
      <v-spacer />
      <v-btn
        color="success"
        small
        @click="search"
      >
        {{ $t('user.search') }}
      </v-btn>
      <!--      <v-btn-->
      <!--        color="warning"-->
      <!--        fab-->
      <!--        x-small-->
      <!--        @click="clean"-->
      <!--      >-->
      <!--        <v-icon>-->
      <!--          mdi-broom-->
      <!--        </v-icon>-->
      <!--      </v-btn>-->
    </v-toolbar>
    <v-container fluid>
      <v-text-field
        v-model="request.userFilter.username"
        :label="$t('user.username')"
        dense
        outlined
        prepend-icon="mdi-account"
      />
      <v-select
        v-model="request.userFilter.role"
        :items="roles"
        :item-text="(item) => $t(item.text)"
        item-value="value"
        :label="$t('user.role')"
        dense
        outlined
        prepend-icon="mdi-account-lock"
      />
      <v-select
        v-model="request.userFilter.status"
        :items="status"
        :item-text="(item) => $t(item.text)"
        item-value="value"
        :label="$t('user.status.title')"
        dense
        outlined
        prepend-icon="mdi-account-lock"
      />
      <province-selector
        v-model="request.locationFilter.provinceCode"
      />
      <city-selector
        v-model="request.locationFilter.cityCode"
        :province="computedProvince"
      />
      <branch-selector
        v-model="request.locationFilter.branchCode"
        :city="computedCity"
        :province="computedProvince"
      />
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ProvinceSelector from '../location/provinceSelector.vue'
import CitySelector from '../location/citySelector.vue'
import BranchSelector from '../location/branchSelector.vue'
import userManager from '@/repository/user_manager'

const defaultSearchModel = {
  locationFilter: {
    provinceCode: null,
    cityCode: null,
    branchCode: null
  },
  userFilter: {
    username: null,
    status: null,
    role: null
  }

}

export default {
  name: 'LoanFilter',
  components: {
    ProvinceSelector,
    CitySelector,
    BranchSelector
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      roles: userManager.userRoles,
      status: userManager.userStatus,
      loading: false,
      request: defaultSearchModel
    }
  },
  computed: {
    ...mapGetters({
      me: 'user/me'
    }),
    computedProvince: function () {
      if (this.me.provinceCode) {
        return this.me.provinceCode
      } else {
        return this.request.locationFilter.provinceCode
      }
    },
    computedCity: function () {
      if (this.me.cityCode) {
        return this.me.cityCode
      } else {
        return this.request.locationFilter.cityCode
      }
    }
  },
  methods: {
    search () {
      this.loading = true
      if (this.me.provinceCode) {
        this.request.locationFilter.provinceCode = this.me.provinceCode
      }
      if (this.me.cityCode) {
        this.request.locationFilter.cityCode = this.me.cityCode
      }
      if (this.me.branchCode) {
        this.request.locationFilter.branchCode = this.me.branchCode
      }
      this.request = Object.assign(this.value, defaultSearchModel)
      this.$emit('search', this.request)
      this.loading = false
    }
  }
}

</script>
