// Por Diego Chourio

<script setup lang="ts">


// External imports
import { ref } from 'vue';

// Internal imports
import type { TaskInterface } from '@/interfaces/TaskInterface';

const props = defineProps<{
  task: TaskInterface;
}>();

const emit = defineEmits<{
  addHours: [id: string, hours: number];
}>();

const showInput = ref<boolean>(false);
const hoursInput = ref<number>(0);

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function handleAddHours(): void {
  if (hoursInput.value <= 0) return;
  emit('addHours', props.task.id, hoursInput.value);
  hoursInput.value = 0;
  showInput.value = false;
}
</script>

<template>
  <div
    class="bg-gray-900 rounded-xl p-5 border border-gray-800 transition duration-200"
    :style="{ borderLeftColor: props.task.color, borderLeftWidth: '4px' }"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          :style="{ backgroundColor: props.task.color + '33' }"
        >
          <i class="fas fa-clock text-sm" :style="{ color: props.task.color }"></i>
        </div>
        <div>
          <p class="font-semibold text-white text-lg">{{ props.task.name }}</p>
          <p class="text-gray-400 text-sm">{{ props.task.category }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-2xl font-bold" :style="{ color: props.task.color }">
            {{ formatHours(props.task.totalHours) }}
          </p>
          <p class="text-gray-500 text-xs mt-1">Total logged</p>
        </div>
        <button
          @click="showInput = !showInput"
          class="w-9 h-9 rounded-lg flex items-center justify-center transition duration-200"
          :class="showInput
            ? 'bg-green-500 text-black'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'"
          title="Add hours"
        >
          <i class="fas fa-plus text-xs"></i>
        </button>
      </div>
    </div>

    <!-- add hours input -->
    <div v-if="showInput" class="mt-4 flex items-center gap-3">
      <input
        v-model.number="hoursInput"
        type="number"
        min="0.1"
        step="0.5"
        placeholder="Hours to add"
        class="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <button
        @click="handleAddHours"
        :disabled="hoursInput <= 0"
        class="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-semibold px-4 py-2 rounded-lg text-sm transition duration-200"
      >
        Add
      </button>
      <button
        @click="showInput = false; hoursInput = 0"
        class="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm transition duration-200"
      >
        Cancel
      </button>
    </div>
  </div>
</template>