<template>
  <v-app>
    <v-navigation-drawer
      v-if="isLogin"
      id="core-navigation-drawer"
      v-model="drawer"
      dark
      :expand-on-hover="true"
      :mini-variant="mini"
      :clipped="clipped"
      fixed
      app
      :right="rtl"
      color="lightBrown"
      mobile-breakpoint="960"
      width="260"
    >
      <template #img="props">
        <v-img
          v-bind="props"
        />
      </template>
      <v-list v-model="selected">
        <v-list-item>
          <v-list-item-title>
            <v-img
              contain
              :src="require('@/static/mehr-bank-dark.png')"
            />
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-home-analytics"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.reports') }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(item, i) in reports"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$t(item.title)" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      id="app-bar"
      :clipped-left="!rtl"
      fixed
      dark
      app
      dense
      :clipped-right="rtl"
      color="lightBrown"
    >
      <v-app-bar-nav-icon v-show="isLogin" color="success" @click.stop="drawer=!drawer" />
      <v-toolbar-title v-if="isLogin" style="color: #f2f2f2;cursor: pointer;" @click="$router.push('/profile')" v-text="rtyrt" />
      <v-btn
        v-if="isLogin"
        icon
        small
        :to="'/profile'"
      >
        <v-icon>
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="isLogin"
        color="orange"
        style="color: black"
        depressed
        @click="doLogout"
      >
        {{ $t('login.logout') }}
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer :absolute="true" app>
      <span>
        &copy; {{ new Date().getFullYear() }} {{ $t('company') }}
        <v-icon small>mdi-account-group</v-icon>
      </span>
    </v-footer>
    <snackbar />
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
      colors,
      // loggedInUser: JSON.parse(sessionStorage.getItem('userInfo')),
      // barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      clipped: true,
      drawer: true,
      mini: true,
      selected: {},
      items: [
        {
          icon: 'mdi-apps',
          title: 'menu.transaction',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'menu.transactionStatistics',
          to: '/transaction-statistics'
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.customerStatistics',
          to: '/customer-statistics'
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.customer',
          to: '/customer'
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.charge',
          to: '/charge-report'
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.refund',
          to: '/refund-report'
        }
      ],
      reports: [
        {
          icon: 'mdi-chart-bell-curve',
          title: 'menu.error',
          to: '/error-report'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
      rtl: 'rtl'
      // loggedInUser: 'user/me'
    })
    // checkUserAccess: function () {
    //   const createExcelPermission = this.loggedInUser.permissions.find(e => e.name === this.userManager.userPermissions[1].value)
    //   if (this.loggedInUser.role.role === this.userManager.userRoles[0].value) {
    //     return this.items
    //   } else if (this.loggedInUser.role.role === this.userManager.userRoles[1].value && createExcelPermission !== undefined) {
    //     return this.items.filter(e => e.to !== '/users')
    //   } else if (this.loggedInUser.role.role === this.userManager.userRoles[1].value) {
    //     return this.items.filter(e => e.to !== '/users').filter(e => e.to !== '/create-excel')
    //   } else if (this.loggedInUser.role.role === this.userManager.userRoles[2].value) {
    //     return this.items.filter(e => e.to === '/')
    //   }
    //   return []
    // },
    // checkAccessLevelsForReportingPages: function () {
    //   if (this.loggedInUser.role.role === this.userManager.userRoles[0].value) {
    //     return this.reports
    //   } else {
    //     return this.reports.filter(e => e.to !== '/operator-report')
    //   }
    // }
  },
  methods: {
    ...mapActions({
      init: 'user/init',
      logout: 'user/logout'
    }),
    doLogout () {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>
