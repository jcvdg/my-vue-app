<script setup>
import {computed, ref} from 'vue'
// @ is absolute path syntax allowing import from any dir
import socksBlueImage from '@/assets/images/socks_blue.jpeg'
import socksGreenImage from '../assets/images/socks_green.jpeg'
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewList from "@/components/ReviewList.vue";
import ProductDetails from "@/components/ProductDetails.vue";

// props passed from the parent component
// this is a Compiler Macro, meaning we don't need to import it as it's not a runtime function
const props = defineProps({
  premium: {
    type: Boolean,
    required: true, // required is optional
  },
  foo: {
    type: Array, // reference type is Array or Object
    default: () => [1,2,3] // reference type requires a Factory function to set default value
  },
  bar: {
    type: [String, Number], // union, either a String or a Number is allowed
    default: 1 // optional
  },
  // it's possible to pass a callback function as a prop
  // However, the Vue way to setup callback props is to define an Emitting Custom Event
  myCallbackProp: Function,
})

// Custom Event
// defineEmits accepts multiple events in the array
// defineEmits return an emit function, used to trigger custom event
const emit = defineEmits(['add-to-cart'])

const product = ref('Socks')
const brand = ref('Vue Mastery')
const popularItem = ref(true)
const selectedVariant = ref(0)
const reviews = ref([])

const details = ref(['50% cotton', '30% wool', '20% polyester'])
const description = ref('Beautifully soft socks that\'ll make everyone envious.')
const variants = ref([
  { id: 2234, color: 'green', image: socksGreenImage, quantity: 50 },
  { id: 2235, color: 'blue', image: socksBlueImage, quantity: 0 }
])

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

const shipping = computed(() => {
  // NOTE that it's not necessary to use .value to access the value of the props
  // this is a sign that we should not change the value of the prop
  return props.premium ? 'Free' : 2.99
})

const addToCart = () => {
  // emits the custom 'add-to-cart' event for other components to listen to
  emit('add-to-cart', variants.value[selectedVariant.value].id)
}

const updateVariant = (index) => {
  selectedVariant.value = index
}

const addReview = (review) => {
  reviews.value.push(review)
  console.log('reviews ', review)
}
</script>

<template>
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
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <!-- details must be iterable to be compatible with v-for -->
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <!-- v-for and v-if can appear on the same element, however v-if is always processed first regardless of order-->
        <!-- Vue also relies on the virtual DOM similar to React so the key is required -->
        <div class="color-select-container">
          <div
              v-for="(variant, index) in variants"
              v-bind:key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }"
          >
          </div>
        </div>

        <!-- Default Slot -->
        <!--<ProductDetails :description="description">-->
        <ProductDetails>
          <template #default>
            <h3>Product Description:</h3>
            <p>{{ description }}</p>
          </template>
        </ProductDetails>

        <!-- v-on:click takes a callback function, similar to React: (event) => {cart += 1} -->
        <!-- however the Function Wrapper is optional as it'll be added automatically by the compiler -->
        <!-- v-on:click.once="cart += 1" -->
        <!-- or pass in the function directly -->
        <!-- v-on:click.once or @click.once: the once is a event modifier that ensures the event is triggered only once -->
        <button
            class="button"
            :class="{ disabledButton: inventory <= 0}"
            v-on:click.once="addToCart"
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

<!--      &lt;!&ndash; Default Slot &ndash;&gt;-->
<!--        &lt;!&ndash;<ProductDetails :description="description">&ndash;&gt;-->
<!--        <ProductDetails>-->
<!--          <template #default>-->
<!--            <h3>Product Description:</h3>-->
<!--            <p>{{ description }}</p>-->
<!--          </template>-->
<!--        </ProductDetails>-->

    </div>

    <ReviewList :reviews="reviews" >
      <!-- the below named templates are optional -->
      <template #heading>
        <h3>Reviews:</h3>
      </template>

      <!--<template #item="slotProps">-->
      <!-- alternatively in the destructuring syntax: -->
      <template #item="{ review }">
        <span>{{ review.name }} gave this {{ review.rating }}</span>
        <br />
        <span>{{ review.content }}</span>
      </template>
    </ReviewList>
    <ReviewForm @review-submitted="addReview" />
  </div>

</template>

<style scoped>
p {
  color: midnightblue;
  font-weight: bold;
}
</style>