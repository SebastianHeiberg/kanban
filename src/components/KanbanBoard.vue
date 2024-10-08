<template>
  <v-container class="kanban-container" fluid>
      <v-row class="kanban-board" no-gutters>
        <v-col v-for="(column, index) in columns" :key="index" cols="auto">
          <KanbanColumn
            :title="column.title"
            :cards="column.cards"
            :columnIndex="index"
            :totalColumns="columns.length"
            @moveCard="moveCard"
            @moveCardBetweenColumns="moveCardBetweenColumns"
            @dragStart="onDragStart"
          />
        </v-col>
      </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import { columns as defaultColumns, Column } from "../data/data";

// Define props
const props = defineProps<{ initialColumns?: Column[] }>();

// Use provided initialColumns or fallback to defaultColumns
const columns = ref<Column[]>(props.initialColumns || defaultColumns);

const draggedCardId = ref<number | null>(null);
const fromColumnIndex = ref<number | null>(null);

/* Handles moving a card within the same column, or being dropped 
on a card in another column */
const moveCard = (toColumnIndex: number, toCardIndex: number) => {
  if (fromColumnIndex.value === null || draggedCardId.value === null) {
    return;
  }

  const column = columns.value[fromColumnIndex.value];
  const fromCardIndex = column.cards.findIndex(
    (card) => card.id === draggedCardId.value
  );
  const [movedCard] = column.cards.splice(fromCardIndex, 1);

  if (fromColumnIndex.value === toColumnIndex) {
    column.cards.splice(toCardIndex, 0, movedCard);
  } else {
    const toColumn = columns.value[toColumnIndex];
    toColumn.cards.splice(toCardIndex, 0, movedCard);
  }
};

// Handles moving a card between different columns, if not dropping on a card
const moveCardBetweenColumns = (toColumnIndex: number) => {
  if (fromColumnIndex.value === null || draggedCardId.value === null) {
    return;
  }

  const fromColumn = columns.value[fromColumnIndex.value];
  const toColumn = columns.value[toColumnIndex];

  const cardIndex = fromColumn.cards.findIndex(
    (card) => card.id === draggedCardId.value
  );
  if (cardIndex !== -1) {
    const [movedCard] = fromColumn.cards.splice(cardIndex, 1);
    toColumn.cards.unshift(movedCard);
  }
};

/* Handles the start of a drag event,
put it here because the fromColumnIndex gets reset, when passing to another column, 
when i assign value in the column component */
const onDragStart = (columnIndex: number, cardId: number) => {
  draggedCardId.value = cardId;
  fromColumnIndex.value = columnIndex;
};
</script>

<style scoped lang="scss">
.v-container.kanban-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.kanban-board {
  display: flex;
  gap: 1rem;
  background-color: #fff9f3;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  justify-content: center;
}
</style>
