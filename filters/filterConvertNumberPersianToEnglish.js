import Vue from 'vue'
export default () => {
  Vue.filter('filterConvertNumberPersianToEnglish', (persianNumber) => {
    if (persianNumber != null) {
      return persianNumber.replace(/[۰-۹]/g, digit => String.fromCharCode(digit.charCodeAt(0) - 1728))
    } else {
      return 'تعیین نشده'
    }
  })
}
