<template>
    <div class="p-5 flex gap-5">
        <div class="flex flex-col gap-3 grow shrink">
            <UFormGroup size="xl" label="Order Code">
                <UInput type="number" v-model="reqBody.orderCode" />
            </UFormGroup>
            <UFormGroup size="xl" label="Amount">
                <UInput type="number" v-model="reqBody.amount" />
            </UFormGroup>
            <UFormGroup size="xl" label="Description">
                <UInput v-model="reqBody.description" />
            </UFormGroup>
            <UFormGroup size="xl" label="Request Body">
                <UTextarea :rows="10" :value="prettyReqBody" disabled />
            </UFormGroup>
            <UButton size="xl" @click="submit" color="blue">Submit</UButton>
            <UButton v-if="resBody?.data?.checkoutUrl" size="xl" :to="resBody.data.checkoutUrl" target="_blank">Checkout
            </UButton>
        </div>
        <div class="flex flex-col gap-3 grow shrink">
            <UFormGroup size="xl" label="Response Error">
                <UTextarea :rows="1" :value="resError" disabled />
            </UFormGroup>
            <UFormGroup size="xl" label="Response Body">
                <UTextarea :rows="22" :value="prettyResBody" disabled />
            </UFormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
const url = useRequestURL()
const reqBody = reactive({
    orderCode: 1,
    amount: 1_000,
    description: 'test',
    cancelUrl: `${url.origin}/payos/callback`,
    returnUrl: `${url.origin}/payos/callback`,
})
const resBody = ref()
const resError = ref()

const prettyReqBody = computed(() => JSON.stringify(reqBody, undefined, 4))
const prettyResBody = computed(() => {
    return JSON.stringify(resBody.value, undefined, 4)
})

watch(reqBody, val => {
    reqBody.orderCode = +val.orderCode
    reqBody.amount = +val.amount
})

async function submit() {
    const { data, error } = await usePayOS().createPayment(reqBody)
    resBody.value = data.value
    resError.value = error.value
}
</script>