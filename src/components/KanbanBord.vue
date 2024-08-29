<template>
    <div class="kanban-container">
      <div class="kanban-bar">
        <h1>Kanban Board</h1>
      </div>
      <div class="kanban-board">
        test
      </div>
      <div class="footer">
        <p>&copy; 2024 Sebastian Heiberg.</p>
      </div>
    </div>
  </template>
    
    <style scoped lang="scss">
    .kanban-container {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .kanban-container .kanban-bar {
      color: white;
      padding: 1rem;
      text-align: center;
      background-color: #381010;

    }
    
    .kanban-container .kanban-board {
      display: flex;
      gap: 1rem;
      background-color: #fff9f3;
      flex-grow: 1;
      width: 100%;
      height: 100%; /* Ensure the Kanban board takes full height */
      overflow-x: scroll; /* Enable horizontal scrolling */
      overflow-y: hidden; /* Disable vertical scrolling */
    }
    
    .kanban-container .footer {
      text-align: center;
      padding: 1rem;
    }

    .footer {
    background-color: #381010;
    color: white;
    text-align: center;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
    </style>


  
  
  
 