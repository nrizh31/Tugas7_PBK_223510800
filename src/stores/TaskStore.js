import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      { title: 'Tugas Pert7', completed: false },
    ],
  }),
  actions: {
    addTask(title) {
      this.tasks.push({ title, completed: false });
    },
    completeTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  },
  getters: {
    incompleteTaskCount: (state) => {
      return state.tasks.filter(task => !task.completed).length;
    }
  }
});
