<template>
    <v-card class="kanban-card">
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text>{{ card.taskDescription }}</v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  interface Card {
    id: number;
    title: string;
    taskDescription: string;
  }
  
  const props = defineProps<{
    card: Card;
  }>();
  </script>
  
  <style scoped>
  .kanban-card {
    cursor: grab;
    height: 150px;
    display: flex;
    flex-direction: column;
  }
  
  .kanban-card:active {
    cursor: grabbing; 
  }
  
  .kanban-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  </style>