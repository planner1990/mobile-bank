async function onlineDepositReport (request, axios) {
  return await axios.post('report-statistic/online-deposit', request)
}
async function transactionList (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('transaction/list', request)
  console.log(rest)
  return rest
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
    value: '200',
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
    text: 'report.transactionReport.osName.ANDROID'
  },
  {
    value: 'ios',
    text: 'report.transactionReport.osName.iOS'
  },
  {
    value: 'web',
    text: 'report.transactionReport.osName.mobileweb'
  }
]

const platform = [
  {
    value: 'net',
    text: 'report.transactionReport.platform.net'
  },
  {
    value: 'sms',
    text: 'report.transactionReport.platform.sms'
  }
]

const source = [
  {
    value: 'DEP',
    text: 'report.transactionReport.source.DEP'
  },
  {
    value: 'PAN',
    text: 'report.transactionReport.source.PAN'
  },
  {
    value: 'SHETAB',
    text: 'report.transactionReport.source.SHETAB'
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
  { header: 'حساب ' },
  {
    value: 'Deposit_Pay_Bill',
    text: 'پرداخت قبض از حساب',
    url: '/rest/deposit/pay-bill'
  },
  {
    value: 'Deposit_Pay_Loan',
    text: 'پرداخت تسهیلات',
    url: '/rest/deposit/pay-loan'
  },
  {
    value: 'Deposit_Normal_Transfer',
    text: 'انتقال وجه از حساب',
    url: '/rest/deposit/normal-transfer'
  },
  {
    value: 'Deposit_Statement',
    text: 'صورتحساب',
    url: '/rest/deposit/statement'
  }
]

export default {
  onlineDepositReport,
  operatorActivity,
  transactionList,
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
