<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import VueInput from "./VueInput.vue";

const router = useRouter();
const search = ref("");

function sendSearch() {
  router.push({ name: "searchAsset", params: { search: search.value } });
}
</script>

<template>
  <form class="search-coins" @submit.prevent="sendSearch">
    <VueInput v-model="search" :placeholder="$t('header.find_coins')" />
  </form>
</template>

<style scoped></style>
