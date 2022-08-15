async function confirmDoc (id, axios) {
  return await axios.post('open-deposit-process/confirm-document/' + id)
}

async function rejectDoc (id, rejectRequest, axios) {
  return await axios.post('open-deposit-process/reject-document/' + id, rejectRequest)
}

async function createCustomer (id, axios) {
  return await axios.post('open-deposit-process/create-customer/' + id)
}

async function openDeposit (id, axios) {
  return await axios.post('open-deposit-process/open-deposit/' + id)
}

async function shareMoney (id, axios) {
  return await axios.post('open-deposit-process/share-money/' + id)
}

async function updateStatusToInProcess (id, axios) {
  return await axios.post('open-deposit-process/update-status/in-progress/' + id)
}

async function revertStatusToReadyForProcess (id, axios) {
  return await axios.post('open-deposit-process/update-status/revert/' + id)
}

async function updateStatusToReadyForProcess (id, axios) {
  return await axios.post('open-deposit-process/update-status/ready-for-process/' + id)
}

async function updateStatusToCardSent (id, axios) {
  return await axios.post('open-deposit-process/update-status/card-sent/' + id)
}

async function removeOnlineDeposit (id, axios) {
  return await axios.post('open-deposit-process/remove/' + id)
}

export default {
  confirmDoc,
  rejectDoc,
  createCustomer,
  openDeposit,
  shareMoney,
  updateStatusToInProcess,
  revertStatusToReadyForProcess,
  updateStatusToReadyForProcess,
  updateStatusToCardSent,
  removeOnlineDeposit
}
