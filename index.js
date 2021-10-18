export const state = () => ({
  searchText: 'js',
  books: null,
  book: {},
  orderedBooks: [],
  showMessage: false,
})
export const mutations = {
  fetchBooks(state, payload) {
    state.books = payload
    console.log(payload)
  },
  fillText(state, payload) {
    state.searchText = payload
  },
  addOrderedBook(state, payload) {
    state.orderedBooks = [...state.orderedBooks, payload]
  },
  switchShowMessage(state, payload) {
    state.showMessage = payload
  },
  resetOrderedBooks(state) {
    state.orderedBooks = []
  },
}
export const getters = {
  getBooks(state) {
    return state.books
  },
  getSearchText(state) {
    return state.searchText
  },
  getOrderedBooks(state) {
    return state.orderedBooks
  },
  getTotalPrice(state) {
    return state.orderedBooks
      .reduce((total, book) => total + book.saleInfo.retailPrice.amount, 0)
      .toFixed(2)
  },
  getShowMessage(state) {
    return state.showMessage
  },
}
export const actions = {
  fillText({ commit }, payload) {
    commit('fillText', payload)
  },
  async fetchBooks({ getters, commit }, payload) {
    if (getters.getSearchText) {
      try {
        const response = await this.$axios.$get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              q: getters.getSearchText,
              startIndex: payload.startIndex,
            },
          }
        )
        console.log(response)
        commit('fetchBooks', response)
      } catch (error) {
        console.error(error)
      }
    }
  },
  addOrderedBook({ commit }, payload) {
    commit('addOrderedBook', payload)
  },
  switchShowMessage({ commit }, payload) {
    commit('switchShowMessage', payload)
  },
  resetOrderedBooks({ commit }) {
    commit('resetOrderedBooks')
  },
}
