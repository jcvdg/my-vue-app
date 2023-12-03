<script setup>
// reactive for objects, not JS primitives
// used for the state when there's a group of related data
// ref uses reactive behind the scenes
import { reactive } from 'vue'

const product = reactive({
  name: 'Socks'
})

// reassignment
product.name = "New Socks"
</script>

<template>
  <h1>{{ product.name }}</h1>
</template>