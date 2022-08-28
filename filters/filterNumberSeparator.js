import Vue from 'vue'

export default () => {
  Vue.filter('filterNumberSeparator', (number) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      return ''
    }
  })
}
