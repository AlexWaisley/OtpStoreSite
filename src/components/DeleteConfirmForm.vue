<script setup lang="ts">
//return emit to the parent component
import { defineEmits } from 'vue';
const emits = defineEmits(['approve', 'cancel']);
</script>
<template>
    <div class="delete-confirm">
        <div class="delete-confirm__content">
            <p>Are you sure you want to delete this totp?</p>
            <button @emit="$emit('approve')" class="approve">Yes</button>
            <button @click="$emit('cancel')" class="reject">No</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.delete-confirm {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-content: center;

    .delete-confirm__content {
        background-color: #fff;
        font-size: 1.25rem;
        padding: 2rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .approve,
        .reject {
            padding: 1rem;
            border-radius: 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            &.approve {
                background-color: #ff0000;
                color: #fff;

                &:hover {
                    background-color: #c00000;
                }
            }

            &.reject {
                background-color: #00ff00;
                color: #fff;

                &:hover {
                    background-color: #00c000;
                }
            }

        }
    }
}
</style>