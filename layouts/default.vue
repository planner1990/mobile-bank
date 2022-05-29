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
          v-for="(item, i) in checkUserAccess"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="white">
              {{ item.icon }}
            </v-icon>
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
            v-for="(item, i) in checkUserAccessReports"
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
      v-if="isLogin"
      id="app-bar"
      :clipped-left="!rtl"
      fixed
      app
      :clipped-right="rtl"
      color="lightBrown"
      dense
    >
      <v-app-bar-nav-icon v-show="isLogin" @click.stop="drawer=!drawer">
        <v-icon color="success">
          mdi-menu
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-if="isLogin" style="font-size:0.90rem;color: #f2f2f2;cursor: pointer;" @click="$router.push('/profile')" v-text="currentUser.username" />
      <v-btn
        v-if="isLogin"
        icon
        dark
        small
        :to="'/profile'"
      >
        <v-icon>
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!isLogin"
        color="success"
        nuxt
        to="/login"
        depressed
      >
        {{ $t('login.login') }}
        <v-icon color="white">
          mdi-account-arrow-left
        </v-icon>
      </v-btn>
      <v-btn
        v-if="isLogin"
        color="orange"
        @click="doLogout"
      >
        {{ $t('login.logout') }}
        <v-icon>
          mdi-account-arrow-right
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer :fixed="true" app>
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
      createUserList: [],
      offerList: [],
      userList: [],
      selected: {},
      items: [
        {
          icon: 'mdi-apps',
          title: 'menu.transaction',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'menu.transactionQuery',
          to: '/transactionQuery'
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
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.offer',
          to: '/offer'
        },
        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'menu.users',
          to: '/users'
        }
      ],
      reports: [
        {
          icon: 'mdi-chart-bell-curve',
          title: 'menu.error',
          to: '/error-report'
        },
        {
          icon: 'mdi-chart-bell-curve',
          title: 'menu.income',
          to: '/incomeReport'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
      rtl: 'rtl',
      currentUser: 'user/me'
    }),
    checkUserAccess: function () {
      return this.checkUserAccess1()
    },

    checkUserAccessReports () {
      // if (this.currentUser.role !== undefined) {
      console.log('currentUser is role')

      if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined) {
        console.log('currentUser is role2')
        return this.reports
      } else if (this.currentUser.permissions.find(e => e.name === 'OFFER_ACCESS') !== undefined) {
        return null
      } else if (this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS') !== undefined &&
        this.currentUser.permissions.find(e => e.name === 'CREATE_USER') !== undefined &&
        this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS') !== undefined) {
        return this.reports.filter(e => e.to !== '/offer').filter(e => e.to !== '/users').filter(e => e.to !== '/charge-report').filter(e => e.to !== '/refund-report')
      } else {
        return this.reports.filter(e => e.to !== '/offer').filter(e => e.to !== '/users')
      }
    }
  },
  methods: {
    ...mapActions({
      init: 'user/init',
      logout: 'user/logout'
    }),
    doLogout () {
      this.logout()
      this.$router.push('/login')
    },
    checkUserAccess1 () {
      console.log(this.currentUser)
      // if (this.currentUser.role !== undefined) {
      console.log('currentUser is role')
      console.log(this.currentUser.permissions)
      console.log(this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS'))
      if (this.currentUser.permissions.find(e => e.name === 'FULL_ACCESS') !== undefined) {
        return this.items
      } if (this.currentUser.permissions.find(e => e.name === 'CREATE_USER') !== undefined) {
        console.log('currentUser is role1')
        this.createUserList = this.items.filter(e => e.to !== '/offer').filter(e => e.to !== '/charge-report').filter(e => e.to !== '/refund-report')
          .filter(e => e.to !== '/transactionQuery').filter(e => e.to !== '/transaction-statistics')
          .filter(e => e.to !== '/customer-statistics').filter(e => e.to !== '/customer')
          .filter(e => e.to !== '/refund-report').filter(e => e.to !== '/')
      } if (this.currentUser.permissions.find(e => e.name === 'ACCOUNTING_ACCESS') !== undefined ||
        this.currentUser.permissions.find(e => e.name === 'REPORTER_ACCESS') !== undefined) {
        this.userList = this.items.filter(e => e.to !== '/offer').filter(e => e.to !== '/users').filter(e => e.to !== '/charge-report').filter(e => e.to !== '/refund-report')
      } if (this.currentUser.permissions.find(e => e.name === 'OFFER_ACCESS') !== undefined) {
        this.offerList = this.items.filter(e => e.to !== '/users').filter(e => e.to !== '/charge-report').filter(e => e.to !== '/refund-report')
          .filter(e => e.to !== '/transactionQuery').filter(e => e.to !== '/transaction-statistics')
          .filter(e => e.to !== '/customer-statistics').filter(e => e.to !== '/customer')
          .filter(e => e.to !== '/refund-report').filter(e => e.to !== '/')
      } else {
        return this.items.filter(e => e.to !== '/offer')
      }

      const array1 = this.createUserList.concat(this.userList, this.offerList)

      this.items = array1
      console.log('array1')
      console.log(array1)
      console.log(this.items)
      return this.items
    }
  }
}
</script>
