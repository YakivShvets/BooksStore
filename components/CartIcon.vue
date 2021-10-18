<template>
  <div class="cart-icon">
    <nuxt-link to="/cart"><CartImg /></nuxt-link>
  </div>
</template>

<script>
// import ImgPlaceholder from '../assets/cart-img.svg';

export default {
  components: {
    // ImgPlaceholder,
  },
}
</script>
<style lang="scss">
.cart-icon {
  width: 40px;
}
</style>
