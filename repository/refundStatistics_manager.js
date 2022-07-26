async function details (request, axios) {
  return await axios.post('refund/statistics/details', request)
}

async function confirm (request, axios) {
  return await axios.post('refund/statistics/confirm', request)
}

export default {
  details,
  confirm

}
