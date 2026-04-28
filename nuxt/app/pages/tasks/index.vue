<script setup lang="ts">
type Task = {
  id: string
  name: string
  category: string
  color: string
  totalHours: number
}

const { data: tasks } = await useFetch<Task[]>('/api/tasks')
</script>

<template>
  <div>
    <h1 class="h2 mb-1">Tasks</h1>
    <p class="text-body-secondary mb-4">All tracked tasks and their logged hours.</p>
    <ul class="list-group">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="list-group-item position-relative d-flex align-items-center gap-3"
      >
        <span
          class="rounded-circle d-inline-block flex-shrink-0"
          :style="{ width: '12px', height: '12px', backgroundColor: task.color }"
        ></span>
        <div class="flex-grow-1">
          <NuxtLink
            class="stretched-link text-decoration-none fw-semibold"
            :to="`/tasks/${task.id}`"
          >
            {{ task.name }}
          </NuxtLink>
          <span class="text-body-secondary d-block small">{{ task.category }}</span>
        </div>
        <span class="badge bg-secondary">{{ task.totalHours }}h</span>
      </li>
    </ul>
  </div>
</template>