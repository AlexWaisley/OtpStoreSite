<script setup lang="ts">

import { defineProps, ref, watch } from 'vue';

import { TotpDto } from '../models';
import DeleteConfirmForm from './DeleteConfirmForm.vue';

const props = defineProps<{
    index: number;
}>();

import { useTotpStore } from '../stores/totpInfoStorage';
const totpStore = useTotpStore();
const timeToNextUpdateMoreAccurate = ref(totpStore.timeToUpdate);
const timeTonextUpdate = ref(totpStore.timeToUpdate);

const totpData = ref<TotpDto>({
    id: '',
    name: '',
    code: ''
});
const isDeleting = ref(false);

totpData.value = totpStore.totpList[props.index];

const startDeleteTotp = () => {
    isDeleting.value = true;
}

const deleteTotp = () => {
    console.log('deleting totp');
    totpStore.deleteTotp(totpData.value.id);
    isDeleting.value = false;
}

watch(() => totpStore.totpList, () => {
    totpData.value = totpStore.totpList[props.index];
});

setInterval(() => {
    timeToNextUpdateMoreAccurate.value -= 0.05;
    if (timeToNextUpdateMoreAccurate.value <= 0) {
        timeToNextUpdateMoreAccurate.value = 30;
    }
}, 50);
setInterval(() => {
    timeTonextUpdate.value = Math.floor(timeToNextUpdateMoreAccurate.value);
    if (timeTonextUpdate.value <= 0) {
        timeTonextUpdate.value = 30;
    }
}, 500);

</script>

<template>
    <DeleteConfirmForm v-if="isDeleting" @approve="deleteTotp" @cancel="isDeleting = false" />
    <div class="totp-container">
        <div class="totp">
            <div class="totp__label">{{ totpData.name }}</div>
            <div class="totp__value">{{ totpData.code }}</div>
            <div class="totp__time">
                <div class="progress-circle">
                    <div class="circle"> </div>
                    <div class="progress-number">
                        {{ timeTonextUpdate }}
                    </div>
                </div>
            </div>
            <div class="delete__btn" @click="startDeleteTotp">
                <img src="/trash.svg" alt="Delete" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$percentComplete: calc(100% / 30 * v-bind(timeToNextUpdateMoreAccurate));



.totp-container {
    padding: 2rem;
    display: flex;
    border-radius: 1rem;
    width: max(60%, 360px);
    max-width: 900px;
    height: 100px;
    background: linear-gradient(-45deg, #cd4e4eaa, #e16a98aa, #66bdddaa, #62d0b6aa);
    background-position: calc(100% - $percentComplete);
    background-size: 400% 400%;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .totp {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: .25rem;
        padding: 1rem;
        overflow: hidden;

        .totp__label,
        .totp__value,
        .totp__time {
            width: 100%;
            font-size: 1.5rem;
            display: flex;
            flex-shrink: 1;
            justify-content: center;
        }

        .totp__time {
            height: 50px;
            align-items: center;
            position: relative;

            .progress-circle {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #f1f1f1;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                .circle {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: conic-gradient(#ffd5ef $percentComplete, #f1f1f1 0% 100%);
                    position: absolute;
                }

                .progress-number {
                    position: absolute;
                    font-size: 1.5rem;
                }
            }

        }


        .delete__btn {
            padding: .25rem;
            margin: 0;
            color: black;
            width: 0;
            aspect-ratio: 1/1;
            height: 50px;
            transition: all 0.5s ease;
            border-radius: 1rem;
            transform: translateX(60px);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 1;
            cursor: pointer;

            &:hover {
                background-color: #f1f1f135;
            }
        }
    }

    &:hover {
        .totp {
            .delete__btn {
                width: 50px;
                transform: translateX(0);
            }
        }
    }
}
</style>