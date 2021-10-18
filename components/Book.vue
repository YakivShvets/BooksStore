<template>
  <div class="book">
    <div
      class="book__img"
      v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
    >
      <img
        :src="book.volumeInfo.imageLinks.thumbnail"
        :alt="book.volumeInfo.title"
        style="width: 130px; max-height: 200px"
      />
    </div>
    <div class="book__svg" v-else>
      <BookPlaceholder />
    </div>

    <div class="book__info">
      <div>
        <h2 class="book__title">{{ book.volumeInfo.title }}</h2>

        <div class="book__authors">
          <strong
            v-if="
              book.volumeInfo.authors && book.volumeInfo.authors.length === 1
            "
          >
            Автор:
          </strong>
          <strong
            v-else-if="
              book.volumeInfo.authors && book.volumeInfo.authors.length > 1
            "
          >
            Авторы:
          </strong>
          <template v-if="book.volumeInfo.authors">{{
            book.volumeInfo.authors.join(', ')
          }}</template>
        </div>
        <div class="book__date" v-if="book.volumeInfo.publishedDate">
          <strong>Дата выпуска:</strong>

          {{ book.volumeInfo.publishedDate.split('-').reverse().join('.') }}
        </div>
      </div>
      <div class="book__sale">
        <div
          class="book__price"
          v-if="book.saleInfo.saleability === 'FOR_SALE'"
        >
          <strong>
            {{ book.saleInfo.retailPrice.amount }}
            {{ book.saleInfo.retailPrice.currencyCode }}
          </strong>
        </div>
        <div class="book__price" v-else>
          <strong>Отсутствует в продаже</strong>
        </div>
        <button
          class="btn btn--primary mx-auto"
          v-if="book.saleInfo.saleability === 'FOR_SALE'"
          @click="handleOrder"
        >
          Заказать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import ImgPlaceholder from '../assets/book-placeholder.svg'
export default {
  name: 'book',
  props: {
    book: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Function,
      required: true,
    },
    setCurrentBook: {
      type: Function,
      required: true,
    },
  },
  components: {
    // ImgPlaceholder,
  },
  methods: {
    handleOrder() {
      this.setCurrentBook(this.book)
      this.showModal()
    },
  },
}
</script>

<style lang="scss">
.book {
  display: flex;
  align-items: flex-start;
  width: calc(50% - 10px);
  min-height: 220px;
  border: 2px solid #d6edf3;
  border-radius: 20px;
  padding: 24px;
  justify-content: space-between;
  &__info {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    height: 100%;
    width: 70%;
    padding-left: 15px;
  }
  &__title {
    margin-top: 0px;
    margin-bottom: 15px;
    font-size: 18px;
    width: 100%;
  }
  &__img {
    width: 28%;
  }
  &__svg {
    background: #fafafa;
    width: 28%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  &__sale {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    color: rgb(61, 129, 151);
  }
  img {
    border-radius: 10px;
  }
}
.info {
  display: flex;
  align-items: flex-start;
  &__description {
    padding-left: 15px;
  }
}
</style>
