async function getUser (userName, axios) {
  if (userName) {
    return await axios.get('user/' + userName)
  } else {
    return await axios.get('user/')
  }
}

async function getUserList (searchModel, axios) {
  return await axios.post('user/list', searchModel)
}
async function getCustomerList (searchModel, axios) {
  return await axios.post('customer/list', searchModel)
}

async function getCustomerStatisticsReport (searchModel, axios) {
  return await axios.post('customer-statistics/report', searchModel)
}

async function updateUser (form, id, axios) {
  return await axios.post('user/' + id, form)
}
async function updateCurrentUser (form, axios) {
  return await axios.post('sso/edit', form)
}

async function createUser (form, axios) {
  return await axios.post('user/', form)
}

async function deleteUser (form, axios) {
  return await axios.get('user/delete/' + form)
}

const customerType = [
  {
    value: 'REGISTERED',
    text: 'customer.customerStatistics.customerTypeTitle.REGISTERED'
  },
  {
    value: 'GUEST',
    text: 'customer.customerStatistics.customerTypeTitle.GUEST'
  }
]

const userRoles = [
  {
    value: 'ROLE_PANEL_ADMIN',
    text: 'user.roles.ROLE_PANEL_ADMIN'
  },
  {
    value: 'ROLE_PANEL_USER',
    text: 'user.roles.ROLE_PANEL_USER'
  },
  {
    value: 'ROLE_PANEL_REPORT',
    text: 'user.roles.ROLE_PANEL_REPORT'
  }
]

const userPermissions = [
  {
    value: 'FULL_ACCESS',
    text: 'user.permissions.FULL_ACCESS'
  },
  {
    value: 'REPORTER_ACCESS',
    text: 'user.permissions.REPORTER_ACCESS'
  },
  {
    value: 'OFFER_ACCESS',
    text: 'user.permissions.OFFER_ACCESS'
  },
  {
    value: 'ADMIN_ACCESS',
    text: 'user.permissions.ADMIN_ACCESS'
  },
  {
    value: 'ACCOUNTING_ACCESS',
    text: 'user.permissions.ACCOUNTING_ACCESS'
  },
  {
    value: 'CREATE_USER',
    text: 'user.permissions.CREATE_USER'
  },
  {
    value: 'CONFIRM_REFUND',
    text: 'user.permissions.CONFIRM_REFUND'
  },
  {
    value: 'REPORTER',
    text: 'user.roles.REPORTER'
  }
]

const userStatus = [
  {
    value: '0',
    text: 'user.status.0'
  },
  {
    value: '1',
    text: 'user.status.1'
  }
]

const locationAccess = [
  {
    value: 'UNIVERSAL',
    text: 'user.locationAccess.UNIVERSAL'
  },
  {
    value: 'PROVINCE',
    text: 'user.locationAccess.PROVINCE'
  },
  // ,
  // {
  //   value: 'CITY',
  //   text: 'user.locationAccess.CITY'
  // },
  {
    value: 'BRANCH',
    text: 'user.locationAccess.BRANCH'
  }
]

export default {
  getUser,
  getUserList,
  createUser,
  deleteUser,
  updateUser,
  getCustomerList,
  getCustomerStatisticsReport,
  userRoles,
  customerType,
  userPermissions,
  locationAccess,
  userStatus,
  updateCurrentUser
}
