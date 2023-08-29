<template>
    <div class="p-5">
        <UFormGroup size="xl" label="Callback">
            <UTextarea :rows="7" :value="prettyData" />
        </UFormGroup>
    </div>
</template>

<script setup lang="ts">
import { CallbackParams } from '~/composables/usePayOS';

const route = useRoute()
const data = route.query as unknown as CallbackParams
const prettyData = JSON.stringify(data, undefined, 4)
</script>