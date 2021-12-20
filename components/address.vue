<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title
      primary-title
      class="lightGreen text-h4"
    >
      {{ $t('titles.address') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-row>
        <v-col>
          <v-text-field
            v-model="addressInput"
            :prefix="addressPrefix"
            :disabled="!editBtnClicked"
            outlined
            clearable
            hide-details
            clear-icon="mdi-close-circle"
            :label="$t('onlineDepositFields.address')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-text-field
            v-model="postalCodeInput"
            :disabled="!editBtnClicked"
            outlined
            counter="10"
            type="number"
            clearable
            clear-icon="mdi-close-circle"
            :label="$t('onlineDepositFields.postalCode')"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions
      v-show="onlineDeposit.status === $t('onlineDepositStatus.IN_PROCESS.value')"
      class="px-2 py-2"
    >
      <v-col>
        <v-divider class="py-2" />
        <v-btn
          v-if="!editBtnClicked"
          elevation="5"
          outlined
          @click="editBtnClicked = true"
        >
          {{ $t('buttons.edit') }}
        </v-btn>
        <v-btn
          v-if="editBtnClicked"
          elevation="5"
          color="error"
          @click="cancelEdit ()"
        >
          {{ $t('buttons.cancel') }}
        </v-btn>
        <v-btn
          v-if="editBtnClicked && (addressChange || postalCodeChange)"
          elevation="5"
          color="success"
          @click="confirmEdit ()"
        >
          {{ $t('buttons.submit') }}
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapGetters } from 'vuex'
import onlineDepositManager from '~/repository/online_deposit_manager'
import userManager from '~/repository/user_manager'

export default {
  name: 'Address',

  data () {
    return {
      userManager: userManager,
      // loggedInUser: JSON.parse(sessionStorage.getItem('userInfo')),
      addressInput: null,
      postalCodeInput: null,
      editBtnClicked: false
    }
  },
  computed: {
    ...mapGetters({
      onlineDeposit: 'onlineDepositStore/currentState',
      loggedInUser: 'user/me'
    }),
    addressChange () {
      if (this.addressInput === null && this.onlineDeposit.address === null) {
        return false
      }
      if (this.addressInput === null && this.onlineDeposit.address === '') {
        return false
      }
      if (this.addressInput === '' && this.onlineDeposit.address === null) {
        return false
      }
      return this.addressInput !== this.onlineDeposit.address
    },
    postalCodeChange () {
      if (this.postalCodeInput === null && this.onlineDeposit.postalCode === null) {
        return false
      }
      if (this.postalCodeInput === null && this.onlineDeposit.postalCode === '') {
        return false
      }
      if (this.postalCodeInput === '' && this.onlineDeposit.postalCode === null) {
        return false
      }
      return Number(this.postalCodeInput) !== Number(this.onlineDeposit.postalCode)
    },
    addressPrefix () {
      let prefix = ''
      if (this.onlineDeposit.provinceName) {
        prefix = this.onlineDeposit.provinceName
        if (this.onlineDeposit.cityName) {
          prefix += ' - ' + this.onlineDeposit.cityName + ' - '
        }
      } else if (this.onlineDeposit.cityName) {
        prefix = this.onlineDeposit.cityName + ' - '
      }
      return prefix
    }
  },
  watch: {
    onlineDeposit: function (newVal, oldVal) {
      this.init(newVal)
    }
  },
  mounted () {
    this.init(this.onlineDeposit)
  },
  methods: {
    checkUserAccess () {
      return this.loggedInUser.role.role !== this.userManager.userRoles[1].value
    },
    init (onlineDeposit) {
      this.addressInput = onlineDeposit.address
      this.postalCodeInput = onlineDeposit.postalCode
    },
    cancelEdit () {
      this.editBtnClicked = false
      this.addressChange = false
      this.postalCodeChange = false
      this.addressInput = this.onlineDeposit.address
      this.postalCodeInput = this.onlineDeposit.postalCode
    },
    async confirmEdit () {
      const request = {}
      if (this.addressChange) {
        request.newAddress = this.addressInput
      }
      if (this.postalCodeChange) {
        request.newPostalCode = this.postalCodeInput
      }

      await onlineDepositManager.editAddress(this.$route.params.id, request, this.$axios)

      this.editBtnClicked = false
      this.addressChange = false
      this.postalCodeChange = false
    }
  }
}
</script>
