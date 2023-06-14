<template>
  <v-card flat>
    <v-container fluid>
      <!-- main part -->
      <!-- main part -->
      <!-- main part -->
      <div class="main">
        <v-row style="margin-top: -5px;">
          <div class="row mt-2 mr-4 ml-7">
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-text-field
                  v-model="request.userFilter.username"
                  :label="$t('user.username')"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="request.userFilter.role"
                  :items="roles"
                  :item-text="(item) => $t(item.text)"
                  item-value="value"
                  :label="$t('user.role')"
                  dense
                  outlined
                  clearable
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
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2">
                <v-select
                  v-model="request.userFilter.status"
                  :items="status"
                  :item-text="(item) => $t(item.text)"
                  item-value="value"
                  :label="$t('user.status.title')"
                  dense
                  outlined
                  clearable
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
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-2 col-lg-2" style="direction:ltr">
                <v-btn :loading="loadingBtn" :disabled="loadingBtn" color="#84BD00" class="btnSearch" @click="search">
                  {{ $t('buttons.search') }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
// import ProvinceSelector from '../location/provinceSelector'
// import CitySelector from '../location/citySelector'
// import BranchSelector from '../location/branchSelector'
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
  },
  paginate: {
    page: 1,
    length: 50,
    sort: {
      property: 'id',
      direction: 'desc'
    }
  }
}

export default {
  name: 'SearchFilterComponent',
  components: {
  },
  props: {
    value: Object(defaultSearchModel)
  },
  data () {
    return {
      roles: userManager.userRoles,
      status: userManager.userStatus,
      loading: false,
      loadingBtn: false,
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
  mounted: function () {
    this.search()
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

      this.loadingBtn = true
      setTimeout(() => (this.loadingBtn = false), 2000)
    }
  }
}

</script>

<style scoped>

</style>
