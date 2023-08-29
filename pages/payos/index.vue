<template>
{{ res.data.value }}
</template>

<script setup lang="ts">
const route = useRoute()
const res = await usePayOS().createPayment({
    orderCode: (new Date()).getTime(),
    amount: 1_000,
    description: 'test',
    cancelUrl: `${route.fullPath}/cancel`,
    returnUrl: `${route.fullPath}/return`,
})
</script>