<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import type { TaskInterface } from '@/interfaces/TaskInterface';

const props = defineProps<{
  task: TaskInterface;
}>();

const emit = defineEmits<{
  toggle: [id: string];
}>();

const tick = ref<number>(0);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => { tick.value++; }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const liveTime = computed<number>(() => {
  void tick.value;
  if (!props.task.isRunning) return props.task.totalTime;
  return props.task.totalTime + (Date.now() - props.task.lastStarted);
});

const formattedTime = computed<string>(() => {
  const totalSeconds = Math.floor(liveTime.value / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

function handleToggle(): void {
  emit('toggle', props.task.id);
}
</script>

<template>
  <div
    class="bg-gray-900 rounded-xl p-5 border border-gray-800 flex items-center justify-between transition duration-200"
    :style="{ borderLeftColor: props.task.color, borderLeftWidth: '4px' }"
  >
    <div class="flex items-center gap-4">
      <button
        @click="handleToggle"
        class="w-12 h-12 rounded-full flex items-center justify-center transition duration-200"
        :style="props.task.isRunning
          ? { backgroundColor: props.task.color }
          : { backgroundColor: '#374151' }"
      >
        <i
          class="text-white text-sm"
          :class="props.task.isRunning ? 'fas fa-pause' : 'fas fa-play'"
        ></i>
      </button>

      <div>
        <p class="font-semibold text-white text-lg">{{ props.task.name }}</p>
        <p class="text-gray-400 text-sm">{{ props.task.category }}</p>
      </div>
    </div>

    <div class="text-right">
      <p
        class="text-2xl font-bold font-mono"
        :style="{ color: props.task.isRunning ? props.task.color : '#ffffff' }"
      >
        {{ formattedTime }}
      </p>
      <p class="text-gray-500 text-xs mt-1">
        {{ props.task.isRunning ? 'Running' : 'Total time' }}
      </p>
    </div>
  </div>
</template>