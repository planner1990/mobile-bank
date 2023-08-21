async function transferType (searchModel, axios) {
  return await axios.get('transfer-types')
}

async function transferList (searchModel, axios) {
  return await axios.post('transfer-fees', searchModel)
}

export default {
  transferType,
  transferList
}
