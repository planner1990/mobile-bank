import Vue from 'vue'
import momentJalali from 'moment-jalaali'

export default () => {
  Vue.filter('filterMomentJalali', (date, format = 'HH:mm jYYYY/jM/jD') => {
    if (date != null) {
      return momentJalali(date).format(format)
    }
  })
}
