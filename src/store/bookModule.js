import axios from 'axios';

export default {
  state: {
    searchText: '',
    books: [],
    book: {},
    orderedBooks: [],
    showMessage: false,
  },
  mutations: {
    fetchBooks(state, payload) {
      state.books = payload;
    },
    fillText(state, payload) {
      state.searchText = payload;
    },
    addOrderedBook(state, payload) {
      state.orderedBooks = [...state.orderedBooks, payload];
    },
    switchShowMessage(state, payload) {
      state.showMessage = payload;
    },
    resetOrderedBooks(state) {
      state.orderedBooks = [];
    },
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
    getSearchText(state) {
      return state.searchText;
    },
    getOrderedBooks(state) {
      return state.orderedBooks;
    },
    getTotalPrice(state) {
      return state.orderedBooks
        .reduce((total, book) => total + book.saleInfo.retailPrice.amount, 0)
        .toFixed(2);
    },
    getShowMessage(state) {
      return state.showMessage;
    },
  },
  actions: {
    fillText({ commit }, payload) {
      commit('fillText', payload);
    },
    async fetchBooks({ getters, commit }) {
      if (getters.getSearchText) {
        try {
          const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes',
            {
              params: {
                q: getters.getSearchText,
              },
            }
          );
          commit('fetchBooks', response.data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    addOrderedBook({ commit }, payload) {
      commit('addOrderedBook', payload);
    },
    switchShowMessage({ commit }, payload) {
      commit('switchShowMessage', payload);
    },
    resetOrderedBooks({ commit }) {
      commit('resetOrderedBooks');
    },
  },
};
