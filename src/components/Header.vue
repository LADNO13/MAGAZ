<script setup>
defineProps({
  totalPrice: Number,
});

const emit = defineEmits(["openDrawer"]);
</script>

<template>
  <header class="flex flex-col  border-b border-slate-300 px-8 bb:flex-row justify-between">
    <router-link to="/">
      <div class="flex items-center justify-center  gap-4 ">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div class="">
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин Лучших кросовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-20 justify-center my-5  sm:gap-10 ">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <span class="hidden sm:block">{{ totalPrice }} руб.</span>
      </li>

      <router-link to="/favorites">
        <li
          class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
        >
          <img src="/heart.svg" alt="Cart" />
          <span class="hidden sm:block">Закладки</span>
        </li>
      </router-link>

      <li
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/profile.svg" alt="Cart" />
        <span class="hidden sm:block">Профиль</span>
      </li>
    </ul>
  </header>
</template>
