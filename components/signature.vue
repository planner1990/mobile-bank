<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.signatureImage') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-row>
        <v-col>
          <a :href="onlineDeposit.signatureImageUrl" target="_blank">
            <v-img
              :src="onlineDeposit.signatureImageUrl || require('@/static/NO_IMG.png')"
              max-height="30vh"
              min-height="300"
              contain
            />
          </a>
        </v-col>
      </v-row>
    </v-card-text>
    <v-expand-transition>
      <v-card-actions
        v-show="onlineDeposit.status === 'IN_PROCESS'"
        class="px-2 py-2"
      >
        <v-col>
          <v-divider class="py-2" />
          <v-select
            class="rounded-lg"
            height="50"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :label="$t('common.status')"
            :items="signatureStatus"
            :return-object="false"
            hide-details
            dense
            outlined
            solo
            @change="onChange($event)"
          />
        </v-col>
      </v-card-actions>
    </v-expand-transition>
  </v-card>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import onlineDepositManager from '~/repository/online_deposit_manager'
import userManager from '~/repository/user_manager'

export default {
  name: 'Signature',
  props: {
    onlineDeposit: Object({})
  },
  data () {
    return {
      userManager: userManager,
      // loggedInUser: JSON.parse(sessionStorage.getItem('userInfo')),
      signatureStatus: onlineDepositManager.signatureStatus
    }
  },
  computed: {
    ...mapGetters({
      defect: 'onlineDepositStore/documentsStatus',
      loggedInUser: 'user/me'
    })
  },
  methods: {
    ...mapActions({
      updateDocumentsStatus: 'onlineDepositStore/updateDocumentsStatus'
    }),
    checkUserAccess () {
      return this.loggedInUser.role.role !== this.userManager.userRoles[1].value
    },
    onChange (event) {
      const documentsStatus = {
        signature: event
      }
      this.updateDocumentsStatus(documentsStatus)
    }
  }
}
</script>
