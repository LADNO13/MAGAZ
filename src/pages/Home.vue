<script setup>
import { reactive, watch, ref, onMounted, provide } from "vue";
import axios from "axios";
import { inject } from "vue";
import CardList from "../components/CardList.vue";
import debounce from "lodash.debounce";

const items = ref([]);

const { cart, addToCart, removeFromCart } = inject("cart");

const filters = reactive({
  sortby: "title",
  seachQuery: "",
});

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item,
      };

      item.isFavorite = true;

      const { data } = await axios.post(
        `https://ef478aa972db15f4.mokky.dev/favotites`,
        obj
      );

      item.favotiteId = data.id;
      console.log(data);
    } else {
      item.isFavorite = false;

      await axios.delete(
        `https://ef478aa972db15f4.mokky.dev/favotites/${item.favotiteId}`
      );
      item.favotiteId = null;
    }
  } catch (err) {
    console.log(err);
  }
};

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }

  console.log(cart);
};

const onChangeSerchInput = debounce((event) => {
  filters.seachQuery = event.target.value;
}, 150);

const fetchFavorites = async () => {
  try {
    const { data: favotites } = await axios.get(
      `https://ef478aa972db15f4.mokky.dev/favotites`
    );
    items.value = items.value.map((item) => {
      const favotite = favotites.find(
        (favotite) => favotite.parentId === item.id
      );

      if (!favotite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favotiteId: favotite.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const fecthItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.seachQuery) {
      params.title = `*${filters.seachQuery}*`;
    }

    const { data } = await axios.get(
      `https://ef478aa972db15f4.mokky.dev/items`,
      { params }
    );

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favotiteId: null,
      isAdded: false,
    }));
  } catch (err) {
    console.log(err);
  }
};

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});

watch(filters, fecthItems);

onMounted(async () => {
  const localCart = localStorage.getItem("cart");
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fecthItems();
  await fetchFavorites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }));
});
</script>

<template>
  <div class="flex flex-col justify-between items-center bb:flex-row">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex flex-col gap-4 mb-8 bb:flex-row">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
      >
        <option value="name">По умолчанию</option>
        <option value="title">По названию</option>
        <option value="price">По цене(дешевые)</option>
        <option value="-price">По цене(дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSerchInput"
          class="border border-gray-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <CardList
    :items="items"
    @addToFavorite="addToFavorite"
    @addToCart="onClickAddPlus"
  />
</template>
