<template>
  <div>
    <!-- <div class="search">
      <form @submit.prevent="$store.dispatch('fetchBooks')">
        <input class="search__text" type="text" v-model="searchText" />
        <button class="btn btn--primary" type="submit">Отправить</button>
      </form>
      <div class="cart-wraper">
        <CartIcon />
        <OrderSummary />
      </div> -->
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <div class="search">
            <v-form @submit.prevent="$store.dispatch('fetchBooks')">
              <v-container>
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="3"> -->
                  <v-col>
                    <v-text-field
                      v-model="searchText"
                      label="Поиск книг"
                      placeholder="Введите название книги"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <div class="text-center">
                <v-btn rounded color="primary" dark type="submit">
                  Отправить
                </v-btn>
              </div>
            </v-form>
            <!-- <form @submit.prevent="$store.dispatch('fetchBooks')">
              <input class="search__text" type="text" v-model="searchText" />
              <button class="btn btn--primary" type="submit">Отправить</button>
            </form> -->
            <div class="cart-wraper">
              <CartIcon />
              <OrderSummary />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- </div> -->

    <div class="message" v-if="$store.getters.getShowMessage">
      Ваш заказ на сумму {{ $route.params.sum }}
      {{ $route.params.currency }} успешно оформлен
    </div>

    <div class="books-wraper">
      <Book
        v-for="book of $store.getters.getBooks.items"
        :book="book"
        :key="book.id"
        :showModal="showModal"
        :setCurrentBook="setCurrentBook"
      />
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
</style>
