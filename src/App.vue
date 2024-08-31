<template>
  <v-app>
    <v-main>
      <KanbanBoard />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue';
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
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>