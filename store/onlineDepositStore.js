import openDepositProcessManager from '~/repository/open_deposit_process_manager'

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
  pichakOperationList: [],
  bankLoanOperationList: [],
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
  setCurrentRequest (state, request) {
    state.currentRequest = request
    state.openDepositProcessStep = openDepositProcessStepEnum[request.status] || 5
  },

  setCardList (state, list) {
    state.cardOperationList = list
  },

  remove (state, list) {
    state.cardOperationList = []
  },

  setDepositList (state, list) {
    state.depositOperationList = list
  },
  setOnlineDepositList (state, list) {
    state.onlineDepositOperationList = list
  },
  setLoanRequestList (state, list) {
    state.loanRequestOperationList = list
  },
  setLoanPanelList (state, list) {
    state.loanPanelOperationList = list
  },
  setCardReissueList (state, list) {
    state.cardReissueOperationList = list
  },
  setInquiryList (state, list) {
    state.inquiryOperationList = list
  },
  setPublicList (state, list) {
    state.publicOperationList = list
  },
  setUserList (state, list) {
    state.userOperationList = list
  },
  setPichakOperationList (state, list) {
    state.pichakOperationList = list
  },
  setBankLoanOperationList (state, list) {
    state.bankLoanOperationList = list
  }
}

export const actions = {
  initialCardOperations (context, cardList) {
    context.commit('setCardList', cardList)
  },
  removeAction (context, cardList) {
    context.commit('remove', cardList)
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
  initialPichakOperation (context, list) {
    context.commit('setPichakOperationList', list)
  },
  initialBankLoanOperation (context, list) {
    context.commit('setBankLoanOperationList', list)
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
  async removeOnlineDeposit (context, onlineDepositId) {
    await openDepositProcessManager.removeOnlineDeposit(onlineDepositId, this.$axios)
  }
}

export const getters = {
  cardOperationList: (state) => {
    return state.cardOperationList
  },

  depositOperationList: (state) => {
    return state.depositOperationList
  },
  cardReissueOperationList: (state) => {
    return state.cardReissueOperationList
  },
  loanRequestOperationList: (state) => {
    return state.loanRequestOperationList
  },
  loanPanelOperationList: (state) => {
    return state.loanPanelOperationList
  },
  onlineDepositOperationList: (state) => {
    return state.onlineDepositOperationList
  },
  userOperationList: (state) => {
    return state.userOperationList
  },
  publicOperationList: (state) => {
    return state.publicOperationList
  },
  pichakOperationList: (state) => {
    return state.pichakOperationList
  },
  bankLoanOperationList: (state) => {
    return state.bankLoanOperationList
  }
}
