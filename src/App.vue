<script setup lang="ts">
import Main from './components/Main.vue';
import DownloadPage from './components/DownloadPage.vue';
import { useTotpStore } from './stores/totpInfoStorage';

const totpStore = useTotpStore();
</script>

<template>
  <Main v-if="totpStore.isReady" />
  <DownloadPage v-else></DownloadPage>
</template>

<style scoped lang="scss"></style>