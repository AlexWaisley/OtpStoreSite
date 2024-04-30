<script setup lang="ts">

import { ref } from 'vue';
import { TotpCreateRequest } from '../models';
import toastr from 'toastr';
import 'toastr/toastr.scss';

import { useTotpStore } from '../stores/totpInfoStorage';
const totpStore = useTotpStore();

const newTotpRequest = ref<TotpCreateRequest>({
    name: '',
    secretKey: '',
    digitsCount: 6
});
const isCreatingNewInstance = ref(false);

const showForm = () => {
    isCreatingNewInstance.value = true;
}

const addTotp = () => {
    if (!newTotpRequest.value.name || !newTotpRequest.value.secretKey) {
        toastr.error('Name and key are required');
        return;
    }
    newTotpRequest.value.secretKey = newTotpRequest.value.secretKey.replace(/\s/g, '');

    totpStore.addTotp(newTotpRequest.value);
    isCreatingNewInstance.value = false;

    newTotpRequest.value = {
        name: '',
        secretKey: '',
        digitsCount: 6
    };
}

</script>
<template>

    <div class="add-totp-form">
        <div v-if="isCreatingNewInstance" class="creating-new-instance">
            <label for="Name">Service or application name:</label>
            <input autocomplete="off" type="text" name="Name" v-model="newTotpRequest.name" placeholder="Name" />

            <label for="SecretKey">Secret key:</label>
            <input autocomplete="off" type="text" name="SecretKey" v-model="newTotpRequest.secretKey" class="key"
                placeholder="JBSWY3DPEHPK3PXP" />

            <label for="DigitsCount">Digits count in totp:</label>
            <input type="number" name="DigitsCount" v-model="newTotpRequest.digitsCount" placeholder="6" />

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