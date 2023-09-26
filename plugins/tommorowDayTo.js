import moment from 'moment-jalaali'

export default {
  methods: {
    tomorrowDayTo: function (date) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() + 1)

      const year = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(yesterday.toLocaleDateString(), 'MM/DD/YYYY').format('jDD')
      if (date) {
        return year + '-' + month + '-' + day
      } else {
        return year + '-' + month + '-' + day + ' ' + '00:00:00'
      }
    }
  }
}
