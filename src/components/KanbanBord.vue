<template>
    <v-app>
      <v-container class="kanban-container" fluid>
        <v-app-bar app color="#381010">
          <v-toolbar-title class="text-center">Kanban Board</v-toolbar-title>
        </v-app-bar>
  
        <v-main class="kanban-main">
          <v-row class="kanban-board" no-gutters>
            <v-col
              v-for="(column, index) in columns"
              :key="index"
              cols="auto"
            >
              <KanbanColumn
                :title="column.title"
                :cards="column.cards"
                :columnIndex="index"
                :totalColumns="columns.length"
              />
            </v-col>
          </v-row>
        </v-main>
  
        <v-footer app color="#381010" dark>
          <v-col class="text-center">
            <span>&copy; 2024 Sebastian Heiberg.</span>
          </v-col>
        </v-footer>
      </v-container>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import KanbanColumn from './KanbanColumn.vue';
  import { columns as initialColumns, Column } from '../data/data';
  
  const columns = ref<Column[]>(initialColumns);
  </script>
  
  <style scoped lang="scss">
  .v-container.kanban-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  
  .kanban-main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden; /* Ensure no overflow */
    padding-top: 64px; /* Add padding to account for v-app-bar height */
  }
  
  .kanban-board {
    display: flex;
    gap: 1rem;
    background-color: #fff9f3;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  </style>
  