<template>
  <div>
    <div class="cart-info" v-if="$store.getters.getOrderedBooks.length">
      <div>Добавлено товаров: {{ $store.getters.getOrderedBooks.length }}</div>
      <div>Сумма заказа: {{ $store.getters.getTotalPrice }}</div>
    </div>
    <div class="cart-info" v-else>Корзина пуста</div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
.cart-info {
  padding-left: 10px;
}
</style>
