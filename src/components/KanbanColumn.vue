<template>
  <v-container
    class="kanban-column"
    :data-column-index="columnIndex"
    fluid
    @dragover="onDragOver"
    @drop="onDropColumn(columnIndex)"
  >
    <v-row class="column-title">
      <v-col>
        <h2 class="text-center">{{ title }}</h2>
      </v-col>
      <v-col class="column-title-icon" cols="auto">
        <v-btn small icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="cards-container">
      <v-col
        v-for="(card, cardIndex) in cards"
        :key="card.id"
        class="kanban-card"
        :data-id="card.id"
        draggable="true"
        @dragstart="onDragStart(columnIndex, card.id)"
        @dragover="onDragOver"
        @drop="onDropCard($event, columnIndex, cardIndex)"
      >
        <KanbanCard :card="card" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue';
import KanbanCard from '@/components/KanbanCard.vue';

interface Card {
  id: number;
  title: string;
  taskDescription: string;
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
  emits: ['moveCardWithinColumn', 'moveCardBetweenColumns'],
  setup(props, { emit }) {
    const { cards, columnIndex } = toRefs(props);
    const draggedCardId = ref<number | null>(null); // Initialize as null
    const fromColumnIndex = ref<number | null>(null); // Initialize as null


    const onDragStart = (columnIndex: number,cardId: number) => {
        draggedCardId.value = cardId;
        fromColumnIndex.value = columnIndex;
        console.log("fromColumnIndex ondragstart: ", fromColumnIndex.value);
        console.log("columnindex in ondragstart: ", columnIndex);
     };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(fromColumnIndex.value);
        console.log(DragEvent)
    };

    const onDropCard = (event: DragEvent, toColumnIndex: number, toCardIndex: number | null = null) => {

        event.preventDefault(); // Prevent default behavior
        event.stopPropagation(); // Stop the event from bubbling up, and not triggering the onDropColumn event

        const fromColumnIndex = columnIndex.value; 
        const cardId = draggedCardId.value;
        console.log("cardId: ", cardId); 

        // If dropping within the same column
        if (fromColumnIndex === toColumnIndex) {
          const fromCardIndex = cards.value.findIndex((card) => card.id === cardId);
          if (toCardIndex !== null && fromCardIndex !== toCardIndex) {
            emit('moveCardWithinColumn', fromColumnIndex, fromCardIndex, toCardIndex);
          }
        } else if (fromColumnIndex !== toColumnIndex){
          console.log("testing");
        }

    };

    const onDropColumn = (toColumnIndex: number) => {

      console.log(fromColumnIndex.value);

      try {
        const cardId = draggedCardId.value;

        if (cardId === null || fromColIndex === null) return; 

        if (fromColumnIndex.value !== toColumnIndex) {
          emit('moveCardBetweenColumns', cardId, fromColIndex, toColumnIndex, cards.value.length);
        }
      } catch (error) {
        console.error("Error in onDropColumn:", error);
      }
    };

    return {
      cards,
      onDragStart,
      onDragOver,
      onDropCard,
      onDropColumn
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
  min-width: 150px;
  margin: 10px;
  max-width: 250px;
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

.column-title-icon {
  margin: 0;
  display: flex;
  align-items: self-end; 
  padding: 5px;
}

</style>