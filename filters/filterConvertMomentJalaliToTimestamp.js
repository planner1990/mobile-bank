import Vue from 'vue'
import momentJalali from 'moment-jalaali'

export default () => {
  Vue.filter('filterConvertMomentJalaliToTimestamp', (date, hour, minute, second) => {
    if (date != null) {
      const year = momentJalali(date, 'jYYYY/jM/jD').format('YYYY')
      const month = momentJalali(date, 'jYYYY/jM/jD').format('MM')
      const day = momentJalali(date, 'jYYYY/jM/jD').format('DD')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, second)
      const d = new Date(gmtDate)
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }
  })
}
