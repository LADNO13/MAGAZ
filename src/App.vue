<script setup>
import Header from "./components/Header.vue";
import CardList from "./components/CardList.vue";
import Drawer from "./components/Drawer.vue";
import { ref, watch, provide, computed, inject } from "vue";
import axios from "axios";

// корзина Start

const cart = ref([]);

const drawerOpen = ref(false);

const closeDrawer = () => {
  drawerOpen.value = false;
};

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0)
);

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const openDrawer = () => {
  drawerOpen.value = true;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  },
  { deep: true }
);

provide("cart", {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
});

// корзина END
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-Price="vatPrice" />
  <div class="bg-white  m-auto rounded-xl shadow-xl mt-20 xs:w-4/5">
    <Header :total-price="totalPrice" @openDrawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
