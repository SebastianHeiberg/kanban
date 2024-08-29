export interface Card {
    id: number;
    title: string;
    taskDescription: string;
  }
  
  export interface Column {
    title: string;
    cards: Card[];
  }
  
  export const columns: Column[] = [
    { 
      title: 'To Do', 
      cards: [
        { id: 1, title: 'Task a', taskDescription: 'Description for Task a' }, 
        { id: 2, title: 'Task b', taskDescription: 'Description for Task b' }, 
        { id: 3, title: 'Task c', taskDescription: 'Description for Task c' }, 
        { id: 4, title: 'Task d', taskDescription: 'Description for Task d' }
      ] 
    },
    { 
      title: 'In Progress', 
      cards: [
        { id: 3, title: 'Task e', taskDescription: 'Description for Task e' }
      ] 
    },
    { 
      title: 'Stuck', 
      cards: [
        { id: 4, title: 'Task f', taskDescription: 'Description for Task f' }
      ] 
    },
    { 
      title: 'Done', 
      cards: [
        { id: 4, title: 'Task g', taskDescription: 'Description for Task g' }
      ] 
    },
  ];