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

async function transactionDetails (request, axios) {
  console.log('transactionDetails us call')
  const rest = await axios.post('transaction-data/info', request)
  console.log(rest)
  return rest
}

async function operationList (axios) {
  console.log('transactionLisu us call')
  const rest = await axios.get('operation/groupList')
  console.log(rest)
  return rest
}
async function operationListQuery (axios) {
  console.log('transactionLisu us call')
  const rest = await axios.get('operation/groupListQuery')
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
async function updateUploadOffer (request, id, axios) {
  return await axios.post('offer/' + id, request)
}
async function addParams (request, axios) {
  return await axios.post('offer/addParams', request)
}

async function listOffer (request, axios) {
  const res = await axios.post('offer/list', request)
  return res
}
async function listParam (request, axios) {
  const res = await axios.post('offer/paramList', request)
  return res
}
async function downloadRefundList (request, axios) {
  return await axios.post('export/refund-report', request, { responseType: 'blob' })
}

async function downloadChargeList (request, axios) {
  return await axios.post('export/charge-report', request, { responseType: 'blob' })
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
    value: 'WEB',
    text: 'report.transactionReport.osName.WEB'
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
    value: 'IRANCEL',
    text: 'report.chargeReport.operatorType.irancell'
  },
  {
    value: 'IRMCI',
    text: 'report.chargeReport.operatorType.irmci'
  },
  {
    value: 'RIGTELL',
    text: 'report.chargeReport.operatorType.rigtell'
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
  chargeList,
  refundList,
  transactionStatistics,
  transactionDetails,
  operationList,
  operationListQuery,
  errorList,
  errorCodeList,
  smsReport,
  downloadSmsReport,
  uploadOffer,
  updateUploadOffer,
  addParams,
  listOffer,
  listParam,
  offerStatus,
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
  downloadTransactionList,
  downloadTransactionStatistics,
  downloadCustomer,

  downloadCustomerStatistics,
  downloadErrorReport

}
