<template>
  <div style="text-align:center;padding-right: 5%;padding-left: 5%;">
    <!-- version -->
    <!-- version -->
    <!-- version -->
    <v-card
      class="d-flex
        mb-10
        justify-center
        align-content-center
        rounded-lg
        flex-column"
    >
      <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
        نسخه برنامه
      </v-card-title>

      <v-card-text
        class="px-5 py-5"
      >
        <div class="copyrightLtr" style="width: 100%;">
          <span style="float: right;">
            {{ $t('projectName') }} - {{ $t('company') }}
            <v-icon small>mdi-copyright</v-icon>
          </span>
          <span style="float: left;">
            <v-chip>{{ $t('version') }}</v-chip>
          </span>
        </div>
      </v-card-text>
    </v-card>

    <!-- user profile -->
    <!-- user profile -->
    <!-- user profile -->
    <v-card
      class="d-flex
      justify-center
      align-content-center
      rounded-lg
      flex-column"
    >
      <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
        {{ $t('profile.title') }}
      </v-card-title>

      <v-card-text
        class="px-5 py-5"
      >
        <v-layout justify-space-between align-center class="my-2">
          <v-col cols="2">
            <show-item
              :icon="'mdi-identifier'"
              :title="$t('user.id')"
              :content="currentUser.id"
            />
          </v-col>
          <v-col cols="2">
            <show-item
              :icon="'mdi-account'"
              :title="$t('user.username')"
              :content="currentUser.username"
            />
          </v-col>
          <v-col cols="2">
            <show-item
              :icon="'mdi-account-cog'"
              :title="$t('user.role')"
              :content="$t('user.roles.' + currentUser.role.role)"
            />
          </v-col>
          <v-col v-if="provinceCode" cols="2">
            <province-viewer
              v-model="provinceCode"
              :condition="'requestReview'"
            />
          </v-col>
          <v-col v-if="cityCode" cols="2">
            <city-viewer
              v-model="cityCode"
              :province="provinceCode"
              :condition="'requestReview'"
            />
          </v-col>
          <v-col v-if="branchCode" cols="2">
            <branch-viewer
              v-model="branchCode"
              :condition="'requestReview'"
              :icon="'mdi-bank'"
            />
          </v-col>
          <!--        <v-col cols="2">-->
          <!--          <show-item-->
          <!--            :icon="'mdi-account-check'"-->
          <!--            :title="$t('common.status')"-->
          <!--            :content="$t('user.status.' + currentUser.status)"-->
          <!--          />-->
          <!--        </v-col>-->
        </v-layout>

        <v-divider />

        <v-layout row justify-center align-center class="py-5">
          <v-btn
            elevation="5"
            depressed
            class="btnSearch"
            style="width: 150px !important;"
            @click="editUserDialog = true"
          >
            {{ $t('profile.changePassButton') }}
          </v-btn>

          <!-- dialog change password بازیابی کلمه عبور -->
          <!-- dialog change password بازیابی کلمه عبور -->
          <!-- dialog change password بازیابی کلمه عبور -->
          <v-dialog
            v-model="editUserDialog"
            persistent
            max-width="350"
          >
            <v-card>
              <!-- title -->
              <!-- title -->
              <!-- title -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="position: absolute;left: 20px; top: 18px;cursor: pointer"
                @click="closeEditUserDialog"
              >
                <g clip-path="url(#clip0_401_143)">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_401_143">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
                {{ $t('profile.passwordRecovery') }}
              </v-card-title>

              <v-container>
                <v-form
                  ref="form"
                >
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="newPassword"
                        :label="$t('profile.password')"
                        :counter="16"
                        :rules="[
                          v => !!v || $t('user.validation.required'),
                          v => (v && v.length <= 16 && v.length >= 7) || $t('user.validation.length')
                        ]"
                        :type="showPassword ? 'text' : 'Password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        required
                        dense
                        outlined
                        @click:append="showPassword = !showPassword"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="repeatTheNewPassword"
                        :label="$t('profile.repeatPassword')"
                        :counter="16"
                        :rules="[
                          v => !!v || $t('user.validation.required'),
                          v => (v && v.length <= 16 && v.length >= 7) || $t('user.validation.length'),
                          v => (v === newPassword) || $t('profile.PasswordMustMatch')
                        ]"
                        :type="showPasswordForRepeat ? 'text' : 'Password'"
                        :append-icon="showPasswordForRepeat ? 'mdi-eye' : 'mdi-eye-off'"
                        required
                        dense
                        outlined
                        @click:append="showPasswordForRepeat = !showPasswordForRepeat"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>

              <v-card-actions>
                <v-btn :loading="loading" :disabled="loading" color="#84BD00" class="btnSend" @click="editUser">
                  {{ $t('buttons.submit') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userManager from '~/repository/user_manager'
import provinceViewer from '~/components/location/provinceViewer'
import cityViewer from '~/components/location/cityViewer'
import branchViewer from '~/components/location/branchViewer'

export default {
  name: 'ProfileCardComponent',
  components: {
    provinceViewer,
    cityViewer,
    branchViewer
  },
  data () {
    return {
      loading: false,
      editUserDialog: false,
      showPassword: false,
      showPasswordForRepeat: false,
      newPassword: '',
      repeatTheNewPassword: '',
      provinceCode: null,
      cityCode: null,
      branchCode: null
    }
  },
  mounted () {
    if (this.currentUser.provinceCode) {
      this.provinceCode = parseInt(this.currentUser.provinceCode)
    }
    if (this.currentUser.cityCode) {
      this.cityCode = parseInt(this.currentUser.cityCode)
    }
    if (this.currentUser.branchCode) {
      this.branchCode = parseInt(this.currentUser.branchCode)
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/me'
    })
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    ...mapActions({
      logout: 'user/logout'
    }),
    doLogout () {
      this.logout()
      this.$router.push('/login')
    },
    editUser () {
      if (this.validate()) {
        this.loading = true
        try {
          userManager.updateUser({ id: this.currentUser.id, password: this.newPassword }, this.currentUser.id, this.$axios).then(() => {
            this.alert({
              color: 'success',
              content: 'messages.successful'
            })
            this.closeEditUserDialog()
            setTimeout(() => {
              this.doLogout()
            }, 1600)
          }).catch((error) => {
            if (error.response) {
              this.alert({
                color: 'orange',
                content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
              })
            } else {
              this.alert({
                color: 'orange',
                content: 'messages.failed'
              })
            }
          })
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        } finally {
          this.closeEditUserDialog()
        }
      }
    },
    closeEditUserDialog () {
      this.editUserDialog = false
      this.loading = false
      this.reset()
      this.resetValidation()
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>
