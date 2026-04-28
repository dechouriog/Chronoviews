<script setup lang="ts">
import { articles } from '~/data/articles'

definePageMeta({
  validate(route) {
    const param = String(route.params.id)
    return articles.some(a => a.id === param)
  },
})

const route = useRoute()
const id = computed(() => String(route.params.id))
const article = computed(() => articles.find(a => a.id === id.value))
</script>

<template>
  <article v-if="article">
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/blog">← All articles</NuxtLink>
    </p>
    <h1 class="h2 mt-2">{{ article.title }}</h1>
    <p class="text-body-secondary small mb-3">{{ article.author }} · {{ article.date }}</p>
    <p class="lead mb-3">{{ article.summary }}</p>
    <p>{{ article.content }}</p>
  </article>
</template>