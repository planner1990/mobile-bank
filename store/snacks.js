export const state = () => ({
  title: '',
  content: '',
  color: '',
  textColor: ''
})

export const mutations = {
  showMessage (state, payload) {
    state.title = payload.title
    state.content = payload.content
    state.color = payload.color
    state.textColor = payload.textColor
  }
}
