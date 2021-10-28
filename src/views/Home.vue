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
            <va-icon name="shopping_cart" :size="44" class="mr-2" />
          </router-link>
        </div>

        <OrderSummary />
      </div>
    </div>

    <div class="message" v-if="store.getters.getShowMessage">
      Ваш заказ на сумму {{ route.params.sum }}
      {{ route.params.currency }} успешно оформлен
    </div>

    <div class="books-wraper" v-if="books">
      <Book
        v-for="book of books.items"
        :book="book"
        :key="book.id"
        :showModal="handleShowModal"
        :setCurrentBook="setCurrentBook"
      />
    </div>

    <OrderBookModal
      :showModal="handleShowModal"
      :book="currentBook"
      ref="orderBookModal"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
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
      console.log(orderBookModal.value.bookModal);
      orderBookModal.value.bookModal.show();
    }

    function setCurrentBook(book) {
      currentBook.value = book;
    }

    return {
      searchText,
      books,
      handleShowModal,
      setCurrentBook,
      currentBook,
      orderBookModal,
      store,
      route,
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
  justify-content: center;
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
.message {
  background-color: rgb(178, 247, 178);
  color: rgb(3, 148, 3);
  padding: 24px;
  margin: 24px 0;
}
form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
}
</style>
