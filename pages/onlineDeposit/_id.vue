<template style="background: #f2f2f2">
  <v-container
    v-if="onlineDepositExist"
    fluid
    grid-list-xl
    class="px-12"
    style="background-color: #f2f2f2"
  >
    <v-layout wrap row>
      <v-flex xs12>
        <online-deposit-request-info />
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex xs12 md6>
        <personal-info
          :online-deposit="onlineDeposit"
        />
      </v-flex>
      <v-flex xs12 md6>
        <national-card
          :online-deposit="onlineDeposit"
        />
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex xs12 md6>
        <video-card
          :online-deposit="onlineDeposit"
        />
      </v-flex>
      <v-flex xs12 md6>
        <signature-card
          :online-deposit="onlineDeposit"
        />
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex xs12 md6>
        <address-card />
      </v-flex>
      <v-flex xs12 md6>
        <delivery-address />
      </v-flex>
    </v-layout>
    <v-layout
      wrap
      row
    >
      <v-flex xs12>
        <opened-deposit-process
          v-if="stepperShow"
        />
      </v-flex>
    </v-layout>
    <v-layout
      wrap
      row
    >
      <v-flex xs12>
        <set-username-password
          v-if="usernamePasswordShow"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PersonalInfo from '~/components/personalInfo'
import NationalCard from '~/components/nationalCard'
import VideoCard from '~/components/video'
import SignatureCard from '~/components/signature'
import AddressCard from '~/components/address'
import DeliveryAddress from '~/components/deliveryAddress'
import OnlineDepositRequestInfo from '~/components/onlineDepositRequestInfo'
import OpenedDepositProcess from '~/components/openedDepositProcess'
import SetUsernamePassword from '~/components/setUsernamePassword'

export default {
  components: {
    SetUsernamePassword,
    OpenedDepositProcess,
    OnlineDepositRequestInfo,
    DeliveryAddress,
    NationalCard,
    PersonalInfo,
    VideoCard,
    SignatureCard,
    AddressCard
  },
  data () {
    return {
      openDepositProcessShow: false
    }
  },
  computed: {
    ...mapGetters({
      onlineDeposit: 'onlineDepositStore/currentState',
      onlineDepositExist: 'onlineDepositStore/exist'
    }),
    stepperShow () {
      return this.onlineDepositExist && this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.INIT.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.IN_PROGRESS.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.REGISTRY_INQUIRY_REJECTED.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.REGISTRY_INQUIRY_ERROR.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.READY_FOR_PROCESS.value') &&
        this.onlineDeposit.status !== this.$i18n.t('onlineDepositStatus.REJECTED.value')
    },
    usernamePasswordShow () {
      return this.onlineDepositExist && (this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.DEPOSIT_OPENED.value') ||
        this.onlineDeposit.status === this.$i18n.t('onlineDepositStatus.SHARED_MONEY.value')) && this.onlineDeposit.username === null
    }
  },
  mounted () {
    this.initOnlineDeposit(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      initOnlineDeposit: 'onlineDepositStore/initOnlineDeposit'
    })
  }
}
</script>
<style
  scoped>

.item {
  min-height: 50px;
  min-width: 80px;
  margin: 10px;
}

.container.grid-list-xl .layout .flex {
  padding: 24px;
}

.container.grid-list-xl .layout:only-child {
  margin: -24px;
}

.container.grid-list-xl .layout:not(:only-child) {
  margin: auto -24px;
}

.container.grid-list-xl *:not(:only-child) .layout:first-child {
  margin-top: -24px;
}

.container.grid-list-xl *:not(:only-child) .layout:last-child {
  margin-bottom: -24px;
}

</style>
