// Por Diego Chourio
<script setup lang="ts">

// External imports
import { computed, ref } from 'vue';

// Internal imports
import type { CreateGoalDTO } from '@/dtos/CreateGoalDTO';
import type { GoalInterface } from '@/interfaces/GoalInterface';
import type { TaskInterface } from '@/interfaces/TaskInterface';
import { GoalService } from '@/services/GoalService';
import { TaskService } from '@/services/TaskService';
import { UserService } from '@/services/UserService';

const userId = computed<string>(() => UserService.getUser()?.id ?? '');
const goals = computed<GoalInterface[]>(() => GoalService.getGoalsByUserId(userId.value));
const tasks = computed<TaskInterface[]>(() => TaskService.getTasksByUserId(userId.value));

const tasksWithoutGoal = computed<TaskInterface[]>(() => {
  return tasks.value.filter((task: TaskInterface) => !GoalService.hasGoalForTask(task.id));
});

const showForm = ref<boolean>(false);
const selectedTaskId = ref<string>('');
const targetHours = ref<number>(0);
const goalToDelete = ref<string | null>(null);

function getTaskForGoal(taskId: string): TaskInterface | undefined {
  return tasks.value.find((task: TaskInterface) => task.id === taskId);
}

function getProgress(goal: GoalInterface): number {
  return GoalService.getProgress(goal);
}

function getCurrentHours(goal: GoalInterface): number {
  return getTaskForGoal(goal.taskId)?.totalHours ?? 0;
}

function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

function handleCreateGoal(): void {
  if (!selectedTaskId.value || targetHours.value <= 0) return;

  const newGoal: CreateGoalDTO = {
    taskId: selectedTaskId.value,
    targetHours: targetHours.value,
    period: 'monthly',
  };

  GoalService.createGoal(userId.value, newGoal);
  selectedTaskId.value = '';
  targetHours.value = 0;
  showForm.value = false;
}

function confirmDelete(id: string): void {
  goalToDelete.value = id;
}

function handleDelete(): void {
  if (!goalToDelete.value) return;
  GoalService.deleteGoal(goalToDelete.value);
  goalToDelete.value = null;
}

function cancelDelete(): void {
  goalToDelete.value = null;
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white">Goals</h2>
        <p class="text-gray-400 mt-1">Track your monthly targets per task</p>
      </div>
      <button
        v-if="tasksWithoutGoal.length > 0"
        @click="showForm = !showForm"
        class="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 rounded-lg transition duration-200"
      >
        <i class="fas fa-plus"></i>
        Add Goal
      </button>
    </div>

    <!-- create goal form -->
    <div v-if="showForm" class="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
      <h3 class="text-base font-semibold text-white mb-4">New Monthly Goal</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        <div>
          <label class="block text-gray-400 text-sm font-medium mb-2">Task</label>
          <div class="relative">
            <select
              v-model="selectedTaskId"
              required
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a task</option>
              <option
                v-for="task in tasksWithoutGoal"
                :key="task.id"
                :value="task.id"
              >
                {{ task.name }}
              </option>
            </select>
            <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
          </div>
        </div>

        <div>
          <label class="block text-gray-400 text-sm font-medium mb-2">
            Monthly Target (hours)
          </label>
          <input
            v-model.number="targetHours"
            type="number"
            min="1"
            step="0.5"
            placeholder="e.g. 40"
            class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div class="flex gap-3">
          <button
            @click="handleCreateGoal"
            :disabled="!selectedTaskId || targetHours <= 0"
            class="flex-1 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition duration-200 text-sm"
          >
            Create
          </button>
          <button
            @click="showForm = false; selectedTaskId = ''; targetHours = 0"
            class="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg transition duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- goals list -->
    <div class="space-y-4">
      <div
        v-for="goal in goals"
        :key="goal.id"
        class="bg-gray-900 rounded-xl p-6 border border-gray-800"
      >
        <div v-if="getTaskForGoal(goal.taskId) as TaskInterface">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :style="{ backgroundColor: getTaskForGoal(goal.taskId)!.color + '33' }"
              >
                <i class="fas fa-bullseye text-sm" :style="{ color: getTaskForGoal(goal.taskId)!.color }"></i>
              </div>
              <div>
                <p class="text-white font-semibold">{{ getTaskForGoal(goal.taskId)!.name }}</p>
                <p class="text-gray-400 text-sm">
                  {{ getTaskForGoal(goal.taskId)!.category }} · Monthly goal
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="text-white font-bold text-lg">
                  {{ formatHours(getCurrentHours(goal)) }}
                  <span class="text-gray-500 font-normal text-sm">
                    / {{ formatHours(goal.targetHours) }}
                  </span>
                </p>
                <p
                  class="text-sm font-semibold"
                  :style="{ color: getTaskForGoal(goal.taskId)!.color }"
                >
                  {{ getProgress(goal).toFixed(0) }}%
                </p>
              </div>
              <button
                @click="confirmDelete(goal.id)"
                class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/50 text-gray-500 hover:text-red-400 flex items-center justify-center transition duration-200"
              >
                <i class="fas fa-trash text-xs"></i>
              </button>
            </div>
          </div>

          <!-- progress bar -->
          <div class="w-full bg-gray-700 rounded-full h-3">
            <div
              class="h-3 rounded-full transition-all duration-500"
              :style="{
                width: `${getProgress(goal)}%`,
                backgroundColor: getTaskForGoal(goal.taskId)!.color,
              }"
            ></div>
          </div>
          <div class="flex justify-between mt-2">
            <span class="text-gray-500 text-xs">0h</span>
            <span class="text-gray-500 text-xs">{{ formatHours(goal.targetHours) }}</span>
          </div>
        </div>
      </div>

      <div v-if="goals.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-bullseye text-4xl mb-4 block"></i>
        <p class="text-lg">No goals yet.</p>
        <p class="text-sm mt-1">Create a task first, then set a monthly goal.</p>
      </div>
    </div>

    <!-- delete modal -->
    <div
      v-if="goalToDelete"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <i class="fas fa-trash text-red-400"></i>
          </div>
          <div>
            <p class="text-white font-semibold">Delete Goal</p>
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