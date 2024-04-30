<script setup lang="ts">

import { defineProps, ref, watch } from 'vue';

import { TotpForm } from '../models/TotpForm';
import DeleteConfirmForm from './DeleteConfirmForm.vue';

const props = defineProps<{
    index: number;
}>();

import { useTotpStore } from '../stores/totpInfoStorage';
const totpStore = useTotpStore();
const timeToNextUpdate = ref(totpStore.timeToUpdate);

const totpData = ref<TotpForm>({
    name: '',
    key: '',
    digitsCount: 0,
    isDeleted: false
});
const isDeleting = ref(false);

totpData.value = totpStore.totpList[props.index];

const deleteTotp = () => {
    isDeleting.value = true;
}

watch(() => totpStore.totpList, () => {
    totpData.value = totpStore.totpList[props.index];
});

setInterval(() => {
    timeToNextUpdate.value--;
    if (timeToNextUpdate.value === 0) {
        timeToNextUpdate.value = 30;
    }
}, 1000);

</script>

<template>
    <DeleteConfirmForm v-if="isDeleting" @approve="totpStore.deleteTotp(totpData.name)" @cancel="isDeleting = false" />
    <div class="totp-container">
        <div class="totp">
            <div class="totp__label">{{ totpData.name }}</div>
            <div class="totp__value">{{ totpData.key }}</div>
            <div class="totp__time">
                <div class="progress-circle">
                    <div class="circle"> </div>
                    <div class="progress-number">
                        {{ timeToNextUpdate }}
                    </div>
                </div>
            </div>
            <div class="delete__btn" @click="deleteTotp">
                <img src="/trash.svg" alt="Delete" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$percentComplete: calc(100% / 30 * v-bind(timeToNextUpdate));

.totp-container {
    padding: 2rem;
    display: flex;
    background-color: #fff;
    border-radius: 1rem;
    width: max(60%, 360px);

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
                    background: conic-gradient(#86dbff $percentComplete, #f1f1f1 0% 100%);
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

            &:hover {
                background-color: #f1f1f1;
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