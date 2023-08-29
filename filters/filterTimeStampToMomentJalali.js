import Vue from 'vue'
import momentJalali from 'moment-jalaali'

export default () => {
  Vue.filter('filterTimeStampToMomentJalali', (date, format = 'HH:mm jYYYY/jM/jD') => {
    if (date != null) {
      date = new Date(date)
      return momentJalali(date).format(format)
    }
  })
}
