<script setup>
import { ref } from 'vue'
import socksGreenImage from './assets/images/socks_green.jpeg'
import socksBlueImage from './assets/images/socks_blue.jpeg'

const product = ref('Socks')
const image = ref(socksGreenImage)
const popularItem = ref(true)
const inventory = ref(0)

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green', image: socksGreenImage },
  { id: 2235, color: 'blue', image: socksBlueImage }
])

const cart = ref(0)

const updateImage = (variantImage) => {
  image.value = variantImage
}
</script>

<template>
  <div class="nav-bar"></div>
  <div class="cart">Cart({{ cart }})</div>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ product }}</h1>

        <!-- Conditional Rendering -->
        <!-- v-show is similar to v-if but renders and hides using display:none, so more performant if the code needs to appear and hide frequently-->
        <p v-show="popularItem">Popular Item!</p>

        <!-- v-if and v-else needs to be used on elements next to each other -->
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>

        <ul>
          <!-- details must be iterable to be compatible with v-for -->
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <!-- v-for and v-if can appear on the same element, however v-if is always processed first regardless of order-->
        <!-- Vue also relies on the virtual DOM similar to React so the key is required -->
        <div
            v-for="variant in variants"
            v-bind:key="variant.id"
            @mouseover="updateImage(variant.image)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
        >
        </div>

        <!-- v-on:click takes a callback function, similar to React: (event) => {cart += 1} -->
        <!-- however the Function Wrapper is optional as it'll be added automatically by the compiler-->
        <!-- or pass in the function directly -->
        <!-- v-on:click.once or @click.once: the once is a event modifier that ensures the event is triggered only once -->
        <button
            class="button"
            :class="{ disabledButton: inventory <= 0}"
            v-on:click.once="cart += 1"
            :disabled="inventory <= 0"
        >
          Add to Cart
        </button>


        <!--class binding can use an array instead as well-->
        <!-- where the values could be css classes:
          const color = 'text-dark'
          const bgColor = 'bg-white'
        -->
        <button
            class="button"
            :class="[color, bgColor, 'border-dark']"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</template>


<!-- The scoped attribute will indicate the style will not affect child components EXCEPT for the ROOT ELEMENT of a child component-->
<style scoped>
p {
  color: midnightblue;
  font-weight: bold;
}
</style>