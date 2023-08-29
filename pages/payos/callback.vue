<template>
    <div class="p-5 flex flex-col gap-3">
        <UFormGroup size="xl" label="Callback">
            <UTextarea :rows="7" :value="prettyData" disabled />
        </UFormGroup>
        <UFormGroup size="xl" label="Payment Info">
            <UTextarea :rows="30" :value="prettyPayData" disabled />
        </UFormGroup>
    </div>
</template>

<script setup lang="ts">
import { CallbackParams } from '~/composables/usePayOS';

const route = useRoute()
const data = route.query as unknown as CallbackParams
const prettyData = JSON.stringify(data, undefined, 4)
const { data: payData } = await usePayOS().getPayment(+data.orderCode)
const prettyPayData = computed(() => JSON.stringify(payData.value, undefined, 4))
</script>