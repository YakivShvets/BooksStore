import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    searchText: '',
    books: null,
    orderedBooks: [],
    showMessage: false,
    disabled: false,
  },
  mutations: {
    fetchBooks(state, payload) {
      state.books = payload;
    },
    fillText(state, payload) {
      state.searchText = payload;
    },
    addOrderedBook(state, payload) {
      if (
        !state.orderedBooks.length ||
        !state.orderedBooks.some((book) => book.id === payload.id)
      ) {
        payload.counter = 1;
        state.orderedBooks = [...state.orderedBooks, payload];
      } else {
        state.orderedBooks.find((book) => book.id === payload.id).counter++;
      }
    },
    increment(state, payload) {
      state.orderedBooks[payload].counter++;
    },
    decrement(state, payload) {
      if (state.orderedBooks[payload].counter > 1) {
        state.orderedBooks[payload].counter--;
      }
    },
    removeItem(state, payload) {
      state.orderedBooks = state.orderedBooks.filter(
        (book) => book.id !== state.orderedBooks[payload].id
      );
    },
    switchShowMessage(state, payload) {
      state.showMessage = payload;
    },
    resetOrderedBooks(state) {
      state.orderedBooks = [];
    },
    switchDisabled(state, payload) {
      state.disabled = payload;
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
        .reduce(
          (total, book) =>
            total + book.saleInfo.retailPrice.amount * book.counter,
          0
        )
        .toFixed(2);
    },
    getShowMessage(state) {
      return state.showMessage;
    },
    getDisabled(state) {
      return state.disabled;
    },
  },
  actions: {
    fillText({ commit }, payload) {
      commit('fillText', payload);
    },
    async fetchBooks({ getters, commit }, payload) {
      if (getters.getSearchText) {
        try {
          const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes',
            {
              params: {
                q: getters.getSearchText,
                startIndex: payload.startIndex,
                maxResults: 12,
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
    increment({ commit }, payload) {
      commit('increment', payload);
    },
    decrement({ commit }, payload) {
      commit('decrement', payload);
    },
    removeItem({ commit }, payload) {
      commit('removeItem', payload);
    },
    switchDisabled({ commit }, payload) {
      commit('switchDisabled', payload);
    },
  },
});
