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
    console.log('setCardList')
    console.log(list)
    state.cardOperationList = list
    console.log(state)
  },

  remove (state, list) {
    state.cardOperationList = []
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
  },
  setPichakOperationList (state, list) {
    console.log('pichakOperationList')
    console.log(list)
    state.pichakOperationList = list
    console.log(state)
  },
  setBankLoanOperationList (state, list) {
    console.log('bankLoanOperationList')
    console.log(list)
    state.bankLoanOperationList = list
    console.log(state)
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
  pichakOperationList: (state) => {
    console.log('getPichakOperationList')
    return state.pichakOperationList
  },
  bankLoanOperationList: (state) => {
    console.log('getBankLoanOperationList')
    return state.bankLoanOperationList
  }
}
