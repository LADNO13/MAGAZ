<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import CardList from "../components/CardList.vue";

const favorites = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      "https://ef478aa972db15f4.mokky.dev/favotites"
    );

    favorites.value = data.map((obj) => obj.item);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <h1>Мои закладки</h1>

  <CardList :items="favorites" isFavorite />
</template>
