<template>
  <div class="book">
    <div
      v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
      class="book__img"
    >
      <img
        :src="book.volumeInfo.imageLinks.thumbnail"
        :alt="book.volumeInfo.title"
        style="width: 130px; max-height: 200px"
      />
    </div>
    <div v-else class="book__svg">
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
        <div v-if="book.volumeInfo.publishedDate" class="book__date">
          <strong>Дата выпуска:</strong>

          {{ book.volumeInfo.publishedDate.split('-').reverse().join('.') }}
        </div>
      </div>
      <div class="book__sale">
        <div
          v-if="
            book.saleInfo.saleability === 'FOR_SALE' &&
            book.saleInfo.retailPrice.amount !== 0
          "
          class="book__price"
        >
          <strong>
            {{ book.saleInfo.retailPrice.amount }}
            {{ book.saleInfo.retailPrice.currencyCode }}
          </strong>
        </div>
        <div v-else class="book__price">
          <strong>Отсутствует в продаже</strong>
        </div>
        <button
          v-if="book.saleInfo.saleability === 'FOR_SALE'"
          class="btn btn--primary"
          @click="handleOrder"
        >
          Заказать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
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
.modal__body .info {
  display: flex;
  align-items: flex-start;
  background-color: white !important;
  &__description {
    padding-left: 15px;
  }
}
</style>
