import Vue from 'vue'

export default () => {
  Vue.filter('filterCardReplace', (value) => {
    return value.toString().replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4')
  })
}
