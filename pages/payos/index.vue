<template>


</template>

<script setup lang="ts">
await usePayOS().createPayment({
    orderCode: (new Date()).getTime(),
    amount: 1_000,
    description: 'test',
    cancelUrl: 'http://localhost:3000/payos/cancel',
    returnUrl: 'http://localhost:3000/payos/return',
})
</script>