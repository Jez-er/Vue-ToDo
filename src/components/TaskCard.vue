<script setup lang="ts">
import type { Task } from '@/shared/types/Tasks'
import { useTasksStore } from '@/stores/TasksStore'
import { Check, CircleSlash, Pencil, X } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  task: Task
}>()

const taskStore = useTasksStore()
const isEditing = ref(false)
const newTitle = ref('')

const setEditingMode = () => {
  isEditing.value = true
}

const saveNewTitle = () => {
  if (newTitle.value.trim() !== '') {
    taskStore.editTask(props.task.id, newTitle.value.trim())
  }
  isEditing.value = false
}
</script>

<template>
  <div class="w-full bg-white h-12 rounded-2xl flex items-center gap-2 px-3 shadow-md mt-2">
    <div class="bg-indigo-100 px-1.5 py-0.5 flex items-center rounded-full">
      <span class="font-semibold">#{{ props.task.id }}</span>
    </div>
    <span :class="{ 'line-through text-gray-500': props.task.completed }">
      <div v-if="isEditing">
        <input
          type="text"
          v-model="newTitle"
          @keyup.enter.prevent="saveNewTitle"
          class="outline-none w-full"
          placeholder="Here you can edit the task title..."
        />
      </div>
      <span v-else>
        {{ props.task.title }}
      </span>
    </span>
    <div class="ml-auto h-full flex items-center" v-if="isEditing">
      <button class="bg-green-400 p-1 rounded-full text-white mr-2" @click="saveNewTitle">
        <div class="ml-auto">
          <Check :size="15" />
        </div>
      </button>
    </div>
    <div class="ml-auto h-full flex items-center" v-else>
      <button
        class="bg-green-400 p-1 rounded-full text-white mr-2"
        :class="{ 'bg-indigo-400': props.task.completed }"
        @click="() => taskStore.toggleTaskCompletion(props.task.id)"
      >
        <div class="opacity-0 hover:opacity-100 transition-opacity">
          <span v-if="props.task.completed">
            <CircleSlash :size="15" />
          </span>
          <span v-else>
            <Check :size="15" />
          </span>
        </div>
      </button>
      <button class="bg-yellow-400 p-1 rounded-full text-white mr-2" @click="setEditingMode">
        <div class="opacity-0 hover:opacity-100 transition-opacity">
          <Pencil :size="15" />
        </div>
      </button>
      <button
        class="bg-red-400 p-1 rounded-full text-white mr-4"
        @click="() => taskStore.removeTask(props.task.id)"
      >
        <div class="opacity-0 hover:opacity-100 transition-opacity">
          <X :size="15" />
        </div>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
