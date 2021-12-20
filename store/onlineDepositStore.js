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
  }

}

export const actions = {

  updateDocumentsStatus (context, documentsStatus) {
    context.commit('setDocumentsStatus', documentsStatus)
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
