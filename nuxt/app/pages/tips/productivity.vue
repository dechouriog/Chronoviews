<script setup lang="ts">
const tips = [
  { id: 1, tip: 'Log your time every day, not just when you remember.' },
  { id: 2, tip: 'Use categories to see your actual priorities, not your imagined ones.' },
  { id: 3, tip: 'Set a monthly target for your most important task and track progress weekly.' },
  { id: 4, tip: 'Review your statistics every Sunday to plan the week ahead.' },
  { id: 5, tip: 'Batch similar tasks together to reduce context-switching overhead.' },
  { id: 6, tip: 'Protect at least 2 hours of deep work per day from meetings and interruptions.' },
  { id: 7, tip: 'Log Fitness and Family time just like you log Work — they matter too.' },
  { id: 8, tip: 'If a task is under 5 minutes, do it immediately instead of logging it.' },
  { id: 9, tip: 'Compare this month\'s totals to last month\'s to spot trends early.' },
  { id: 10, tip: 'Celebrate when you hit a goal — it reinforces the habit of tracking.' },
]
</script>

<template>
  <div>
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/tips">← Back to Tips</NuxtLink>
    </p>
    <h1 class="h2 mt-2 mb-1">Productivity Tips</h1>
    <p class="text-body-secondary mb-4">10 habits to make the most of your tracked time.</p>
    <ol class="list-group list-group-numbered">
      <li
        v-for="item in tips"
        :key="item.id"
        class="list-group-item"
      >
        {{ item.tip }}
      </li>
    </ol>
  </div>
</template>