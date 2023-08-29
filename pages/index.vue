<template>
    <div class="p-10 flex flex-col items-center gap-10">
        <NuxtLink v-for="gw in gws" :to="gw.link">
            <img :style="{ height: gw.h }" :src="gw.logo" alt="" srcset="">
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const gws = [
    {
        link: '/payos',
        logo: '/img/logopayos.svg',
        h: '5rem',
    },
    {
        link: '/zalopay',
        logo: '/img/logozalopay.png',
        h: '3.75rem'
    },
    {
        link: '/vnpay',
        logo: '/img/logovnpay.png',
        h: '4.5rem'
    },
]
</script>