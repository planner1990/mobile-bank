<template>
  <v-card
    class="d-flex align-content-space-around justify-space-between fill-height rounded-lg flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.video') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
      align="center"
    >
      <v-row>
        <v-col>
          <video
            v-if="onlineDeposit.videoUrl"
            playsinline
            type="video/mp4"
            controls="controls"
            :src="onlineDeposit.videoUrl"
          />
          <v-img
            v-if="!onlineDeposit.videoUrl"
            :src="require('@/static/NO_VIDEO.png')"
            max-height="30vh"
            min-height="300"
            contain
          />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn
          v-if="onlineDeposit.videoUrl"
          class="mx-2"
          plain
          :href="onlineDeposit.videoUrl"
          target="_blank"
        >
          <v-icon>
            mdi-cloud-download
          </v-icon>
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-chip
          v-if="onlineDeposit.videoUrl"
          :color="aiColor"
          text-color="white"
          class="d-flex justify-center"
        >
          {{ aiMessage }}
        </v-chip>
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
            v-if="checkUserAccess()"
            class="elevation-0 rounded-lg"
            height="50"
            item-value="value"
            :item-text="(item)=>$t(item.text)"
            :label="$t('common.status')"
            :items="videoStatus"
            :return-object="false"
            hide-details
            solo
            dense
            outlined
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
  name: 'Video',
  props: {
    onlineDeposit: Object({})
  },
  data () {
    return {
      userManager: userManager,
      // loggedInUser: JSON.parse(sessionStorage.getItem('userInfo')),
      videoStatus: onlineDepositManager.videoStatus,
      aiMessage: null,
      aiColor: null
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'user/me',
      defect: 'onlineDepositStore/documentsStatus',
      onlineDepositExist: 'onlineDepositStore/exist'
    })
  },
  mounted () {
    setTimeout(() => {
      if (this.onlineDeposit.videoUrl) { this.callAiService() }
    }, 2000)
  },
  methods: {
    ...mapActions({
      updateDocumentsStatus: 'onlineDepositStore/updateDocumentsStatus'
    }),
    checkUserAccess () {
      return this.loggedInUser.role.role !== this.userManager.userRoles[1].value
    },
    callAiService () {
      onlineDepositManager.videoArtificialIntelligence(this.$route.params.id, this.$axios).then((response) => {
        if (response.data.status === 0) {
          this.aiColor = 'dark'
        } else if (response.data.status === 1) {
          this.aiColor = 'success'
        } else if (response.data.status === 2) {
          this.aiColor = 'warning'
        } else if (response.data.status === 3) {
          this.aiColor = 'danger'
        } else if (response.data.status === 4) {
          this.aiColor = 'black'
        }
        this.aiMessage = response.data.message
      }).catch(() => {
        this.aiColor = 'danger'
        this.aiMessage = this.$i18n.t('messages.aiFailed')
      })
    },
    onChange (event) {
      const documentsStatus = {
        video: event
      }
      this.updateDocumentsStatus(documentsStatus)
    }
  }
}

</script>
