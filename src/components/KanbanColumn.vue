<template>
  <v-container class="kanban-column" :data-column-index="columnIndex" fluid>
    <v-row>
      <v-col>
        <h2 class="column-title text-center">{{ title }}</h2>
      </v-col>
    </v-row>
    <v-row class="cards-container">
      <v-col
        v-for="card in cards"
        :key="card.id"
        class="kanban-card"
        :data-id="card.id"
        draggable="true"
        @dragstart="onDragStart($event, card.id)"
        @dragend="onDragEnd"
      >
        <KanbanCard :card="card" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import KanbanCard from '@/components/KanbanCard.vue';

interface Card {
  id: number;
  title: string;
}

export default defineComponent({
  name: 'KanbanColumn',
  components: {
    KanbanCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    cards: {
      type: Array as () => Card[],
      required: false
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  emits: ['moveCard'],
  setup(props, { emit }) {
    const { cards, columnIndex } = toRefs(props);

    let draggedCardId: number | null = null;

    const onDragStart = (event: DragEvent, cardId: number) => {
      draggedCardId = cardId;
      event.dataTransfer?.setData('text/plain', cardId.toString());
    };

    const onDragEnd = (event: DragEvent) => {
      const toElement = document.elementFromPoint(event.clientX, event.clientY);
      const toColumnElement = toElement?.closest('.kanban-column');

      if (!toColumnElement || toElement === null) {
        return;
      }

      const toColumnIndex = parseInt(toColumnElement?.getAttribute('data-column-index') || '', 10);
      const fromColumnIndex = columnIndex.value;

      if (fromColumnIndex !== toColumnIndex) {
        emit('moveCard', draggedCardId, fromColumnIndex, toColumnIndex);
      } else {
        const fromCardIndex = cards.value.findIndex(card => card.id === draggedCardId);
        const toCard = toElement?.closest('.kanban-card');
        const toCardIndex = cards.value.findIndex(card => card.id === parseInt(toCard?.getAttribute('data-id') || '', 10));

        if (fromCardIndex !== -1 && toCardIndex !== -1) {
          emit('moveCard', draggedCardId, fromColumnIndex, fromColumnIndex, fromCardIndex, toCardIndex);
        }
      }

      draggedCardId = null; // Reset dragged card ID
    };

    return {
      cards,
      onDragStart,
      onDragEnd
    };
  }
});
</script>

<style scoped>
.kanban-column {
  background-color: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  min-width: 200px;
  margin: 10px;
  
}

.column-title {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 1rem;
  color: black;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1; 

}

.kanban-card {
  cursor: grab;
}

.kanban-card:active {
  cursor: grabbing;
}
</style>