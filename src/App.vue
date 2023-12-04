<script setup>
import {computed, ref} from 'vue'
import socksGreenImage from './assets/images/socks_green.jpeg'
import socksBlueImage from './assets/images/socks_blue.jpeg'

const product = ref('Socks')
const brand = ref('Vue Mastery')
const popularItem = ref(true)
const selectedVariant = ref(0)

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green', image: socksGreenImage, quantity: 50 },
  { id: 2235, color: 'blue', image: socksBlueImage, quantity: 0 }
])

const cart = ref(0)

// Example of Explicit Subscriber
// the return value is the value of the computed property
// whenever brand or product value changes, the value of title will be recalculated automatically
const title = computed(() => {
  return brand.value + ' ' + product.value
})

const image = computed(() => {
  return variants.value[selectedVariant.value].image
})

const inStock = computed(() => {
  return variants.value[selectedVariant.value].quantity > 10
})
const almostOutOfStock = computed(() => {
  return variants.value[selectedVariant.value].quantity < 10 && variants.value[selectedVariant.value].quantity > 0
})



const updateVariant = (index) => {
  selectedVariant.value = index
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
        <!-- don't need to use .value in templating, just inside the <script> block -->
        <h1>{{ title }}</h1>

        <!-- Conditional Rendering -->
        <!-- v-show is similar to v-if but renders and hides using display:none, so more performant if the code needs to appear and hide frequently-->
        <p v-show="popularItem">Popular Item!</p>

        <!-- v-if and v-else needs to be used on elements next to each other -->
        <p v-if="inStock">In Stock</p>
        <p v-else-if="almostOutOfStock">Almost sold out!</p>
        <p v-else>Out of Stock</p>

        <ul>
          <!-- details must be iterable to be compatible with v-for -->
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <!-- v-for and v-if can appear on the same element, however v-if is always processed first regardless of order-->
        <!-- Vue also relies on the virtual DOM similar to React so the key is required -->
        <div
            v-for="(variant, index) in variants"
            v-bind:key="variant.id"
            @mouseover="updateVariant(index)"
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