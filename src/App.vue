<script setup lang="ts">
import { ArrowBigRight } from 'lucide-vue-next'
import { ref } from 'vue'
import TaskCard from './components/TaskCard.vue'
import './configs/styles.css'
import { useTasksStore } from './stores/TasksStore'

const tasks = useTasksStore()
const newTaskTitle = ref('')

const addNewTask = () => {
  if (newTaskTitle.value.trim() !== '') {
    tasks.addTask(newTaskTitle.value.trim())
    newTaskTitle.value = ''
  }
}
</script>

<template>
  <main class="main">
    <h1 class="header">My ToDo App!</h1>
    <div class="card">
      <form class="card__form" @submit.prevent="addNewTask">
        <input
          type="text"
          placeholder="Here you can add a new task..."
          class="card__form__input"
          v-model="newTaskTitle"
          @keyup.enter.prevent="addNewTask"
        />
        <button type="submit" @click.prevent="addNewTask" class="card__form__button">
          <ArrowBigRight :size="20" />
        </button>
      </form>

      <div class="tasks_list">
        <div v-for="task in tasks.tasks" :key="task.id">
          <TaskCard v-if="!task.completed" :task="task" />
        </div>
        <div v-if="tasks.tasks.some((task) => task.completed)" class="tasks_list__separator"></div>
        <div v-for="task in tasks.tasks" :key="task.id">
          <TaskCard v-if="task.completed" :task="task" />
        </div>
      </div>
      <p class="watermark">Made by Jez-er.</p>
    </div>
  </main>
</template>

<style scoped>
@reference "tailwindcss";

.main {
  @apply min-h-screen bg-indigo-900 flex flex-col gap-5 items-center justify-center;
}

.header {
  @apply font-bold text-4xl text-white;
}

.card {
  @apply bg-white/80 w-[30rem] h-[35rem] rounded-3xl p-4;
}

.card__form {
  @apply w-full py-2 px-4 rounded-full bg-white flex items-center shadow-md;
}

.card__form__input {
  @apply outline-none w-5/6;
}

.card__form__button {
  @apply ml-auto bg-indigo-400 p-1.5 rounded-full text-white;
}

.tasks_list {
  @apply mt-4 h-[28rem] overflow-y-auto;
}

.tasks_list__separator {
  @apply h-0.5 w-full bg-indigo-900/50 mt-3;
}

.watermark {
  @apply text-sm text-indigo-900 opacity-10;
}
</style>
