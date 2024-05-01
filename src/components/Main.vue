<script setup lang="ts">
import TotpContainer from './TotpContainer.vue';
import AddTotpForm from './AddTotpForm.vue';
import { useTotpStore } from '../stores/totpInfoStorage';

const totpStore = useTotpStore();
</script>
<template>
    <div class="main">
        <div class="container">
            <TotpContainer v-for="(_, index) in totpStore.totpList" :index="index" />
            <AddTotpForm />
        </div>
    </div>
</template>
<style scoped lang="scss">
.main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(109.6deg, rgb(255, 221, 225) 11.2%, rgb(255, 255, 255) 92.2%);
    justify-content: center;

    .container {
        max-width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        overflow-y: auto;

        @media screen and (min-width: 400px) {
            align-items: center;
        }
    }
}
</style>