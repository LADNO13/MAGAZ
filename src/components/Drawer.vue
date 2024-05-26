<script setup>
import DrawerHead from "./DrawerHead.vue";
import CardtemList from "./CardItemList.vue";
import infoBlock from "./infoBlock.vue";
import { ref, computed, inject } from "vue";
import axios from "axios";

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartDisabledButton: Boolean,
});

const { cart, closeDrawer } = inject("cart");

const isCreating = ref(false);
let orderId = ref(null);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await axios.post(
      "https://ef478aa972db15f4.mokky.dev/orders",
      {
        items: cart,
        totalPrice: props.totalPrice.value,
      }
    );

    cart.value = [];

    orderId = data.id;
  } catch (err) {
    console.log(err);
  } finally {
    isCreating.value = false;
  }
};

const cartDisabledButton = computed(
  () => isCreating.value || cartIsEmpty.value
);

const cartIsEmpty = computed(() => cart.value.length === 0);
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <infoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы оформить заказ"
        image-url="/package-icon.png"
      />

      <infoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской службе`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-if="!totalPrice" class="flex h-full items-center"></div>

    <CardtemList v-if="totalPrice" />

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} ₽</b>
      </div>

      <button
        :disabled="cartDisabledButton"
        @click="createOrder"
        class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate hover:bg-lime-600 active:bg-lime-700"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
