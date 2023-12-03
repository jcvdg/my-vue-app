<script setup>
// ref is same as useState
// ref is for reference to reactivity, not ref to object, so our state is the ref object.
// for JS primitive types

// The idea is that the value 'Socks', a string, is not a reference
// However, we need a reference object to facilitate reactivity in a Vue component.
// e.g. When we change a variable value from 'Socks' to 'New Socks', we're reassigning the variable to a different value.
//      Then the original value of 'Socks' is lost, and thus the reactivity is lost as well.
//      => We wrap the 'Socks' value in an object with ref.
// Our state is the ref object "ref('Socks')", and not the string value.
import { ref } from 'vue'

const product = ref('Socks')

// reassignment
product.value = 'New Socks'
</script>

<template>
  <h1>{{ product }}</h1>
</template>