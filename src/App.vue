<script setup>
import { ref } from 'vue'
import socksGreenImage from './assets/images/socks_green.jpeg'

const product = ref('Socks')
const image = ref(socksGreenImage)
const popularItem = ref(true)
const inventory = ref(8)

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const variants = ref([
  { id: 2234, color: 'green' },
  { id: 2235, color: 'blue' }
])
</script>

<template>
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
        <div v-for="variant in variants" v-bind:key="variant.id">{{ variant.color }}</div>
      </div>
    </div>
  </div>
</template>