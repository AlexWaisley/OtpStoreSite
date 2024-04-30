<script setup lang="ts">

import { ref } from 'vue';
import { TotpForm } from '../models/TotpForm';
import toastr from 'toastr';
import 'toastr/toastr.scss';

import { useTotpStore } from '../storage/totpInfoStorage';
const totpStore = useTotpStore();

const totpData = ref<TotpForm>({
    name: '',
    key: '',
    digitsCount: 6,
    isDeleted: false
});
const isCreatingNewInstance = ref(false);

const showForm = () => {
    isCreatingNewInstance.value = true;
}

const addTotp = () => {
    if (!totpData.value.name || !totpData.value.key) {
        toastr.error('Name and key are required');
        return;
    }

    totpStore.addTotp(totpData.value);
    isCreatingNewInstance.value = false;

    totpData.value = {
        name: '',
        key: '',
        digitsCount: 6,
        isDeleted: false
    };
}

</script>
<template>

    <div class="add-totp-form">
        <div v-if="isCreatingNewInstance" class="creating-new-instance">
            <label for="Name">Service or application name:</label>
            <input autocomplete="off" type="text" name="Name" v-model="totpData.name" placeholder="Name" />

            <label for="SecretKey">Secret key:</label>
            <input autocomplete="off" type="text" name="SecretKey" v-model="totpData.key" class="key"
                placeholder="JBSWY3DPEHPK3PXP" />

            <label for="DigitsCount">Digits count in totp:</label>
            <input type="number" name="DigitsCount" v-model="totpData.digitsCount" placeholder="6" />

            <button @click="addTotp">Add</button>
            <button @click="isCreatingNewInstance = false">Cancel</button>
        </div>

        <button v-else @click="showForm">Add</button>
    </div>

</template>
<style scoped lang="scss">
.add-totp-form {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 2rem;
    width: 60%;

    .creating-new-instance {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        .key {
            font-family: password;
        }
    }
}
</style>