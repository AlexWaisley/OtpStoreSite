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
        <div :class="isCreatingNewInstance ? 'active' : 'disactive'" class="creating-new-instance">
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

        <button :class="isCreatingNewInstance ? 'disactive' : 'active'" class="show-form" @click="showForm">Add</button>
    </div>

</template>
<style scoped lang="scss">
.add-totp-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #ffffff28;
    border-radius: 1rem;
    padding: 2rem;
    width: max(60%, 360px);
    max-width: 900px;
    transition: all 0.5s ease;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    min-height: 100px;


    .show-form {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(251, 187, 194, 0.106);
        gap: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        padding: 2rem;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.096);
        transition: all 0.5s ease;

        &:hover {
            background-color: rgba(251, 187, 195, 0.409);
        }
    }

    .creating-new-instance {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        transition: all 0.5s ease;

        input {
            padding: 1rem;
            border-radius: 1rem;
            border: none;
            background-color: rgb(255, 229, 232);
            transition: all 0.5s ease;
            font-size: 1rem;
            font-family: sans-serif;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.096);

            &:focus {
                outline: none;
                background-color: rgb(255, 221, 225);
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.451);
            }
        }

        button {
            padding: 1rem;
            border-radius: 1rem;
            border: none;
            background-color: rgba(251, 187, 195, 0.409);
            transition: all 0.5s ease;
            font-size: 1rem;
            font-family: sans-serif;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.096);

            &:hover {
                background-color: rgba(255, 145, 157, 0.409);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.276);
            }
        }

        .key {
            font-family: password;
        }
    }
}


.active {
    transform: translateX(0);
}

.disactive {
    position: absolute;
    height: 0;
    opacity: 0;
    transform: translateX(-200%);
}
</style>