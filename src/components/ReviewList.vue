<script setup>
// since we're not uses props inside the <script />, we don't have to create a new variable
// as the reviews prop is available to the template variable automatically
defineProps({
  reviews: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div class="review-container">
    <h3>Reviews:</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <span>{{ review.name }} gave this {{ review.rating }}</span>
        <br />
        <span>{{ review.content }}</span>
      </li>
    </ul>
  </div>
</template>