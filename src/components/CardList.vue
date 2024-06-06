<script setup>
import Card from "./Card.vue";

defineProps({
  items: Array,
  isFavorite: Boolean,
});

const emit = defineEmits(["addToFavorite", "addToCart"]);
</script>

<template>
  <div class="grid grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickFavorite="isFavorite ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
