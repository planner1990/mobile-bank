import Vue from 'vue'

export default () => {
  Vue.filter('filterMobile98Replace', (number) => {
    return number.toString().replace('+98', '0')
  })
}
