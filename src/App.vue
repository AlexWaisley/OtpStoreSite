<script setup lang="ts">
import Main from './components/Main.vue';
import { useTotpStore } from './storage/totpInfoStorage';

const totpStore = useTotpStore();
</script>

<template>
  <Main v-if="totpStore.isReady" />
</template>

<style scoped lang="scss"></style>
