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
      >
        <KanbanCard :card="card" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {

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