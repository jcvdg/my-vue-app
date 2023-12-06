import {computed, onMounted, ref, watch} from "vue";

//
// a composable - handles all cart related activities
//
export default function useCart () {
    const cart = ref([])
    const cartCount = computed(() => {
        return cart.value === null ? 0 : cart.value.length
    })

    onMounted(() => {
        fetch('http://localhost:3000/cart')
            .then(resp => resp.json())
            .then(data => cart.value = data.content)
    })

    // watch the cart, and update the server whenever the cart is updated
    watch(cart, (value, oldValue) => {
        if (oldValue === null) return

        fetch('http://localhost:3000/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: value
            })
        })
    })

    const updateCart = (id) => {
        // Instead of cart.value.push(id),
        // the below reassignment is necessary for the watch() to detect the change/update in cart
        cart.value = cart.value.concat(id)
    }

    return {cartCount, updateCart}
}