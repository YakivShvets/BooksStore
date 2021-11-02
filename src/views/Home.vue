<template>
  <div class="home">
    <div class="search">
      <form
        action=""
        @submit.prevent="store.dispatch('fetchBooks', { startIndex: 0 })"
      >
        <va-input
          v-model="searchText"
          label="Поиск книг"
          placeholder="Введите название книги"
          outline
        />
        <va-button type="submit" outline class="ml-4">Отправить</va-button>
      </form>
      <div class="cart-wraper">
        <div class="cart-icon">
          <router-link to="/cart">
            <va-icon
              name="shopping_cart"
              color="primary"
              :size="44"
              class="mr-2"
            />
          </router-link>
        </div>

        <OrderSummary />
      </div>
    </div>

    <va-alert v-if="store.getters.getShowMessage" color="success" class="mb-4">
      Ваш заказ на сумму {{ route.params.sum }}
      {{ route.params.currency }} успешно оформлен
    </va-alert>

    <div class="books-wraper" v-if="books">
      <Book
        v-for="book of books.items"
        :book="book"
        :key="book.id"
        :showModal="handleShowModal"
        :setCurrentBook="setCurrentBook"
      />
    </div>

    <va-pagination
      v-if="store.getters.getBooks"
      :visible-pages="9"
      v-model="page"
      size="medium"
      :pages="Math.ceil(store.getters.getBooks.totalItems / 12)"
      boundary-numbers
      class="mb-4"
    />

    <OrderBookModal
      :showModal="handleShowModal"
      :book="currentBook"
      ref="orderBookModal"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Book from '@/components/Book.vue';
import OrderBookModal from '@/components/OrderBookModal.vue';
import OrderSummary from '@/components/OrderSummary.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'Home',

  components: {
    Book,
    OrderBookModal,
    OrderSummary,
  },
  setup() {
    const orderBookModal = ref(null);
    const currentBook = ref(null);
    const store = useStore();
    const route = useRoute();
    const page = ref(1);
    const searchText = computed({
      get() {
        return store.getters.getSearchText;
      },
      set(value) {
        store.commit('fillText', value);
      },
    });
    const books = computed(function () {
      return store.getters.getBooks;
    });

    function handleShowModal() {
      // console.log(orderBookModal.value.bookModal);
      orderBookModal.value.bookModal.show();
    }

    function setCurrentBook(book) {
      currentBook.value = book;
    }

    function handlePagination() {
      store.dispatch('fetchBooks', { startIndex: page.value * 12 - 12 });
    }

    watch(page, (newPage) => {
      handlePagination(newPage);
    });

    return {
      searchText,
      books,
      handleShowModal,
      setCurrentBook,
      currentBook,
      orderBookModal,
      store,
      route,
      page,
      handlePagination,
    };
  },
};
</script>
<style lang="scss">
.home {
  padding: 0 45px;
}
.books-wraper {
  padding: 15px 0 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 45px 0;
  border-radius: 15px;
  &__text {
    width: 350px;
    margin-right: 15px;
  }
  .cart-wraper {
    display: flex;
    align-items: center;
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
}
.va-button-group {
  margin-left: auto;
  margin-right: auto;
}
</style>
