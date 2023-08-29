<template>
  <v-app>
    <!-- Menu horizontal -->
    <!-- Menu horizontal -->
    <!-- Menu horizontal -->
    <v-app-bar
      id="app-bar"
      :clipped-left="!rtl"
      fixed
      dark
      app
      dense
      class="lightBrownN"
    >
      <div style="min-width: 165px;">
        <v-img
          contain
          style="width: 140px;cursor: pointer"
          :src="require('@/static/img/logo/logo_mehr.png')"
          @click="$router.push('/profile')"
        />
      </div>

      <div class="vl" />

      <!-- menu -->
      <!-- menu -->
      <!-- menu -->
      <v-bottom-navigation v-model="active_tab" class="text-align: right" horizontal style="background-color: transparent;box-shadow: unset;justify-content: right;">
        <v-btn value="1" style="color: #fff;font-size: 15px;">
          <v-menu
            bottom
            :offset-y="true"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <svg
                  style="margin-right: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2602 8.20422L12.2836 14.1809C11.5777 14.8867 10.4227 14.8867 9.7169 14.1809L3.74023 8.20422"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span style="margin-top: 2px;font-size: 15px;">
                  تراکنش ها
                </span>
                <svg
                  style="margin-left: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.8539 9.56997L18.9555 13.4016C18.1855 16.7108 16.6639 18.0491 13.8039 17.7741C13.3455 17.7375 12.8505 17.655 12.3189 17.5266L10.7789 17.16C6.95636 16.2525 5.77386 14.3641 6.6722 10.5325L7.57053 6.69163C7.75386 5.91247 7.97386 5.23413 8.24886 4.67497C9.32136 2.45663 11.1455 1.8608 14.2072 2.58497L15.738 2.94247C19.5789 3.8408 20.7522 5.7383 19.8539 9.56997V9.56997Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.5865 7.81922L16.0323 8.94672M10.6882 11.3667L13.3465 12.045M13.8048 17.7742C13.2365 18.1592 12.5215 18.48 11.6507 18.7642L10.2023 19.2409C6.56316 20.4142 4.64732 19.4334 3.46482 15.7942L2.29149 12.1734C1.11816 8.53422 2.08982 6.60922 5.72899 5.43588L7.17732 4.95922C7.55316 4.84005 7.91066 4.73922 8.24982 4.67505C7.97482 5.23422 7.75482 5.91255 7.57149 6.69172L6.67316 10.5325C5.77482 14.3642 6.95732 16.2525 10.7798 17.16L12.3198 17.5267C12.8515 17.655 13.3465 17.7375 13.8048 17.7742V17.7742Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="checkUserAccessForMenu('/transactionReport', 'menu')" :to="'/transactionReport'">
                <v-list-item-title key="1" style="font-size: 15px;">
                  لیست تراکنش ها
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/transaction-statistics', 'menu')" :to="'/transaction-statistics'">
                <v-list-item-title key="2" style="font-size: 15px;">
                  آمار تراکنش ها
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn v-if="checkUserAccessForMenu('/transactionQuery', 'menu')" value="2" :to="'/transactionQuery'" style="color: #fff;font-size: 15px;">
          درخواست ها

          <svg
            style="margin-left: 10px"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.8539 9.56997L18.9555 13.4016C18.1855 16.7108 16.6639 18.0491 13.8039 17.7741C13.3455 17.7375 12.8505 17.655 12.3189 17.5266L10.7789 17.16C6.95636 16.2525 5.77386 14.3641 6.6722 10.5325L7.57053 6.69163C7.75386 5.91247 7.97386 5.23413 8.24886 4.67497C9.32136 2.45663 11.1455 1.8608 14.2072 2.58497L15.738 2.94247C19.5789 3.8408 20.7522 5.7383 19.8539 9.56997V9.56997Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.5865 7.81922L16.0323 8.94672M10.6882 11.3667L13.3465 12.045M13.8048 17.7742C13.2365 18.1592 12.5215 18.48 11.6507 18.7642L10.2023 19.2409C6.56316 20.4142 4.64732 19.4334 3.46482 15.7942L2.29149 12.1734C1.11816 8.53422 2.08982 6.60922 5.72899 5.43588L7.17732 4.95922C7.55316 4.84005 7.91066 4.73922 8.24982 4.67505C7.97482 5.23422 7.75482 5.91255 7.57149 6.69172L6.67316 10.5325C5.77482 14.3642 6.95732 16.2525 10.7798 17.16L12.3198 17.5267C12.8515 17.655 13.3465 17.7375 13.8048 17.7742V17.7742Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </v-btn>
        <v-btn value="3" style="color: #fff;font-size: 15px;">
          <v-menu
            bottom
            :offset-y="true"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <svg
                  style="margin-right: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2602 8.20422L12.2836 14.1809C11.5777 14.8867 10.4227 14.8867 9.7169 14.1809L3.74023 8.20422"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span style="margin-top: 2px;font-size: 15px;">
                  استرداد وجه
                </span>
                <svg
                  style="margin-left: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.2487 20.1667H13.7487C18.332 20.1667 20.1654 18.3334 20.1654 13.75V8.25004C20.1654 3.66671 18.332 1.83337 13.7487 1.83337H8.2487C3.66536 1.83337 1.83203 3.66671 1.83203 8.25004V13.75C1.83203 18.3334 3.66536 20.1667 8.2487 20.1667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M8.25052 14.0983H12.7605C14.3189 14.0983 15.5839 12.8333 15.5839 11.275C15.5839 9.71666 14.3189 8.45166 12.7605 8.45166H6.55469"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="M7.85714 9.87249L6.41797 8.42415L7.85714 6.98499" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="checkUserAccessForMenu('/refund-report', 'menu')" :to="'/refund-report'">
                <v-list-item-title key="1" style="font-size: 15px;">
                  لیست استرداد
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/refund-statistics', 'menu')" :to="'/refund-statistics'">
                <v-list-item-title key="2" style="font-size: 15px;">
                  آمار استرداد وجه
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn v-if="checkUserAccessForMenu('/charge-report', 'menu')" value="4" :to="'/charge-report'" style="color: #fff;font-size: 15px;">
          شارژ ها

          <svg
            style="margin-left: 10px"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.2487 20.1667H13.7487C18.332 20.1667 20.1654 18.3334 20.1654 13.75V8.25004C20.1654 3.66671 18.332 1.83337 13.7487 1.83337H8.2487C3.66536 1.83337 1.83203 3.66671 1.83203 8.25004V13.75C1.83203 18.3334 3.66536 20.1667 8.2487 20.1667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.0404 11C16.0404 13.7867 13.7854 16.0417 10.9987 16.0417C8.21203 16.0417 6.5162 13.2367 6.5162 13.2367M6.5162 13.2367H8.78953M6.5162 13.2367V15.7575M5.95703 11C5.95703 8.21337 8.1937 5.95837 10.9987 5.95837C14.3629 5.95837 16.0404 8.76337 16.0404 8.76337M16.0404 8.76337V6.24254M16.0404 8.76337H13.8037" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </v-btn>
        <v-btn v-if="checkUserAccessForMenu('/bill-report', 'menu')" value="5" :to="'/bill-report'" style="color: #fff;font-size: 15px;">
          استعلام قبض

          <svg
            style="margin-left: 10px"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.2487 13.5208L13.7487 8.02079M17.8737 11.4583C17.8737 10.8505 18.1151 10.2676 18.5449 9.83784C18.9747 9.40807 19.5576 9.16663 20.1654 9.16663V8.24996C20.1654 4.58329 19.2487 3.66663 15.582 3.66663H6.41536C2.7487 3.66663 1.83203 4.58329 1.83203 8.24996V8.70829C2.43982 8.70829 3.02271 8.94974 3.45248 9.37951C3.88226 9.80928 4.1237 10.3922 4.1237 11C4.1237 11.6077 3.88226 12.1906 3.45248 12.6204C3.02271 13.0502 2.43982 13.2916 1.83203 13.2916V13.75C1.83203 17.4166 2.7487 18.3333 6.41536 18.3333H15.582C19.2487 18.3333 20.1654 17.4166 20.1654 13.75C19.5576 13.75 18.9747 13.5085 18.5449 13.0787C18.1151 12.649 17.8737 12.0661 17.8737 11.4583Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.7461 13.5208H13.7543M8.24609 8.47913H8.25343" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </v-btn>
        <v-btn value="6" style="color: #fff;font-size: 15px;">
          <v-menu
            bottom
            :offset-y="true"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <svg
                  style="margin-right: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2602 8.20422L12.2836 14.1809C11.5777 14.8867 10.4227 14.8867 9.7169 14.1809L3.74023 8.20422"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span style="margin-top: 2px;font-size: 15px;">
                  گزارشات &nbsp;
                </span>
                <svg
                  style="margin-left: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33333 1.83337V4.58337M14.6667 1.83337V4.58337M6.41667 11.9167H13.75M6.41667 15.5834H11M14.6667 3.20837C17.7192 3.37337 19.25 4.53754 19.25 8.84587V14.5109C19.25 18.2875 18.3333 20.1759 13.75 20.1759H8.25C3.66667 20.1759 2.75 18.2875 2.75 14.5109V8.84587C2.75 4.53754 4.28083 3.38254 7.33333 3.20837H14.6667Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="checkUserAccessForMenu('/error-report', 'menuReport')" :to="'/error-report'">
                <v-list-item-title key="1" style="font-size: 15px;">
                  گزارش خطا
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/incomeReport', 'menuReport')" :to="'/incomeReport'">
                <v-list-item-title key="2" style="font-size: 15px;">
                  گزارش درآمد
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/transaction-status', 'menuReport')" :to="'/transaction-status'">
                <v-list-item-title key="3" style="font-size: 15px;">
                  نمودار تراکنش ها
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/transfer', 'menu')" :to="'/transfer'">
                <v-list-item-title key="3" style="font-size: 15px;">
                  انتقال وجه
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn value="7" style="color: #fff;font-size: 15px;">
          <v-menu
            bottom
            :offset-y="true"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <svg
                  style="margin-right: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2602 8.20422L12.2836 14.1809C11.5777 14.8867 10.4227 14.8867 9.7169 14.1809L3.74023 8.20422"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span style="margin-top: 2px;font-size: 15px;">
                  سایر &nbsp;&nbsp;&nbsp;
                </span>
                <svg
                  style="margin-left: 10px"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.2487 20.1667H13.7487C18.332 20.1667 20.1654 18.3334 20.1654 13.75V8.25004C20.1654 3.66671 18.332 1.83337 13.7487 1.83337H8.2487C3.66536 1.83337 1.83203 3.66671 1.83203 8.25004V13.75C1.83203 18.3334 3.66536 20.1667 8.2487 20.1667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14.6624 11H14.6715M10.9948 11H11.004M7.32812 11H7.33546" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="checkUserAccessForMenu('/offer', 'menu')" :to="'/offer'">
                <v-list-item-title key="1" style="font-size: 15px;">
                  پیشنهاد روز
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/customer', 'menu')" :to="'/customer'">
                <v-list-item-title key="1" style="font-size: 15px;">
                  لیست کاربران
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/customer-statistics', 'menu')" :to="'/customer-statistics'">
                <v-list-item-title key="2" style="font-size: 15px;">
                  آمار کاربران
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="checkUserAccessForMenu('/users', 'menu')" :to="'/users'">
                <v-list-item-title key="3" style="font-size: 15px;">
                  مدیران سیستم
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-bottom-navigation>

      <v-spacer />

      <!-- close -->
      <!-- close -->
      <!-- close -->
      <v-btn icon style="width: 80px" @click="doLogout">
        <span style="font-size: 16px">{{ $t('login.logout') }}</span>

        <svg
          style="margin-right: 5px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1 16.44C14.79 20.04 12.94 21.51 8.89 21.51H8.76C4.29 21.51 2.5 19.72 2.5 15.25L2.5 8.73998C2.5 4.26998 4.29 2.47998 8.76 2.47998H8.89C12.91 2.47998 14.76 3.92998 15.09 7.46998M9 12L20.38 12M18.15 15.35L21.5 12L18.15 8.64998"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </v-btn>
      <v-spacer />
    </v-app-bar>

    <!-- [main] show all pages -->
    <!-- [main] show all pages -->
    <!-- [main] show all pages -->
    <v-main style="background-color:#F5F5F5;margin-top: 15px">
      <snackbar />

      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import { mapActions, mapGetters } from 'vuex'
import snackbar from '@/components/snacks'
import userManager from '~/repository/user_manager'

export default {
  components: {
    snackbar
  },
  middleware: [
    'auth'
  ],
  data () {
    return {
      userManager: userManager,
      active_tab: null,
      colors,
      forceLoadThisComponentMenu: 1,
      clipped: true,
      drawer: true,
      mini: true,
      createUserList: [],
      offerList: [],
      userList: [],
      selected: {}
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
      rtl: 'rtl',
      currentUser: 'user/me',
      loggedInUser: 'user/me'
    })
  },
  methods: {
    ...mapActions({
      init: 'user/init',
      logout: 'user/logout'
    }),
    checkUserAccessForMenu: function (actionCall, type) {
      console.log('===== checkUserAccessForMenu =====', 'role -> ', JSON.stringify(this.loggedInUser), ' permissions -> ', (this.loggedInUser && this.loggedInUser.permissions) ? JSON.stringify(this.loggedInUser.permissions) : null)
      let outcome = true
      // -----------------------
      // roles and permission -> priarity with permissions -> FULL_ACCESS
      // -----------------------

      // high priarity
      // permissions -> FULL_ACCESS
      if (type === 'menu') {
        if (this.loggedInUser && this.loggedInUser.permissions && this.loggedInUser.permissions.find(e => e.name === 'FULL_ACCESS')) {
          outcome = true
          console.log('===== checkUserAccessForMenu ===== 1', 'outcome -> ', outcome)
        }

        // roles
        if (this.loggedInUser && this.loggedInUser.role && this.loggedInUser.role.role && this.loggedInUser.role.role === 'ROLE_PANEL_ADMIN') {
          // All Menu
          outcome = true
          console.log('===== checkUserAccessForMenu ===== 2', 'outcome -> ', outcome)
        } else if (this.loggedInUser && this.loggedInUser.role && this.loggedInUser.role.role && this.loggedInUser.role.role === 'ROLE_PANEL_USER' && actionCall === '/users') {
          // don't see / user
          outcome = false
          console.log('===== checkUserAccessForMenu ===== 3', 'outcome -> ', outcome)
        } else if (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'CREATE_USER')) {
          // don't see root patch
          if ([
            '/',
            '/transactionReport',
            '/offer',
            '/charge-report',
            '/transaction-statistics',
            '/customer',
            '/refund-report'
          ].includes(actionCall)) {
            outcome = false
          } else {
            outcome = true
          }

          console.log('===== checkUserAccessForMenu ===== 4', 'outcome -> ', outcome)
        } else if (
          (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS')) ||
          (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS'))
        ) {
          // don't see root patch
          if (![
            '/',
            '/transactionReport',
            '/users',
            '/transaction-statistics',
            '/customer-statistics',
            '/customer',
            '/offer',
            '/refund-statistics'
          ].includes(actionCall)) {
            outcome = false
          } else {
            outcome = true
          }

          console.log('===== checkUserAccessForMenu ===== 5', 'outcome -> ', outcome)
        } else if (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'OFFER_ACCESS')) {
          // don't see root patch
          if (![
            '/',
            '/transactionReport',
            '/users',
            '/charge-report',
            '/refund-report',
            '/transaction-statistics',
            '/customer-statistics',
            '/customer'
          ].includes(actionCall)) {
            outcome = false
          } else {
            outcome = true
          }

          console.log('===== checkUserAccessForMenu ===== 6', 'outcome -> ', outcome)
        }
      }

      if (type === 'menuReport') {
        if (this.loggedInUser && this.loggedInUser.permissions && this.loggedInUser.permissions.find(e => e.name === 'FULL_ACCESS')) {
          outcome = true
          console.log('===== checkUserAccessForMenu ===== 111', 'outcome -> ', outcome)
        }

        // roles
        if (this.loggedInUser && this.loggedInUser.role && this.loggedInUser.role.role && this.loggedInUser.role.role === 'ROLE_PANEL_ADMIN') {
          // All Menu
          outcome = true
          console.log('===== checkUserAccessForMenu ===== 211', 'outcome -> ', outcome)
        } else if (this.loggedInUser && this.loggedInUser.role && this.loggedInUser.role.role && this.loggedInUser.role.role === 'ROLE_PANEL_USER') {
          // don't see / user
          outcome = true
          console.log('===== checkUserAccessForMenu ===== 311', 'outcome -> ', outcome)
        } else if (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'CREATE_USER')) {
          // don't see all report
          outcome = false
          console.log('===== checkUserAccessForMenu ===== 411', 'outcome -> ', outcome)
        } else if (
          (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS')) &&
          (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'CREATE_USER')) &&
          (this.loggedInUser && this.loggedInUser.permissions && this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS'))
        ) {
          // don't see this patch
          if ([
            '/offer',
            '/users',
            '/charge-report',
            '/refund-report'
          ].includes(actionCall)) {
            outcome = false
          } else {
            outcome = true
          }

          console.log('===== checkUserAccessForMenu ===== 511', 'outcome -> ', outcome)
        }
      }

      console.log('===== checkUserAccessForMenu ===== final', 'outcome -> ', outcome)
      return outcome
    },
    doLogout () {
      this.logout()
      this.$router.push('/login')
    }
    // برای منوی گزارشات
    // checkUserAccessReports () {
    //   if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined ||
    //     (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')) {
    //     // همه
    //     return this.reports
    //   } else if (this.currentUser.permissions.find(e => e.name === 'OFFER_ACCESS') !== undefined) {
    //     // هیچ
    //     return null
    //   } else if (this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS') !== undefined &&
    //     this.currentUser.permissions.find(e => e.name === 'CREATE_USER') !== undefined &&
    //     this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS') !== undefined) {
    //     // همه بجز اینها
    //     return this.reports
    //       .filter(e => e.to !== '/offer')
    //       .filter(e => e.to !== '/users')
    //       .filter(e => e.to !== '/charge-report')
    //       .filter(e => e.to !== '/refund-report')
    //   } else {
    //     // همه بجز اینها
    //     return this.reports.filter(e => e.to === '/offer')
    //   }
    // }
    // برای سایر منو ها بجز گزارشات
    // برای سطح دسترسی
    // checkUserAccessMethod () {
    //   this.items = this.itemsOrginal
    //   this.report = this.reportOrginal

    //   console.log('checkUserAccessMethod Permission', JSON.stringify(this.currentUser), JSON.stringify(this.items))

    //   if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined ||
    //   (this.currentUser.permissions.length === 0 && this.currentUser.role.role === 'ROLE_PANEL_ADMIN')) {
    //     // همه
    //     return this.items
    //   } if (this.currentUser.permissions.find(e => e.name === 'CREATE_USER') !== undefined) {
    //     // همه بجز اینها
    //     this.createUserList = this.items
    //       .filter(e => e.to !== '/offer')
    //       .filter(e => e.to !== '/charge-report')
    //       .filter(e => e.to !== '/transaction-statistics')
    //       .filter(e => e.to !== '/customer-statistics')
    //       .filter(e => e.to !== '/customer')
    //       .filter(e => e.to !== '/refund-report')
    //       .filter(e => e.to !== '/')
    //       .filter(e => e.to !== '/offer')
    //   } if (this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS') !== undefined ||
    //     this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS') !== undefined) {
    //     // همه بجز اینها
    //     this.userList = this.items
    //       .filter(e => e.to !== '/users')
    //       .filter(e => e.to !== '/transaction-statistics')
    //       .filter(e => e.to !== '/customer-statistics')
    //       .filter(e => e.to !== '/customer')
    //       .filter(e => e.to !== '/offer')
    //       .filter(e => e.to !== '/refund-statistics')
    //   } if (this.currentUser.permissions.find(e => e.name === 'OFFER_ACCESS') !== undefined) {
    //     // همه بجز اینها
    //     this.offerList = this.items
    //       .filter(e => e.to !== '/users')
    //       .filter(e => e.to !== '/charge-report')
    //       .filter(e => e.to !== '/refund-report')
    //       .filter(e => e.to !== '/transaction-statistics')
    //       .filter(e => e.to !== '/customer-statistics')
    //       .filter(e => e.to !== '/customer')
    //       .filter(e => e.to !== '/')
    //   }

    //   this.items = this.createUserList.concat(this.userList, this.offerList)
    //   return this.items
    // }
  }
}
</script>

<style scoped>
.copyrightLtr {
  direction: ltr;
}

.header_logo {
  width: 150px;
}

.lightBrownN {
  background-color: #2C2C2C !important;
  border-color: #2C2C2C !important;
  height: 60px !important;
}

/deep/ .v-toolbar__content {
  height: 60px !important;
}

.vl {
  margin-right: 10px;
  margin-left: 10px;
  border-left: 1px solid white;
  height: 20px;
}

/deep/ .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon, .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn, .theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: #fff;
}

/deep/ .v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: unset;
}

/deep/ .v-tabs-slider-wrapper {
  margin: -1px !important;
  height: 4px !important;
}

/deep/ .v-application .white--text {
  color: #f5f5f5 !important;
  caret-color: #f5f5f5 !important;
}

/deep/ .v-tab {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: unset;
}

/deep/ .v-tab:active::before {
  opacity: 1;
  border-radius: 15px 15px 0 0;
}

/deep/ .v-tab:active:before {
  color: #efefef;
}

/deep/ .v-tab::before {
  border-radius: 15px 15px 0 0;
  top: 5px;
  height: 55px;
}

/deep/ .v-tabs-slider {
  background-color: #84bd00;
  height: 100%;
  width: 100%;
}

/deep/ .theme--light.v-list {
  background: #595959;
  color: #fff;
}

/deep/ .v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
  color: #fff;
}

/deep/ .v-list .v-list-item--active {
  color: #3d42d008 !important;
  background-color: rgb(255 255 255 / 16%);
  border-radius: 8px;
  margin: 0 3px 0 3px;
}
/deep/ .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  margin: 0 3px 0 3px;
}

/deep/ .v-menu__content--fixed {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/deep/ .v-item-group.v-bottom-navigation .v-btn {
  max-width: 155px;
}

/deep/ .theme--dark.v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: rgb(255 255 255) !important;
}
/deep/ .v-item-group.v-bottom-navigation .v-btn.v-btn--active:not(:hover):before {
  opacity: 0.2;
}

</style>
