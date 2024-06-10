<template>
  <div>
    <h1>TODO LIST by Rizh</h1>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTask" placeholder="Tambahkan Kegiatan Baru">
      <button>Tambahkan</button>
    </form>
    <ul>
      <li v-for="(task, index) in tasksFiltered(completedOnly)" :key="index" :class="{ completed: task.completed }">
        <span @click="completeTask(index)" :style="{ textDecoration: task.completed ? 'line-through' : 'none', color: '#fff' }">{{ task.title }}</span>
        <button @click="completeTask(index)" class="check-btn">Selesai</button>
        <button @click="deleteTask(index)" class="delete-btn">Hapus</button>
      </li>
    </ul>
    <div>
      <input type="checkbox" id="completedOnly" v-model="completedOnly">
      <label for="completedOnly">Tampilkan yang belum selesai saja</label>
    </div>
    <p>Jumlah tugas yang belum selesai: {{ incompleteTaskCount }}</p>
  </div>
</template>

<script>
import { useTaskStore } from './stores/TaskStore';
import { ref, computed } from 'vue';

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref('');
    const completedOnly = ref(false);

    const addTask = () => {
      if (newTask.value.trim() !== '') {
        taskStore.addTask(newTask.value);
        newTask.value = '';
      }
    };

    const completeTask = (index) => {
      taskStore.completeTask(index);
    };

    const deleteTask = (index) => {
      taskStore.deleteTask(index);
    };

    const tasksFiltered = computed(() => taskStore.tasksFiltered(completedOnly.value));
    const incompleteTaskCount = computed(() => taskStore.incompleteTaskCount);

    return {
      newTask,
      completedOnly,
      addTask,
      completeTask,
      deleteTask,
      tasksFiltered,
      incompleteTaskCount,
    };
  }
};
</script>

<style>
h1 {
  margin-bottom: 20px;
  color: #fff; /* Set color of h1 to white */
}

form {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 5px;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #009688;
  color: #fff; /* Set button text color to white */
  border: none;
  cursor: pointer;
}

button.check-btn {
  background-color: #009688;
  color: #fff; /* Set button text color to white */
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

button.delete-btn {
  background-color: red;
  color: #fff; /* Set button text color to white */
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

li.completed span {
  text-decoration: line-through;
}

li span {
  flex: 1;
  cursor: pointer;
  color: #fff; /* Set task text color to white */
}
</style>
