// Por Diego Chourio

<script setup lang="ts">
// External imports
import { onMounted, ref, computed } from 'vue';

// Internal imports
import StatCard from '@/components/StatCard.vue';
import TaskCard from '@/components/TaskCard.vue';
import type { TaskInterface } from '@/interfaces/TaskInterface';
import { TaskService } from '@/services/TaskService';
import { UserService } from '@/services/UserService';

const userId = UserService.getUser()?.id ?? '';
const tasks = ref<TaskInterface[]>([]);
const taskToDelete = ref<string | null>(null);

onMounted(async () => {
  tasks.value = await TaskService.getTasksByUserId(userId);
});

const totalHours = computed<number>(() => {
  return tasks.value.reduce((total: number, task: TaskInterface) => total + task.totalHours, 0);
});

const topTask = computed<TaskInterface | undefined>(() => {
  return tasks.value.reduce(
    (best: TaskInterface | undefined, task: TaskInterface) =>
      !best || task.totalHours > best.totalHours ? task : best,
    undefined,
  );
});

const tasksWithHours = computed<number>(() => {
  return tasks.value.filter((task: TaskInterface) => task.totalHours > 0).length;
});

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

async function handleAddHours(id: string, hours: number): Promise<void> {
  await TaskService.addHours(id, hours);
  tasks.value = await TaskService.getTasksByUserId(userId);
}

function confirmDelete(id: string): void {
  taskToDelete.value = id;
}

async function handleDelete(): Promise<void> {
  if (!taskToDelete.value) return;
  await TaskService.deleteTask(taskToDelete.value);
  taskToDelete.value = null;
  tasks.value = await TaskService.getTasksByUserId(userId);
}

function cancelDelete(): void {
  taskToDelete.value = null;
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white">Time Tracker</h2>
        <p class="text-gray-400 mt-1">Log your time and boost productivity</p>
      </div>
      <RouterLink
        to="/tasks/create"
        class="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 rounded-lg transition duration-200"
      >
        <i class="fas fa-plus"></i>
        Add Task
      </RouterLink>
    </div>

    <!-- stat cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        title="Total Hours Logged"
        :value="formatHours(totalHours)"
        subtitle="Across all tasks"
        icon="clock"
        icon-color="text-green-400"
      />
      <StatCard
        title="Most Time Spent"
        :value="topTask ? topTask.name : '—'"
        :subtitle="topTask ? formatHours(topTask.totalHours) : 'No data'"
        icon="arrow-trend-up"
        icon-color="text-cyan-400"
      />
      <StatCard
        title="Tasks with Hours"
        :value="`${tasksWithHours} / ${tasks.length}`"
        subtitle="Tasks with time logged"
        icon="bolt"
        icon-color="text-orange-400"
      />
    </div>

    <!-- task list -->
    <h3 class="text-xl font-semibold text-white mb-4">Your Tasks</h3>

    <div class="space-y-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3"
      >
        <div class="flex-1">
          <TaskCard
            :task="task"
            @add-hours="handleAddHours"
          />
        </div>
        <button
          @click="confirmDelete(task.id)"
          class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/50 text-gray-500 hover:text-red-400 flex items-center justify-center transition duration-200 flex-shrink-0"
          title="Delete task"
        >
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>

      <div v-if="tasks.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-clock text-4xl mb-4 block"></i>
        <p class="text-lg">No tasks yet. Create your first task!</p>
      </div>
    </div>

    <!-- delete confirmation modal -->
    <div
      v-if="taskToDelete"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <i class="fas fa-trash text-red-400"></i>
          </div>
          <div>
            <p class="text-white font-semibold">Delete Task</p>
            <p class="text-gray-400 text-sm">This action cannot be undone</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button
            @click="cancelDelete"
            class="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition duration-200 text-sm"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            class="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  </section>
</template>