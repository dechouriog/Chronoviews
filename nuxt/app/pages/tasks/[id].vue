<script setup lang="ts">
type Task = {
  id: string
  name: string
  category: string
  color: string
  totalHours: number
}

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data: task, error } = await useFetch<Task>(`/api/tasks/${id.value}`)
</script>

<template>
  <div>
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/tasks">← All tasks</NuxtLink>
    </p>

    <div v-if="error" class="alert alert-danger mt-3">
      Task not found.
    </div>

    <article v-else-if="task" class="mt-2">
      <div class="d-flex align-items-center gap-3 mb-3">
        <span
          class="rounded-circle d-inline-block"
          :style="{ width: '18px', height: '18px', backgroundColor: task.color }"
        ></span>
        <h1 class="h2 mb-0">{{ task.name }}</h1>
      </div>
      <p class="text-body-secondary mb-1">
        <strong>Category:</strong> {{ task.category }}
      </p>
      <p class="text-body-secondary mb-0">
        <strong>Total hours logged:</strong> {{ task.totalHours }}h
      </p>
    </article>
  </div>
</template>