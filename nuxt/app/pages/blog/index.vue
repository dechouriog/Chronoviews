<script setup lang="ts">
import { articles } from '~/data/articles'
</script>

<template>
  <div>
    <h1 class="h2 mb-1">Blog</h1>
    <p class="text-body-secondary mb-4">Articles about time tracking and productivity.</p>
    <ul class="list-group">
      <li
        v-for="article in articles"
        :key="article.id"
        class="list-group-item position-relative"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-semibold"
          :to="`/blog/${article.id}`"
        >
          {{ article.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small mt-1">
          {{ article.author }} · {{ article.date }}
        </span>
        <span class="text-body-secondary d-block small">{{ article.summary }}</span>
      </li>
    </ul>
  </div>
</template>