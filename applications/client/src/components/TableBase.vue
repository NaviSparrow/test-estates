<script setup lang="ts">
import { toRefs, type StyleValue } from 'vue';

export interface Column {
  id: number;
  name: string;
  key: string;
  width: string;
  textAlign: string;
}

interface Props {
  tableHead: Column[];
  tableBody: Record<string, unknown>[];
}

const props = defineProps<Props>();
const { tableHead, tableBody } = toRefs(props);
</script>

<template>
  <table :class="$style.table">
    <caption>
      Test Estates Table
    </caption>
    <thead :class="$style['table-head']">
      <tr>
        <th
          v-for="column in tableHead"
          :key="column.id"
          scope="col"
          :style="{ width: column.width }"
          :class="$style['table-head-cell']"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="estateItem in tableBody"
        :key="estateItem.id as number"
      >
        <td
          v-for="(column, index) in tableHead"
          :key="column.id"
          :class="$style['table-body-cell']"
          :style="{ textAlign: column.textAlign } as StyleValue"
        >
          <slot
            :data="estateItem"
            :name="column.key"
            :index="index"
          >
            {{ estateItem[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module>
.table {
  border: 2px solid rgb(140 140 140);
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.table-head > tr {
  background-color: rgb(190, 231, 249);
}

.table-head-cell {
  padding: 12px 20px;
}

.table-body-cell {
  padding: 8px 20px;
  border: 1px solid black;
}

.table-cell-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
