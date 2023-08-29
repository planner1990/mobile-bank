import Vue from 'vue'
import moment from 'moment-jalaali'

export default () => {
  Vue.filter('filterTimeStampToMomentJalali', (date, format = 'HH:mm jYYYY/jM/jD') => {
    if (date != null) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    }
  })
}
