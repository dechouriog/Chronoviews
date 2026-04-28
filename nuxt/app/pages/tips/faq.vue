<script setup lang="ts">
const faqs = [
  {
    id: 1,
    question: 'What is CronoView?',
    answer: 'CronoView is a personal time tracking dashboard that helps you understand how you invest your daily hours across different areas of life.',
  },
  {
    id: 2,
    question: 'How do I add hours to a task?',
    answer: 'Open the Tasks section, find the task you worked on, and click the + button to log the hours you spent on it.',
  },
  {
    id: 3,
    question: 'What is a Goal?',
    answer: 'A Goal is a monthly target for a specific task. For example, you can set a goal of 40 hours of Work per month and track your progress with a visual bar.',
  },
  {
    id: 4,
    question: 'What are the available categories?',
    answer: 'Work, Study, Fitness, Health, Nutrition, Meditation, Spirituality, Family, Social, Hobbies, Entertainment, Reading, Finance, Chores, and Other.',
  },
  {
    id: 5,
    question: 'Is my data private?',
    answer: 'Yes. Each account only sees its own tasks and goals. Admins can see aggregated statistics but cannot access individual user data in detail.',
  },
  {
    id: 6,
    question: 'Can I delete a task?',
    answer: 'Yes. In the Tasks view, each task has a delete button. You will see a confirmation dialog before the task is permanently removed.',
  },
]
</script>

<template>
  <div>
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/tips">← Back to Tips</NuxtLink>
    </p>
    <h1 class="h2 mt-2 mb-1">FAQ</h1>
    <p class="text-body-secondary mb-4">Frequently asked questions about CronoView.</p>
    <div class="accordion" id="faqAccordion">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="accordion-item"
      >
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#faq-${faq.id}`"
          >
            {{ faq.question }}
          </button>
        </h2>
        <div
          :id="`#faq-${faq.id}`"
          class="accordion-collapse collapse"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body text-body-secondary">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>