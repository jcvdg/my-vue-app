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
    <!-- heading from the parent -->
      <!--<h3>Reviews:</h3>-->
      <slot name="heading"></slot>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <!-- item markup from the parent -->
          <!--<span>{{ review.name }} gave this {{ review.rating }}</span>-->
          <!--<br />-->
          <!--<span>{{ review.content }}</span>-->

          <!-- we need to pass review backup to the parent component - via prop binding -->
          <slot name="item" :review="review">
            <!-- slot from the parent is optional, so the below would be the default if the parent doesn't provide the named templates -->
            <span>{{ review.name }}</span>: <span>{{ review.rating }}</span>
          </slot>
      </li>
    </ul>
  </div>
</template>