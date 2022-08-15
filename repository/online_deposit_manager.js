async function getOnlineDeposit (id, axios) {
  return await axios.get('online-deposit/' + id)
}

async function getOnlineDepositList (request, axios) {
  return await axios.post('online-deposit/list', request)
}

async function editAddress (id, request, axios) {
  return await axios.post('online-deposit/edit-address/' + id, request)
}

async function saveUsername (id, request, axios) {
  return await axios.post('online-deposit/save-username-password/' + id, request)
}

async function videoArtificialIntelligence (id, axios) {
  return await axios.get('online-deposit/video-artificial-intelligence/' + id)
}

const onlineDepositStatus = [
  {
    value: 'onlineDepositStatus.INIT.value',
    name: 'onlineDepositStatus.INIT.name'
  },
  {
    value: 'onlineDepositStatus.IN_PROGRESS.value',
    name: 'onlineDepositStatus.IN_PROGRESS.name'
  },
  {
    value: 'onlineDepositStatus.REGISTRY_INQUIRY_REJECTED.value',
    name: 'onlineDepositStatus.REGISTRY_INQUIRY_REJECTED.name'
  },
  {
    value: 'onlineDepositStatus.REGISTRY_INQUIRY_ERROR.value',
    name: 'onlineDepositStatus.REGISTRY_INQUIRY_ERROR.name'
  },
  {
    value: 'onlineDepositStatus.READY_FOR_PROCESS.value',
    name: 'onlineDepositStatus.READY_FOR_PROCESS.name'
  },
  {
    value: 'onlineDepositStatus.IN_PROCESS.value',
    name: 'onlineDepositStatus.IN_PROCESS.name'
  },
  {
    value: 'onlineDepositStatus.DOC_CONFIRMED.value',
    name: 'onlineDepositStatus.DOC_CONFIRMED.name'
  },
  {
    value: 'onlineDepositStatus.CUSTOMER_CREATED.value',
    name: 'onlineDepositStatus.CUSTOMER_CREATED.name'
  },
  {
    value: 'onlineDepositStatus.DEPOSIT_OPENED.value',
    name: 'onlineDepositStatus.DEPOSIT_OPENED.name'
  },
  {
    value: 'onlineDepositStatus.SHARED_MONEY.value',
    name: 'onlineDepositStatus.SHARED_MONEY.name'
  },
  {
    value: 'onlineDepositStatus.READY_FOR_CARD_ISSUE.value',
    name: 'onlineDepositStatus.READY_FOR_CARD_ISSUE.name'
  },
  {
    value: 'onlineDepositStatus.REJECTED.value',
    name: 'onlineDepositStatus.REJECTED.name'
  },
  {
    value: 'onlineDepositStatus.CARD_SENT.value',
    name: 'onlineDepositStatus.CARD_SENT.name'
  },
  {
    value: 'onlineDepositStatus.MOBILE_DONE.value',
    name: 'onlineDepositStatus.MOBILE_DONE.name'
  },
  {
    value: 'onlineDepositStatus.CARD_PIN_SET.value',
    name: 'onlineDepositStatus.CARD_PIN_SET.name'
  },
  {
    value: 'onlineDepositStatus.EPAY_PIN_SET.value',
    name: 'onlineDepositStatus.EPAY_PIN_SET.name'
  },
  {
    value: 'onlineDepositStatus.CARD_REGISTERED.value',
    name: 'onlineDepositStatus.CARD_REGISTERED.name'
  },
  {
    value: 'onlineDepositStatus.REFUND.value',
    name: 'onlineDepositStatus.REFUND.name'
  }
]
const onlineDepositStatusSmsEnabled = [
  {
    value: 'onlineDepositStatus.DOC_CONFIRMED.value',
    name: 'onlineDepositStatus.DOC_CONFIRMED.name'
  },
  {
    value: 'onlineDepositStatus.CUSTOMER_CREATED.value',
    name: 'onlineDepositStatus.CUSTOMER_CREATED.name'
  },
  {
    value: 'onlineDepositStatus.DEPOSIT_OPENED.value',
    name: 'onlineDepositStatus.DEPOSIT_OPENED.name'
  },
  {
    value: 'onlineDepositStatus.SHARED_MONEY.value',
    name: 'onlineDepositStatus.SHARED_MONEY.name'
  },
  {
    value: 'onlineDepositStatus.READY_FOR_CARD_ISSUE.value',
    name: 'onlineDepositStatus.READY_FOR_CARD_ISSUE.name'
  },
  {
    value: 'onlineDepositStatus.REJECTED.value',
    name: 'onlineDepositStatus.REJECTED.name'
  },
  {
    value: 'onlineDepositStatus.CARD_SENT.value',
    name: 'onlineDepositStatus.CARD_SENT.name'
  },
  {
    value: 'onlineDepositStatus.MOBILE_DONE.value',
    name: 'onlineDepositStatus.MOBILE_DONE.name'
  },
  {
    value: 'onlineDepositStatus.CARD_PIN_SET.value',
    name: 'onlineDepositStatus.CARD_PIN_SET.name'
  },
  {
    value: 'onlineDepositStatus.EPAY_PIN_SET.value',
    name: 'onlineDepositStatus.EPAY_PIN_SET.name'
  },
  {
    value: 'onlineDepositStatus.CARD_REGISTERED.value',
    name: 'onlineDepositStatus.CARD_REGISTERED.name'
  },
  {
    value: 'onlineDepositStatus.REFUND.value',
    name: 'onlineDepositStatus.REFUND.name'
  }
]
const nationalCardStatus = [
  {
    value: 'confirm',
    text: 'dropDownItems.nationalCardImage.confirm'
  },
  {
    value: 'notMatch',
    text: 'dropDownItems.nationalCardImage.notMatch'
  },
  {
    value: 'notClear',
    text: 'dropDownItems.nationalCardImage.notClear'
  },
  {
    value: 'notValid',
    text: 'dropDownItems.nationalCardImage.notValid'
  }
]
const signatureStatus = [
  {
    value: 'confirm',
    text: 'dropDownItems.signatureImage.confirm'
  },
  {
    value: 'notClear',
    text: 'dropDownItems.signatureImage.notClear'
  },
  {
    value: 'notValid',
    text: 'dropDownItems.signatureImage.notValid'
  }
]
const videoStatus = [
  {
    value: 'confirm',
    text: 'dropDownItems.video.confirm'
  },
  {
    value: 'hijab',
    text: 'dropDownItems.video.hijab'
  },
  {
    value: 'notClearVoice',
    text: 'dropDownItems.video.notClearVoice'
  },
  {
    value: 'notClearFace',
    text: 'dropDownItems.video.notClearFace'
  },
  {
    value: 'notMatch',
    text: 'dropDownItems.video.notMatch'
  },
  {
    value: 'notValid',
    text: 'dropDownItems.video.notValid'
  }
]
const depositType = [
  '700',
  '744'
]
const deliveryType = [
  {
    value: 'BRANCH',
    text: 'deliveryType.branch'
  },
  {
    value: 'ADDRESS',
    text: 'deliveryType.address'
  }
]
export default {
  getOnlineDeposit,
  getOnlineDepositList,
  editAddress,
  onlineDepositStatus,
  onlineDepositStatusSmsEnabled,
  depositType,
  deliveryType,
  nationalCardStatus,
  signatureStatus,
  videoStatus,
  videoArtificialIntelligence,
  saveUsername
}
