<script setup>
// defineProps({
//   description: {
//     type: String,
//     required: true,
//   }
// })
</script>

<template>
  <div class="description-container">
    <!-- Default Slot -->
      <!--<h3>Product Description:</h3>-->
      <!--<p>{{ description }}</p>-->
      <slot></slot>
  </div>
</template>

<style scoped>

</style>