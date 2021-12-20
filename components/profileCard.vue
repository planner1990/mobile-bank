<template>
  <v-card
    class="d-flex
      justify-center
      align-content-center
      rounded-lg
      flex-column"
  >
    <v-card-title primary-title class="lightGreen text-h4">
      {{ $t('profile.title') }}
    </v-card-title>
    <v-card-text
      class="px-5 py-5"
    >
      <v-layout justify-space-between align-center class="my-2">
        <v-col>
          <show-item
            :icon="'mdi-identifier'"
            :title="$t('profile.id')"
            :content="currentUser.id"
          />
        </v-col>
        <v-col>
          <show-item
            :icon="'mdi-account'"
            :title="$t('common.username')"
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
        <v-col>
          <show-item
            :icon="'mdi-account-check'"
            :title="$t('common.status')"
            :content="$t('user.status.' + currentUser.status)"
          />
        </v-col>
      </v-layout>
      <v-divider />
      <v-layout justify-space-between align-center class="my-2">
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'CREATE_USER').length > 0">
          <show-item
            :icon="'mdi-account-key'"
            :title="$t('user.permission')"
            :content="$t('user.permissions.2')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'EXPORT_OPENED_DEPOSIT_FILE').length > 0">
          <show-item
            :icon="'mdi-account-key'"
            :title="$t('user.permission')"
            :content="$t('user.permissions.1')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'OPEN_DEPOSIT_PROCESS').length > 0">
          <show-item
            :icon="'mdi-account-key'"
            :title="$t('user.permission')"
            :content="$t('user.permissions.0')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'UNIVERSAL').length > 0">
          <show-item
            :icon="'mdi-map-marker-check'"
            :title="$t('user.locationAccess.title')"
            :content="$t('user.locationAccess.UNIVERSAL')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'PROVINCE').length > 0">
          <show-item
            :icon="'mdi-map-marker-check'"
            :title="$t('user.locationAccess.title')"
            :content="$t('user.locationAccess.PROVINCE')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'BRANCH').length > 0">
          <show-item
            :icon="'mdi-map-marker-check'"
            :title="$t('user.locationAccess.title')"
            :content="$t('user.locationAccess.BRANCH')"
          />
        </v-col>
        <v-col v-if="currentUser.permissions.filter((e)=> e.name === 'FULL_ACCESS').length > 0">
          <show-item
            :icon="'mdi-map-marker-check'"
            :title="$t('user.locationAccess.title')"
            :content="$t('user.locationAccess.FULL_ACCESS')"
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
                      prepend-icon="mdi-form-textbox-password"
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
                      prepend-icon="mdi-form-textbox-password"
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

export default {
  name: 'ProfileCard',
  data () {
    return {
      loading: false,
      editUserDialog: false,
      showPassword: false,
      showPasswordForRepeat: false,
      newPassword: '',
      repeatTheNewPassword: ''
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
          userManager.updateCurrentUser({ password: this.newPassword }, this.$axios).then(() => {
            this.alert({
              color: 'success',
              content: 'messages.successful'
            })
            this.closeEditUserDialog()
            setTimeout(() => {
              this.doLogout()
            }, 1600)
          }).catch((e) => {
            this.alert({
              color: 'orange',
              content: e.response.data.error_message
            })
            this.loading = false
          })
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
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
