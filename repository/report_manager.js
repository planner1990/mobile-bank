async function onlineDepositReport (request, axios) {
  return await axios.post('report-statistic/online-deposit', request)
}

async function transactionList (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('transaction/list', request)
  console.log(rest)
  return rest
}

async function transactionStatistics (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('transaction-statistics/report', request)
  console.log(rest)
  return rest
}

async function transactionDetails (request, axios) {
  console.log('transactionDetails us call')
  const rest = await axios.post('transaction-data/info', request)
  console.log(rest)
  return rest
}

async function operationList (axios) {
  console.log('transactionLisu us call')
  const rest = await axios.get('operation/list')
  console.log(rest)
  return rest
}

async function errorList (request, axios) {
  const rest = await axios.post('error-report/list', request)
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

async function downloadTransactionList (request, axios) {
  return await axios.post('export/transaction', request, { responseType: 'blob' })
}

async function downloadCustomerStatistics (request, axios) {
  console.log('majid')
  return await axios.post('export/customer-statistics-report', request, { responseType: 'blob' })
}
async function downloadCustomer (request, axios) {
  return await axios.post('export/customer', request, { responseType: 'blob' })
}
async function downloadErrorReport (request, axios) {
  return await axios.post('export/error-report-list', request, { responseType: 'blob' })
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

const responseCode = [
  {
    value: '200',
    text: 'report.transactionReport.errorCode.ok'
  },
  {
    value: '400',
    text: 'report.transactionReport.errorCode.BAD_REQUEST'
  }
]

const customerType = [
  {
    value: 'REGISTERED',
    text: 'customer.customerTypeTitle.customer'
  },
  {
    value: 'GUEST',
    text: 'customer.customerTypeTitle.guest'
  }
]

const operation = [
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
    value: 'ANDROID',
    text: 'report.transactionReport.osName.ANDROID'
  },
  {
    value: 'IOS',
    text: 'report.transactionReport.osName.iOS'
  },
  {
    value: 'WEB',
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
  transactionStatistics,
  transactionDetails,
  operationList,
  errorList,
  smsReport,
  downloadSmsReport,
  responseCode,
  status,
  osName,
  operation,
  platform,
  groupBy,
  operationName,
  source,
  customerType,
  downloadOnlineDepositReport,
  downloadOperatorActivity,
  downloadTransactionList,
  downloadCustomer,
  downloadCustomerStatistics,
  downloadErrorReport

}
