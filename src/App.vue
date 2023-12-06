<script setup>
import { ref } from 'vue'
import ProductDisplay from "@/components/ProductDisplay.vue"
import useCart from "@/composables/useCart";

const { cartCount, updateCart } = useCart()
const premium = ref(true)
</script>

<template>
  <div class="nav-bar"></div>
  <div class="cart">Cart({{ cartCount }})</div>
  <ProductDisplay
      :premium="premium"
      @add-to-cart="updateCart"
  />
</template>


<!-- the style tag is optional -->
<!-- The scoped attribute will indicate the style will not affect child components EXCEPT for the ROOT ELEMENT of a child component-->
<style scoped>

</style>