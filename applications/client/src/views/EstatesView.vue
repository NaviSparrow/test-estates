<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import TableBase from '@/components/TableBase.vue';
import type { Column } from '@/components/TableBase.vue';
import { useFormatPrice } from '@/use/useFormatPrice';
import useDebouncedRef from '@/use/useDebouncedRef';
import { DefaultApi, type Estate } from '@/api';

const api = new DefaultApi();

enum EstateType {
  apartment = 'Квартира',
  house = 'Дом',
  commercial = 'Коммерческая недвижимость',
}

const tableColumns: Column[] = [
  { id: 1, name: 'Адрес', key: 'address', width: 'max-content', textAlign: 'left' },
  { id: 2, name: 'Город', key: 'city', width: '260px', textAlign: 'left' },
  { id: 3, name: 'Тип', key: 'type', width: 'auto', textAlign: 'center' },
  { id: 4, name: 'Цена', key: 'price', width: '150px', textAlign: 'center' },
];

const estatesData = ref<Estate[]>([]);
const loadingData = ref(false);

const fetchEstates = async () => {
  loadingData.value = true;

  const response = await api.getEstates(cityFilter.value, '', searchFilter.value);
  estatesData.value = response.data;

  loadingData.value = false;
};

const cityFilter = ref('');
const searchFilter = ref(useDebouncedRef('', 700));

const resetFilters = async () => {
  cityFilter.value = '';
  searchFilter.value = '';
  await fetchEstates();
};

const cityFilterHanlder = async (cityTofind: string) => {
  cityFilter.value = cityTofind;
  await fetchEstates();
};

const checkAddress = (address: string) => {
  const regex = new RegExp(`(${searchFilter.value})`, 'gi');
  return address.replace(regex, '<span class="highlight">$1</span>');
};

watch(searchFilter, async () => {
  cityFilter.value = '';
  await fetchEstates();
});

onMounted(async () => {
  await fetchEstates();
});
</script>

<template>
  <main>
    <section :class="$style['sections-wrapper']">
      <fieldset :class="$style['filters-wrapper']">
        <legend>Фильтрация</legend>
        <span>По городу: {{ cityFilter ? cityFilter : '---' }}</span>
        <div>
          <label :class="$style['filters-search']">
            <span>Найти по адресу:</span>
            <input
              v-model="searchFilter"
              type="text"
            />
          </label>
        </div>
        <button
          :class="$style['button-reset']"
          type="button"
          @click="resetFilters"
        >
          Cбросить
        </button>
      </fieldset>

      <TableBase
        :tableHead="tableColumns"
        :tableBody="estatesData"
      >
        <template #address="{ data }">
          <span
            v-if="searchFilter"
            v-html="checkAddress(data.address)"
          ></span>
          <span v-else>{{ data.address }}</span>
        </template>
        <template #city="{ data }">
          <div :class="$style['city-cell-wrapper']">
            <span>{{ data.city }}</span>
            <button
              v-if="!cityFilter"
              type="button"
              :class="$style['button-city-filter']"
              @click="() => cityFilterHanlder(data.city)"
            >
              найти
            </button>
          </div>
        </template>
        <template #type="{ data }">
          {{ EstateType[data.type] }}
        </template>
        <template #price="{ data }">
          {{ useFormatPrice(data.price, data.currency, 'ru') }}
        </template>
      </TableBase>
      <div v-if="estatesData.length === 0">Ничего не найдено...</div>
    </section>
  </main>
</template>

<style module>
.filters-wrapper {
  width: max-content;
  padding: 20px;
}

.filters-search > input {
  width: 250px;
  margin-left: 10px;
  padding: 5px 15px;
  border: 2px solid rgb(190, 231, 249);
  border-radius: 10px;
}

.button-reset {
  width: max-content;
  margin-top: 10px;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: rgb(190, 231, 249);
  font-size: 13px;
}

.sections-wrapper {
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
}

.city-cell-wrapper {
  display: flex;
  justify-content: space-between;
}

.button-city-filter {
  width: max-content;
  border: 1px solid rgb(47, 193, 255);
  padding: 5px 10px;
  border-radius: 8px;
  background-color: rgb(190, 231, 249);
  font-size: 13px;
}
</style>

<style>
.highlight {
  background-color: rgb(252, 252, 10);
  font-weight: bold;
}
</style>
