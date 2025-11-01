import type { Task } from '@/shared/types/Tasks'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])

    function addTask(title: string) {
      const newTask: Task = {
        id: tasks.value.length + 1,
        title,
        completed: false,
      }
      tasks.value.push(newTask)
    }

    function toggleTaskCompletion(id: number) {
      const task = tasks.value.find((t) => t.id === id)
      if (task) {
        task.completed = !task.completed
      }
    }

    function removeTask(id: number) {
      tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    function editTask(id: number, newTitle: string) {
      const task = tasks.value.find((t) => t.id === id)
      if (task) {
        task.title = newTitle
      }
    }

    return { tasks, addTask, toggleTaskCompletion, removeTask, editTask }
  },
  { persist: true },
)
