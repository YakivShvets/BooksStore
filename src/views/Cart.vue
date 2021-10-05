<template>
  <div class="cart">
    <div class="to-home">
      <router-link to="/"><ImgPlaceholder alt="cart" /></router-link>
    </div>
    <h1 v-if="!$store.getters.getOrderedBooks.length">Корзина пуста</h1>
    <div v-else>
      <h1>Подтверждение заказа</h1>
      <table border="1">
        <tr
          v-for="(orderBook, index) of $store.getters.getOrderedBooks"
          :key="orderBook.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="orderBook.volumeInfo.imageLinks.smallThumbnail"
              :alt="orderBook.volumeInfo.title"
            />
          </td>
          <td>
            <strong>{{ orderBook.volumeInfo.title }}</strong>
            {{ orderBook.volumeInfo.description }}
          </td>
          <td style="white-space: nowrap">
            {{ orderBook.saleInfo.retailPrice.amount }}
            {{ orderBook.saleInfo.retailPrice.currencyCode }}
          </td>
        </tr>
      </table>
      <div class="total-price">
        <span>
          Сумма заказа: {{ $store.getters.getTotalPrice }}
          {{
            $store.getters.getOrderedBooks[0].saleInfo.retailPrice.currencyCode
          }}
        </span>
        <button class="btn btn--primary" @click="clickToOrder">Заказать</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImgPlaceholder from '../assets/left-arrow-icon.svg';
export default {
  components: {
    ImgPlaceholder,
  },

  methods: {
    clickToOrder() {
      this.$router.push(
        {
          name: 'Home',
          params: {
            sum: this.$store.getters.getTotalPrice,
            currency:
              this.$store.getters.getOrderedBooks[0].saleInfo.retailPrice
                .currencyCode,
          },
        },
        () => {
          this.$store.dispatch('switchShowMessage', true);
          setTimeout(
            () => this.$store.dispatch('switchShowMessage', false),
            15000
          );
          this.$store.dispatch('resetOrderedBooks');
        }
      );
    },
  },
};
</script>

<style lang="scss">
table {
  border-collapse: collapse;
  td {
    padding: 7px 15px;
    vertical-align: top;
  }
}
.total-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px 0;
  span {
    padding: 15px 0 20px;
  }
}
</style>
