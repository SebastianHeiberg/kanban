<template>
  <v-container class="kanban-container">
    <v-app-bar app color="#381010">
      <v-toolbar-title class="text-center">Kanban Board</v-toolbar-title>
    </v-app-bar>

    <v-main class="kanban-main">
      <div class="kanban-board">
        test
      </div>
    </v-main>

    <v-footer app color="#381010" dark>
      <v-col class="text-center">
        <span>&copy; 2024 Sebastian Heiberg.</span>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'KanbanBord'
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
}

.kanban-main {
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
  padding: 0;
}


.kanban-board {
  display: flex;
  gap: 1rem;
  background-color: #fff9f3;
  flex-grow: 1;
  width: 100vh;
  height: 100%; 
  overflow-x: scroll; 
  overflow-y: hidden; 
}

</style>