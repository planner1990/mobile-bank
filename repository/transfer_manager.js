async function transferType (searchModel, axios) {
  return await axios.post('transfer/type', searchModel)
}

async function transferList (axios) {
  return await axios.get('transfer/list')
}

export default {
  transferType,
  transferList
}
