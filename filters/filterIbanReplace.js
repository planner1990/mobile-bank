import Vue from 'vue'

export default () => {
  Vue.filter('filterIbanReplace', (value) => {
    return value.toString().replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1-').trim()
  })
}
