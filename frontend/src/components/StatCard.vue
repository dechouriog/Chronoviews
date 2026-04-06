<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  iconColor: string;
}>();
</script>

<template>
  <div class="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <div class="flex items-center justify-between mb-3">
      <span class="text-gray-400 text-sm">{{ props.title }}</span>
      <i :class="`fas fa-${props.icon} ${props.iconColor}`"></i>
    </div>
    <p class="text-3xl font-bold text-white">{{ props.value }}</p>
    <p class="text-gray-500 text-xs mt-1">{{ props.subtitle }}</p>
  </div>
</template>