<template>
  <div>
    <CartItem v-for="item of bookList" v-bind:item="item" :key="item.id" />
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
export default {
  data() {
    return {
      bookList: [],
    };
  },
  components: {
    CartItem,
  },
};
</script>
