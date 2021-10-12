<template>
  <div>
    <div class="search">
      <v-form
        @submit.prevent="$store.dispatch('fetchBooks', { startIndex: 0 })"
      >
        <v-text-field
          v-model="searchText"
          label="Поиск книг"
          placeholder="Введите название книги"
          outlined
        ></v-text-field>
        <div class="text-center">
          <v-btn rounded color="primary" dark type="submit"> Отправить </v-btn>
        </div>
      </v-form>
      <div class="cart-wraper">
        <CartIcon />
        <OrderSummary />
      </div>
    </div>

    <div class="message" v-if="$store.getters.getShowMessage">
      Ваш заказ на сумму {{ $route.params.sum }}
      {{ $route.params.currency }} успешно оформлен
    </div>

    <div class="books-wraper" v-if="$store.getters.getBooks">
      <Book
        v-for="book of $store.getters.getBooks.items"
        :book="book"
        :key="book.id"
        :showModal="showModal"
        :setCurrentBook="setCurrentBook"
      />
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="Math.ceil($store.getters.getBooks.totalItems / 10)"
          :total-visible="7"
          @input="handlePagination"
        ></v-pagination>
      </div>
    </div>

    <OrderBookModal ref="orderModal" :book="currentBook" />
  </div>
</template>

<script>
import Book from '@/components/Book.vue';
import OrderBookModal from '@/components/OrderBookModal.vue';
import OrderSummary from '@/components/OrderSummary.vue';
import CartIcon from '@/components/CartIcon.vue';

export default {
  name: 'Home',
  data() {
    return {
      currentBook: {},
      page: 1,
    };
  },
  components: {
    Book,
    OrderBookModal,
    OrderSummary,
    CartIcon,
  },
  computed: {
    searchText: {
      get() {
        return this.$store.getters.getSearchText;
      },
      set(value) {
        this.$store.commit('fillText', value);
      },
    },
  },
  methods: {
    showModal() {
      this.$refs.orderModal.$refs.modalName.openModal();
    },
    setCurrentBook(book) {
      this.currentBook = book;
      console.log(book);
    },
    handlePagination(page) {
      this.$store.dispatch('fetchBooks', { startIndex: page * 10 - 10 });
    },
  },
};
</script>

<style lang="scss">
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
  padding: 45px;
  background-color: rgb(214, 237, 243);
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
.v-input__slot {
  margin-bottom: 0 !important;
}
.v-text-field__details {
  display: none !important;
}
.v-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
}
.v-input {
  max-width: 75% !important;
}
</style>
