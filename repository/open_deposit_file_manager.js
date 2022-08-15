async function create (createRequest, axios) {
  return await axios.post('opened-deposit-file/create', createRequest)
}

async function list (listRequest, axios) {
  return await axios.post('opened-deposit-file/list', listRequest)
}

async function update (id, axios) {
  return await axios.post('opened-deposit-file/update/' + id)
}

async function download (id, token, axios) {
  return await axios.get('opened-deposit-file/download/' + id + '?authorization=Bearer ' + token)
}

async function printAddress (id, token, axios) {
  return await axios.get('opened-deposit-file/download/' + id + '?authorization=Bearer ' + token)
}

export default {
  create,
  list,
  update,
  download,
  printAddress
}
