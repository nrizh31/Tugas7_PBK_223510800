<template>
  <div class="app-container">
    <div class="todo-container">
      <h1>TODO LIST by Rizh</h1>
      <form @submit.prevent="addTask">
        <input type="text" v-model="newTask" placeholder="Tambahkan Kegiatan Baru">
        <button type="submit">Tambahkan</button>
      </form>
      <ul>
        <li v-for="(task, index) in tasksFiltered" :key="index" :class="{ completed: task.completed }">
          <span @click="completeTask(index)" :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
            {{ task.title }}
          </span>
          <button @click="completeTask(index)" class="check-btn">Selesai</button>
          <button @click="deleteTask(index)" class="delete-btn">Hapus</button>
        </li>
      </ul>
      <p>Jumlah tugas yang belum selesai: {{ incompleteTaskCount }}</p>
    </div>
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

    const tasksFiltered = computed(() => {
      return completedOnly.value ? taskStore.tasks.filter(task => !task.completed) : taskStore.tasks;
    });

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
/* Mengatur latar belakang halaman agar hitam dan menghilangkan margin dan padding bawaan */
html, body {
  background-color: #000; /* Warna latar belakang hitam */
  margin: 0;
  padding: 0;
  color: #fff; /* Mengatur warna teks default menjadi putih */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.todo-container {
  background-color: rgba(128, 128, 128, 0.8); /* Mengatur warna latar belakang abu-abu transparan */
  color: #fff; /* Mengatur warna teks default menjadi putih */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  color: #fff; /* Mengatur warna teks h1 menjadi putih */
  text-align: center;
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
  color: #fff; /* Mengatur warna teks tombol menjadi putih */
  border: none;
  cursor: pointer;
}

button.check-btn {
  background-color: #009688;
  margin-left: 10px;
}

button.delete-btn {
  background-color: red;
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
  color: #fff; /* Mengatur warna teks tugas menjadi putih */
}
</style>
