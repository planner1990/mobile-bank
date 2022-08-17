async function getPaymentList (searchModel, axios) {
  return await axios.post('payment/list', searchModel)
}

const paymentStatus = [
  {
    value: 1,
    text: 'common.success'
  },
  {
    value: 0,
    text: 'common.fail'
  }
]
export default {
  getPaymentList,
  paymentStatus
}
