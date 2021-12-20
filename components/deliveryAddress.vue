<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.deliveryAddress') }}
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
            :label="$t('onlineDepositFields.deliveryAddress')"
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
            :label="$t('onlineDepositFields.deliveryPostalCode')"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-expand-transition>
      <v-card-actions
        v-show="onlineDeposit.status === $t('onlineDepositStatus.IN_PROCESS.value')"
        class="px-2 py-2"
      >
        <v-col>
          <v-divider class="py-2" />
          <v-btn
            v-if="!editBtnClicked"
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
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import onlineDepositManager from '~/repository/online_deposit_manager'
import userManager from '~/repository/user_manager'

export default {
  name: 'DeliveryAddress',
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
      loggedInUser: 'user/me',
      onlineDeposit: 'onlineDepositStore/currentState'
    }),
    addressChange () {
      if (this.addressInput === null && this.onlineDeposit.deliveryAddress === null) {
        return false
      }
      if (this.addressInput === null && this.onlineDeposit.deliveryAddress === '') {
        return false
      }
      if (this.addressInput === '' && this.onlineDeposit.deliveryAddress === null) {
        return false
      }
      return this.addressInput !== this.onlineDeposit.deliveryAddress
    },
    postalCodeChange () {
      if (this.postalCodeInput === null && this.onlineDeposit.deliveryPostalCode === null) {
        return false
      }
      if (this.postalCodeInput === null && this.onlineDeposit.deliveryPostalCode === '') {
        return false
      }
      if (this.postalCodeInput === '' && this.onlineDeposit.deliveryPostalCode === null) {
        return false
      }
      return Number(this.postalCodeInput) !== Number(this.onlineDeposit.deliveryPostalCode)
    },
    addressPrefix () {
      let prefix = ''
      if (this.onlineDeposit.deliveryProvinceName) {
        prefix = this.onlineDeposit.deliveryProvinceName
        if (this.onlineDeposit.deliveryCityName) {
          prefix += ' - ' + this.onlineDeposit.deliveryCityName + ' - '
        }
      } else if (this.onlineDeposit.deliveryCityName) {
        prefix = this.onlineDeposit.deliveryCityName + ' - '
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
      if (
        this.loggedInUser.role.role === this.userManager.userRoles[1].value
      ) {
        return false
      } else {
        return true
      }
    },
    init (onlineDeposit) {
      this.addressInput = onlineDeposit.deliveryAddress
      this.postalCodeInput = onlineDeposit.deliveryPostalCode
    },
    cancelEdit () {
      this.editBtnClicked = false
      this.addressChange = false
      this.postalCodeChange = false
      this.addressInput = this.onlineDeposit.deliveryAddress
      this.postalCodeInput = this.onlineDeposit.deliveryPostalCode
    },
    async confirmEdit () {
      const request = {}
      if (this.addressChange) {
        request.newDeliveryAddress = this.addressInput
      }
      if (this.postalCodeChange) {
        request.newDeliveryPostalCode = this.postalCodeInput
      }

      await onlineDepositManager.editAddress(this.$route.params.id, request, this.$axios)

      this.editBtnClicked = false
      this.addressChange = false
      this.postalCodeChange = false
    }
  }
}
</script>
