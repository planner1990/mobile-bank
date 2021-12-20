<template>
  <v-card
    class=" fill-height rounded-lg "
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('titles.personalInfo') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-layout justify-space-between align-start>
        <v-flex md9 xs12>
          <v-layout justify-space-between align-center class="my-2">
            <v-col>
              <show-item
                :icon="'mdi-card-account-details'"
                :title="$t('onlineDepositFields.nationalCode')"
                :content="onlineDeposit.nationalCode"
              />
            </v-col>
            <v-col>
              <show-item
                :icon="'mdi-card-bulleted'"
                :title="$t('onlineDepositFields.shenasnameNo')"
                :content="onlineDeposit.shenasnameNo"
              />
            </v-col>
          </v-layout>

          <v-divider />
          <v-layout justify-space-between align-center class="my-2">
            <v-col>
              <show-item
                :icon="'mdi-account'"
                :title="$t('onlineDepositFields.fullName')"
                :content="onlineDeposit.fullName"
              />
            </v-col>
            <v-col>
              <show-item
                :icon="'mdi-account'"
                :title="$t('onlineDepositFields.fatherName')"
                :content="onlineDeposit.fatherName"
              />
            </v-col>
          </v-layout>
          <v-divider />
          <v-layout justify-space-between align-center class="my-2">
            <v-col>
              <show-item
                :icon="'mdi-cake-variant'"
                :title="$t('onlineDepositFields.birthDate')"
                :content="moment(onlineDeposit.birthDate)"
              />
            </v-col>
            <v-col>
              <show-item
                :icon="'mdi-cellphone'"
                :title="$t('onlineDepositFields.mobileNumber')"
                :content="onlineDeposit.mobileNumber"
              />
            </v-col>
          </v-layout>
          <v-divider />
          <v-layout justify-space-between align-center class="my-2">
            <v-col>
              <show-item
                :icon="'mdi-account-hard-hat'"
                :title="$t('onlineDepositFields.job')"
                :content="onlineDeposit.job"
              />
            </v-col>
            <v-col />
          </v-layout>
        </v-flex>
        <v-flex align-self-center md3>
          <v-img
            :src="onlineDeposit.personalImageUrl"
            contain
          />
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import momentJalali from 'moment-jalaali'
import showItem from '~/components/showItem'

export default {
  name: 'PersonalInfo',
  components: {
    showItem
  },
  props: {
    onlineDeposit: Object({})
  },
  methods: {
    moment (date) {
      if (date) {
        return momentJalali(date).format('jYYYY/jM/jD')
      } else {
        return null
      }
    }
  }
}
</script>
