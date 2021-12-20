async function onlineDepositReport (request, axios) {
  return await axios.post('report-statistic/online-deposit', request)
}
async function operatorActivity (request, axios) {
  return await axios.post('report-statistic/operator-activity', request)
}

async function smsReport (request, axios) {
  return await axios.post('report-statistic/sms-enabled', request)
}

async function downloadOnlineDepositReport (request, axios) {
  return await axios.post('export/online-deposit-report', request, { responseType: 'blob' })
}

async function downloadSmsReport (request, axios) {
  return await axios.post('export/sms-enabled', request, { responseType: 'blob' })
}

async function downloadOperatorActivity (request, axios) {
  return await axios.post('export/operator-activity', request, { responseType: 'blob' })
}

const groupBy = [
  {
    value: 'none',
    text: 'report.generalReport.groupBy.none'
  },
  {
    value: 'province',
    text: 'report.generalReport.groupBy.province'
  },
  {
    value: 'city',
    text: 'report.generalReport.groupBy.city'
  },
  {
    value: 'branch',
    text: 'report.generalReport.groupBy.branch'
  },
  {
    value: 'date',
    text: 'report.generalReport.groupBy.date'
  }
]

const status = [
  {
    value: 'successful',
    text: 'report.operatorReport.status.successful'
  },
  {
    value: 'fail',
    text: 'report.operatorReport.status.fail'
  }
]

const errorCode = [
  {
    value: 'ok',
    text: 'report.transactionReport.errorCode.ok'
  },
  {
    value: 'fail',
    text: 'report.transactionReport.errorCode.BAD_REQUEST'
  }
]

const osName = [
  {
    value: 'android',
    text: 'report.transactionReport.osName.android'
  },
  {
    value: 'ios',
    text: 'report.transactionReport.osName.ios'
  },
  {
    value: 'web',
    text: 'report.transactionReport.osName.web'
  }
]

const platform = [
  { header: 'Group 1' },
  {
    value: 'internet',
    text: 'report.transactionReport.platform.internet'
  },
  { header: 'Group 2' },
  {
    value: 'sms',
    text: 'report.transactionReport.platform.sms'
  }
]

const source = [
  {
    value: 'deposit',
    text: 'report.transactionReport.source.card'
  },
  {
    value: 'card',
    text: 'report.transactionReport.source.deposit'
  },
  {
    value: 'shetab',
    text: 'report.transactionReport.source.shetab'
  }
]

const customerType = [
  {
    value: 'customer',
    text: 'customer.customerType1.customer'
  },
  {
    value: 'guest',
    text: 'customer.customerType1.guest'
  }

]

const operationName = [
  { header: 'Group 1' },
  {
    value: 'VIDEO_ARTIFICIAL_INTELLIGENCE',
    text: 'report.operatorReport.operationName.VIDEO_ARTIFICIAL_INTELLIGENCE',
    group: 'Group 1'
  },
  {
    value: 'EDIT_ADDRESS',
    text: 'report.operatorReport.operationName.EDIT_ADDRESS'
  },
  {
    value: 'SAVE_USERNAME',
    text: 'report.operatorReport.operationName.SAVE_USERNAME'
  },
  {
    value: 'CONFIRM_DOCUMENT',
    text: 'report.operatorReport.operationName.CONFIRM_DOCUMENT'
  },
  {
    value: 'REJECT_DOCUMENT',
    text: 'report.operatorReport.operationName.REJECT_DOCUMENT'
  },
  {
    value: 'CREATE_CUSTOMER',
    text: 'report.operatorReport.operationName.CREATE_CUSTOMER'
  },
  {
    value: 'OPEN_DEPOSIT',
    text: 'report.operatorReport.operationName.OPEN_DEPOSIT'
  },
  {
    value: 'SHARE_MONEY',
    text: 'report.operatorReport.operationName.SHARE_MONEY'
  },
  {
    value: 'UPDATE_STATUS_TO_IN_PROGRESS',
    text: 'report.operatorReport.operationName.UPDATE_STATUS_TO_IN_PROGRESS'
  },
  {
    value: 'UPDATE_STATUS_TO_READY_FOR_PROCESS',
    text: 'report.operatorReport.operationName.UPDATE_STATUS_TO_READY_FOR_PROCESS'
  },
  {
    value: 'REVERT_STATUS_TO_READY_FOR_PROCESS',
    text: 'report.operatorReport.operationName.REVERT_STATUS_TO_READY_FOR_PROCESS'
  },
  {
    value: 'UPDATE_STATUS_TO_CARD_SENT',
    text: 'report.operatorReport.operationName.UPDATE_STATUS_TO_CARD_SENT'
  }
]

export default {
  onlineDepositReport,
  operatorActivity,
  smsReport,
  downloadSmsReport,
  status,
  osName,
  errorCode,
  platform,
  groupBy,
  operationName,
  source,
  customerType,
  downloadOnlineDepositReport,
  downloadOperatorActivity
}
