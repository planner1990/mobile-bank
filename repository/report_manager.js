async function onlineDepositReport (request, axios) {
  return await axios.post('report-statistic/online-deposit', request)
}

async function transactionList (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('transaction/list', request, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(rest)
  return rest
}

async function chargeList (request, axios) {
  console.log('chargeList us call')
  const rest = await axios.post('charge-report/list', request)
  console.log(rest)
  return rest
}
async function billList (request, axios) {
  console.log('billList us call')
  const rest = await axios.post('bill-report/list', request)
  console.log(rest)
  return rest
}

async function refund (request, axios) {
  console.log('refund us call')
  const rest = await axios.post('refund/refund', request)
  console.log(rest)
  return rest
}

async function refundStatusList (request, axios) {
  console.log('refundStatus us call')
  const rest = await axios.post('refund/refundList', request)
  console.log(rest)
  return rest
}

async function refundList (request, axios) {
  console.log('chargeList us call')
  const rest = await axios.post('refund/list', request)
  console.log(rest)
  return rest
}

async function transactionStatistics (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('transaction-statistics/report', request)
  console.log(rest)
  return rest
}

async function incomeList (request, axios) {
  console.log('income us call')
  const rest = await axios.post('income-report/list', request)
  console.log(rest)
  return rest
}

async function transactionDetails (request, axios) {
  console.log('transactionDetails us call')
  const rest = await axios.post('transaction-data/info', request)
  console.log(rest)
  return rest
}
async function transactionDetailsQuery (request, axios) {
  console.log('transactionDetails us call')
  const rest = await axios.post('transaction-data/info-query', request)
  console.log(rest)
  return rest
}
async function transactionStatus (request, axios) {
  console.log('transactionStatus us call')
  const rest = await axios.post('transaction/chart-transaction-count', request)
  console.log(rest)
  return rest
}
async function operationList (request, axios) {
  console.log('transactionLisu us call')
  const rest = await axios.post('operation/groupList', request)
  console.log(rest)
  return rest
}

async function errorCodeList (axios) {
  console.log('errorList us call')
  const rest = await axios.get('error-report/error-list')
  console.log(rest)
  return rest
}
async function errorList (request, axios) {
  const rest = await axios.post('error-report/list', request)
  console.log(rest)
  return rest
}

async function chartErrorCount (request, axios) {
  const rest = await axios.post('error-report/chart-error-count', request)
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

async function uploadOffer (request, axios) {
  const res = await axios.post('offer/upload-offer', request)
  return res
}
async function updateUploadOffer (request, axios) {
  return await axios.post('offer/update-offer', request)
}
async function deleteOffer (request, axios) {
  return await axios.post('offer/delete-offer', request)
}
async function addParams (request, axios) {
  return await axios.post('offer/add-param', request)
}

async function listOffer (request, axios) {
  const res = await axios.post('offer/list', request)
  return res
}
async function listParam (request, axios) {
  const res = await axios.post('offer/parameter-list', request)
  return res
}
async function downloadRefundList (request, axios) {
  return await axios.post('export/refund-report', request, { responseType: 'blob' })
}

async function downloadChargeList (request, axios) {
  return await axios.post('export/charge-report', request, { responseType: 'blob' })
}

async function downloadBillList (request, axios) {
  return await axios.post('export/bill-report', request, { responseType: 'blob' })
}

async function downloadTransactionList (request, axios) {
  return await axios.post('export/transaction', request, { responseType: 'blob' })
}

async function downloadTransactionStatistics (request, axios) {
  return await axios.post('export/transaction-statistics-report', request, { responseType: 'blob' })
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
    value: 'SUCCESSFUL',
    text: 'report.transactionReport.status.successful'
  },
  {
    value: 'FAILED',
    text: 'report.transactionReport.status.fail'
  }
]

const resultId = [
  {
    value: '200',
    text: 'report.transactionReport.status.successful'
  },
  {
    value: '-1',
    text: 'report.transactionReport.status.fail'
  }
]
const offerTypDisplay = [
  {
    value: '1',
    text: 'url'
  },
  {
    value: '2',
    text: 'in app'
  }
]
const offerType = [
  {
    value: '1',
    text: 'offer.offerTypeList.1'
  },
  {
    value: '2',
    text: 'offer.offerTypeList.2'
  },
  {
    value: '3',
    text: 'offer.offerTypeList.3'
  },
  {
    value: '4',
    text: 'offer.offerTypeList.4'
  },
  {
    value: '5',
    text: 'offer.offerTypeList.5'
  }
]
const offerToType = [
  {
    value: 'ALL',
    text: 'offer.toType.all'
  },
  {
    value: 'ANDROID',
    text: 'offer.toType.android'
  },
  {
    value: 'IOS',
    text: 'offer.toType.ios'
  }
]

const offerStatus = [
  {
    value: 'Y',
    text: 'offer.offerStatus.display'
  },
  {
    value: 'N',
    text: 'offer.offerStatus.noDisplay'
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
    value: 'mobileweb',
    text: 'report.transactionReport.osName.mobileweb'
  }
]

const platform = [
  {
    value: 'NET',
    text: 'report.transactionReport.platform.net'
  },
  {
    value: 'SMS',
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

const chargeAmount = [
  {
    value: '10000',
    text: 'report.chargeReport.chargeAmount.amountA'
  },
  {
    value: '20000',
    text: 'report.chargeReport.chargeAmount.amountB'
  },
  {
    value: '50000',
    text: 'report.chargeReport.chargeAmount.amountC'
  },
  {
    value: '100000',
    text: 'report.chargeReport.chargeAmount.amountD'
  }
]

const operatorType = [
  {
    value: 'IRANCELL',
    text: 'report.chargeReport.operatorType.IRANCELL'
  },
  {
    value: 'IRMCI',
    text: 'report.chargeReport.operatorType.IRMCI'
  },
  {
    value: 'RIGTELL',
    text: 'report.chargeReport.operatorType.RIGTELL'
  }
]

const chargeType = [
  {
    value: 'CHARGINGCODE',
    text: 'report.chargeReport.chargeType.chargingCode'
  },
  {
    value: 'DIRECT',
    text: 'report.chargeReport.chargeType.direct'
  }
]

const refundType = [
  {
    value: 0,
    text: 'report.refundReport.refundType.pending'
  },
  {
    value: 1,
    text: 'report.refundReport.refundType.successful'
  },
  {
    value: 2,
    text: 'report.refundReport.refundType.failed'
  },
  {
    value: 3,
    text: 'report.refundReport.refundType.wait'
  },
  {
    value: 4,
    text: 'report.refundReport.refundType.need_Follow'
  },
  {
    value: 5,
    text: 'report.refundReport.refundType.manual'
  },
  {
    value: 6,
    text: 'report.refundReport.refundType.refund_not_required'
  },
  {
    value: 7,
    text: 'report.refundReport.refundType.confirmation_required'
  }
]
const transactionTimeType = [
  {
    value: 'requestTime',
    text: 'report.refundReport.transactionTimeType.transactionTime'
  },
  {
    value: 'refundCreatedTime',
    text: 'report.refundReport.transactionTimeType.createTime'
  },
  {
    value: 'refundOrFailTime',
    text: 'report.refundReport.transactionTimeType.refundTime'
  }

]

const orderType = [
  {
    value: 'ASC',
    text: 'report.refundReport.orderType.asc'
  },
  {
    value: 'DESC',
    text: 'report.refundReport.orderType.desc'
  }

]

const billType = [
  {
    value: 'electricity',
    text: 'report.billReport.billType.electricity'
  },
  {
    value: 'mci',
    text: 'report.billReport.billType.mci'
  },
  {
    value: 'tci',
    text: 'report.billReport.billType.tci'
  },
  {
    value: 'gas',
    text: 'report.billReport.billType.gas'
  },
  {
    value: 'water',
    text: 'report.billReport.billType.water'
  }
]

const gatewayType = [
  {
    value: 'Caspian',
    text: 'report.billReport.gatewayType.caspian'
  },
  {
    value: 'BOOM',
    text: 'report.billReport.gatewayType.boom'
  },
  {
    value: 'TAVANIR',
    text: 'report.billReport.gatewayType.tavanir'
  }
]

const statusType = [
  {
    value: 0,
    text: 'report.billReport.statusType.0'
  },
  {
    value: 1,
    text: 'report.billReport.statusType.1'
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

const operationName2 = [
  { header: 'حساب ' },
  // {
  //   value: 'Deposit_Pay_Bill',
  //   text: 'پرداخت قبض از حساب',
  //   url: '/rest/deposit/pay-bill'
  // },
  {
    value: 'Deposit_Pay_Loan',
    text: 'پرداخت تسهیلات',
    url: '/loan-request/accept-contract'
  },
  {
    value: 'Open_Deposit',
    text: 'افتتاح حساب',
    url: '/deposit-panel-backend/open-deposit-process/open-deposit'
  },
  // {
  //   value: 'Deposit_Statement',
  //   text: 'صورتحساب',
  //   url: '/rest/deposit/statement'
  // }
  {
    value: 'Card_Issue',
    text: 'صدور کارت',
    url: '/card-reissue/delivery'
  }
]

const errorType = [
  {
    value: 'c',
    title: 'report.errorReport.errorType.c'
  },
  {
    value: 's',
    title: 'report.errorReport.errorType.s'
  }
]

export default {
  onlineDepositReport,
  operatorActivity,
  transactionList,
  chargeList,
  billList,
  refundList,
  refund,
  refundStatusList,
  transactionStatistics,
  incomeList,
  transactionDetails,
  transactionDetailsQuery,
  operationList,
  errorList,
  chartErrorCount,
  errorCodeList,
  smsReport,
  downloadSmsReport,
  uploadOffer,
  updateUploadOffer,
  deleteOffer,
  addParams,
  listOffer,
  listParam,
  offerStatus,
  billType,
  gatewayType,
  statusType,
  offerTypDisplay,
  offerType,
  offerToType,
  responseCode,
  status,
  resultId,
  osName,
  operation,
  platform,
  groupBy,
  operationName,
  operationName2,
  source,
  chargeAmount,
  customerType,
  operatorType,
  chargeType,
  refundType,
  transactionTimeType,
  orderType,
  downloadOnlineDepositReport,
  downloadRefundList,
  downloadChargeList,
  downloadBillList,
  downloadTransactionList,
  downloadTransactionStatistics,
  downloadCustomer,
  errorType,
  downloadCustomerStatistics,
  downloadErrorReport,
  transactionStatus
}
