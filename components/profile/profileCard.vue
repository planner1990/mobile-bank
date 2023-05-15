<template>
  <v-card
    class="d-flex
      justify-center
      align-content-center
      rounded-lg
      flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('user.profile') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-layout justify-space-between align-center class="my-2">
        <v-col>
          <show-item
            :icon="'mdi-identifier'"
            :title="$t('user.id')"
            :content="currentUser.id"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-account'"
            :title="$t('user.username')"
            :content="currentUser.username"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-account-cog'"
            :title="$t('user.role')"
            :content="$t('user.roles.' + currentUser.role.role)"
          />
        </v-col>
        <!--        <v-col>-->
        <!--          <show-item-->
        <!--            :icon="'mdi-account-check'"-->
        <!--            :title="$t('common.status')"-->
        <!--            :content="$t('user.status.' + currentUser.status)"-->
        <!--          />-->
        <!--        </v-col>-->
      </v-layout>
      <v-divider />
      <v-layout v-if="provinceCode || branchCode || cityCode" justify-space-between align-center class="my-2">
        <v-col>
          <province-viewer
            v-model="provinceCode"
            :condition="'requestReview'"
          />
        </v-col>
        <v-col>
          <city-viewer
            v-model="cityCode"
            :province="provinceCode"
            :condition="'requestReview'"
          />
        </v-col>
        <v-col>
          <branch-viewer
            v-model="branchCode"
            :condition="'requestReview'"
            :icon="'mdi-bank'"
          />
        </v-col>
      </v-layout>
      <v-divider />
      <v-layout row justify-center align-center class="py-5">
        <v-btn
          elevation="5"
          style="font-size: 1rem"
          depressed
          class="lightBlue primary--text font-weight-bold"
          @click="editUserDialog = true"
        >
          {{ $t('profile.changePassButton') }}
        </v-btn>
        <v-dialog
          v-model="editUserDialog"
          persistent
          max-width="350"
        >
          <v-card>
            <v-card-title primary-title class="lightGreen font-weight-bold text-h5">
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
              <v-spacer />
              <v-btn
                class="mb-2"
                small
                color="success"
                :loading="loading"
                @click="editUser"
              >
                {{ $t('buttons.submit') }}
              </v-btn>
              <v-btn
                class="mb-2"
                small
                color="error"
                @click="closeEditUserDialog"
              >
                {{ $t('buttons.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userManager from '~/repository/user_manager'
import provinceViewer from '~/components/location/provinceViewer'
import cityViewer from '~/components/location/cityViewer'
import branchViewer from '~/components/location/branchViewer'
export default {
  name: 'ProfileCard',
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
