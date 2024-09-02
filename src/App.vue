<template>
  <v-app>
    <v-main>
      <v-app-bar app color="#381010">
        <v-toolbar-title class="text-center">Kanban Board</v-toolbar-title>
      </v-app-bar>
      <KanbanBoard />
      <v-footer app color="#381010" dark>
        <v-col class="text-center">
          <span>&copy; 2024 Sebastian Heiberg.</span>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from "./components/KanbanBoard.vue";
</script>

<style scoped lang="scss">
.v-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.v-main {
  flex-grow: 1;
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
}

</style>
