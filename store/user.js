import jwtDecode from 'jwt-decode'
import jwttoken from '@/repository/jwt_token'

const RefreshKey = 'jwtRefreshKey'
const tokenKey = 'jwtKey'
// const userKey = 'userInfo'

export const state = () => ({
  token: null,
  user: null,
  refresh: null
})

export const mutations = {
  setToken (state, token) {
    if (token) {
      const user = jwtDecode(token)
      state.user = JSON.parse(user.usr)
      sessionStorage.setItem(tokenKey, token)
      state.token = token
    }
  },
  setRefresh (state, refresh) {
    if (refresh) {
      localStorage.setItem(RefreshKey, refresh)
      state.refresh = refresh
    }
  },
  setUser (state, data) {
    const user = jwtDecode(data)
    // sessionStorage.setItem(userKey, user.usr)
    state.user = JSON.parse(user.usr)
  },
  logout (state) {
    localStorage.clear()
    sessionStorage.clear()
    state.token = null
    state.user = null
    state.refresh = null
  }
}

export const actions = {
  async init (context) {
    if (typeof sessionStorage !== typeof undefined) {
      const refresh = localStorage.getItem(RefreshKey)
      if (refresh) {
        context.commit('setRefresh', refresh)
        const jwt = sessionStorage.getItem(tokenKey)
        if (jwt) {
          context.commit('setToken', jwt)
        } else {
          await context.dispatch('refreshToken')
        }
      } else {
        context.commit('logout')
      }
    }
  },
  async login (context, payload) {
    try {
      const { data, status } = await jwttoken.login(
        payload.userName,
        payload.password,
        this.$axios
      )
      context.commit('setUser', data.token)
      context.commit('setToken', 'bearer ' + data.token)
      context.commit('setRefresh', data.refresh)
      return status
    } catch (err) {
      if (err.response) {
        return err.response.status
      }
      return 500
    }
  },
  logout (context) {
    context.commit('logout')
  },
  async refreshToken (context) {
    const token = localStorage.getItem(RefreshKey)
    if (token) {
      try {
        const { data, status } = await jwttoken.refreshToken(token)
        if (status >= 200 && status < 300 && !!data.token) {
          context.commit('setToken', 'bearer ' + data.token)
          context.commit('setRefresh', data.refresh)
        } else if (status >= 400) {
          context.commit('logout')
        }
        return status
      } catch (err) {
        context.commit('logout')
      }
    }
    return 401
  }
}

export const getters = {
  getToken: (state, getters, store) => {
    return state.token
  },
  me: (state) => {
    if (state) {
      return state.user
    }
  },
  // me: () => {
  //   return JSON.parse(sessionStorage.getItem(userKey))
  // },
  isLogin: (state) => {
    return '5454545swfdfsfsdfs'
  }
}
