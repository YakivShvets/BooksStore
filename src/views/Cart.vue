<template>
  <div class="cart">
    <div class="to-home">
      <router-link to="/"
        ><va-icon name="arrow_back" color="primary" class="mr-4" :size="60"
      /></router-link>
    </div>
    <div v-if="!store.getters.getOrderedBooks.length" class="empty-cart">
      <h1>Корзина пуста</h1>
      <va-icon name="production_quantity_limits" :size="300" class="mt-4" />
    </div>

    <div v-else class="shopping-list">
      <h1>Подтверждение заказа</h1>
      <hr />

      <div class="va-table-responsive">
        <table class="va-table va-table--striped">
          <tbody>
            <tr
              v-for="(orderBook, index) of store.getters.getOrderedBooks"
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
              <td>
                <div class="quantity">
                  <va-button-group class="mb-2">
                    <va-button
                      size="small"
                      icon="remove_circle_outline"
                      @click="store.dispatch('decrement', index)"
                    />
                    <va-button
                      size="small"
                      icon="add_circle_outline"
                      @click="store.dispatch('increment', index)"
                    />
                  </va-button-group>
                  <div>
                    {{ orderBook.counter }}
                  </div>
                </div>
              </td>
              <td style="white-space: nowrap; width: 116px">
                {{
                  (
                    orderBook.saleInfo.retailPrice.amount * orderBook.counter
                  ).toFixed(2)
                }}
                {{ orderBook.saleInfo.retailPrice.currencyCode }}
              </td>
              <td>
                <va-button
                  icon="highlight_off"
                  color="danger"
                  size="small"
                  @click="store.dispatch('removeItem', index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div class="total-price">
        <span>
          Сумма заказа: {{ store.getters.getTotalPrice }}
          {{
            store.getters.getOrderedBooks[0].saleInfo.retailPrice.currencyCode
          }}
        </span>
        <va-button @click="clickToOrder">Заказать</va-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    function clickToOrder() {
      router.push(
        {
          name: 'Home',
          params: {
            sum: store.getters.getTotalPrice,
            currency:
              store.getters.getOrderedBooks[0].saleInfo.retailPrice
                .currencyCode,
          },
        },
        completeOrder()
      );
    }
    function completeOrder() {
      store.dispatch('switchShowMessage', true);
      setTimeout(() => store.dispatch('switchShowMessage', false), 15000);
      store.dispatch('resetOrderedBooks');
    }
    return {
      clickToOrder,
      store,
    };
  },
};
</script>

<style lang="scss">
.cart {
  padding: 45px;
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
.cart h1 {
  font-size: 22px;
  margin-bottom: 20px;
}
.shopping-list h1 {
  text-align: center;
}
.quantity {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
