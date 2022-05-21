import openDepositProcessManager from '~/repository/open_deposit_process_manager'
import onlineDepositManager from '~/repository/online_deposit_manager'

export const state = () => ({
  currentRequest: null,
  openDepositProcessStep: null,
  documentsStatus: {
    nationalCard: null,
    video: null,
    signature: null
  },
  cardOperationList: [],
  depositOperationList: [],
  cardReissueOperationList: [],
  loanRequestOperationList: [],
  loanPanelOperationList: [],
  onlineDepositOperationList: [],
  inquiryOperationList: [],
  publicOperationList: [],
  userOperationList: [],
  documentConfirm: false
})

const openDepositProcessStepEnum = {
  IN_PROCESS: 1,
  DOC_CONFIRMED: 2,
  CUSTOMER_CREATED: 3,
  DEPOSIT_OPENED: 4,
  REJECTED: -1

}

export const mutations = {

  setDocumentsStatus (state, documentsStatus) {
    Object.assign(state.documentsStatus, documentsStatus)
  },

  setCurrentRequest (state, request) {
    state.currentRequest = request
    state.openDepositProcessStep = openDepositProcessStepEnum[request.status] || 5
  },

  setCardList (state, list) {
    console.log('setCardList')
    console.log(list)
    state.cardOperationList = list
    console.log(state)
  },

  setDepositList (state, list) {
    console.log('setDepositList')
    console.log(list)
    state.depositOperationList = list
    console.log(state)
  },
  setOnlineDepositList (state, list) {
    console.log('setOnlineDepositList')
    console.log(list)
    state.onlineDepositOperationList = list
    console.log(state)
  },
  setLoanRequestList (state, list) {
    console.log('loanRequestOperationList')
    console.log(list)
    state.loanRequestOperationList = list
    console.log(state)
  },
  setLoanPanelList (state, list) {
    console.log('loanPanelOperationList')
    console.log(list)
    state.loanPanelOperationList = list
    console.log(state)
  },
  setCardReissueList (state, list) {
    console.log('cardReissueOperationList')
    console.log(list)
    state.cardReissueOperationList = list
    console.log(state)
  },
  setInquiryList (state, list) {
    console.log('inquiryOperationList')
    console.log(list)
    state.inquiryOperationList = list
    console.log(state)
  },
  setPublicList (state, list) {
    console.log('publicOperationList')
    console.log(list)
    state.publicOperationList = list
    console.log(state)
  },
  setUserList (state, list) {
    console.log('userOperationList')
    console.log(list)
    state.userOperationList = list
    console.log(state)
  }
}

export const actions = {

  updateDocumentsStatus (context, documentsStatus) {
    context.commit('setDocumentsStatus', documentsStatus)
  },

  initialCardOperations (context, cardList) {
    context.commit('setCardList', cardList)
  },

  initialDepositOperations (context, list) {
    context.commit('setDepositList', list)
  },
  initialCardReissueOperations (context, list) {
    context.commit('setCardReissueList', list)
  },
  initialLoanRequestOperations (context, list) {
    context.commit('setLoanRequestList', list)
  },
  initialLoanPanelOperations (context, list) {
    context.commit('setLoanPanelList', list)
  },
  initialOnlineDepositOperations (context, list) {
    context.commit('setOnlineDepositList', list)
  },
  initialInquiryOperations (context, list) {
    context.commit('setInquiryList', list)
  },
  initialPublicOperations (context, list) {
    context.commit('setPublicList', list)
  },
  initialUserOperations (context, list) {
    context.commit('setUserList', list)
  },
  async initOnlineDeposit (context, onlineDepositId) {
    const { data } = await onlineDepositManager.getOnlineDeposit(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async confirmDoc (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.confirmDoc(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async rejectDoc (context, wrapObject) {
    const { data } = await openDepositProcessManager.rejectDoc(wrapObject.onlineDepositId, wrapObject.rejectReasons, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async createCustomer (context, onlineDepositId) {
    const response = await openDepositProcessManager.createCustomer(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', response.data)
    return response
  },

  async openDeposit (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.openDeposit(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async shareMoney (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.shareMoney(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async updateStatusToInProcess (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.updateStatusToInProcess(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async revertStatusToReadyForProcess (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.revertStatusToReadyForProcess(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async updateStatusToReadyForProcess (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.updateStatusToReadyForProcess(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async changeStatusToCardSent (context, onlineDepositId) {
    const { data } = await openDepositProcessManager.updateStatusToCardSent(onlineDepositId, this.$axios)
    context.commit('setCurrentRequest', data)
  },

  async removeOnlineDeposit (context, onlineDepositId) {
    await openDepositProcessManager.removeOnlineDeposit(onlineDepositId, this.$axios)
  }

}

export const getters = {

  currentState: (state) => {
    return state.currentRequest || {}
  },

  openDepositProcessStep: (state) => {
    return state.openDepositProcessStep
  },
  cardOperationList: (state) => {
    console.log('getCardOperationList')
    return state.cardOperationList
  },

  depositOperationList: (state) => {
    console.log('getDepositOperationList')
    return state.depositOperationList
  },
  cardReissueOperationList: (state) => {
    console.log('cardReissueOperationList')
    return state.cardReissueOperationList
  },
  loanRequestOperationList: (state) => {
    console.log('loanRequestOperationList')
    return state.loanRequestOperationList
  },
  loanPanelOperationList: (state) => {
    console.log('loanPanelOperationList')
    return state.loanPanelOperationList
  },
  onlineDepositOperationList: (state) => {
    console.log('getOnlineDepositOperationList')
    return state.onlineDepositOperationList
  },
  userOperationList: (state) => {
    console.log('getUserOperationList')
    return state.userOperationList
  },
  publicOperationList: (state) => {
    console.log('getPublicOperationList')
    return state.publicOperationList
  },
  documentsStatus: (state) => {
    return state.documentsStatus
  },
  isDocumentConfirm: (state) => {
    return state.documentsStatus.nationalCard === 'confirm' && state.documentsStatus.video === 'confirm' && state.documentsStatus.signature === 'confirm'
  },
  exist: (state) => {
    return state !== null || state !== {}
  }
}
