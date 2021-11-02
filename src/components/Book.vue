<template>
  <div class="row book">
    <va-card>
      <div
        class="book__img"
        v-if="
          book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        "
      >
        <img
          :src="book.volumeInfo.imageLinks.thumbnail"
          :alt="book.volumeInfo.title"
          style="width: 130px; max-height: 200px"
        />
      </div>
      <div class="book__svg" v-else>
        <va-icon name="book" color="#9BEC15" :size="150" />
      </div>
      <div class="book__info">
        <div>
          <va-card-title>{{ book.volumeInfo.title }}</va-card-title>
          <va-card-content>
            <div class="book__authors">
              <strong
                v-if="
                  book.volumeInfo.authors &&
                  book.volumeInfo.authors.length === 1
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
          </va-card-content>
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
          <va-button
            v-if="book.saleInfo.saleability === 'FOR_SALE'"
            @click="handleOrder"
          >
            Заказать
          </va-button>
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
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

  setup(props) {
    function handleOrder() {
      props.showModal();
      props.setCurrentBook(props.book);
    }
    return {
      handleOrder,
    };
  },
};
</script>

<style lang="scss">
.book {
  max-width: calc(33% - 9px);
  min-height: 220px;
  justify-content: space-between;
  &__info {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    height: 100%;
    width: 70%;
  }
  &__img {
    width: 36%;
    padding: 20px 0 20px 20px;
  }
  &__svg {
    background: #fafafa;
    padding: 20px 0;
    width: 37%;
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
    padding: 0 20px 20px 20px;
  }
  &__price {
    color: rgb(21, 78, 193);
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
.va-card__inner {
  display: flex;
  height: 100%;
}
.va-card {
  width: 100%;
}
.va-card__title {
  font-size: 15px !important;
}
</style>
