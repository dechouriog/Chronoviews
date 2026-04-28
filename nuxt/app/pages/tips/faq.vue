<template>
  <div>
    <h1 class="h2 mb-1">Tips</h1>
    <p class="text-body-secondary mb-4">Explore our guides and frequently asked questions.</p>
    <div class="list-group">
      <NuxtLink
        to="/tips/productivity"
        class="list-group-item list-group-item-action"
      >
        <div class="d-flex align-items-center gap-2">
          <span>🚀</span>
          <div>
            <p class="mb-0 fw-semibold">Productivity Tips</p>
            <span class="text-body-secondary small">10 habits to make the most of your tracked time.</span>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink
        to="/tips/faq"
        class="list-group-item list-group-item-action"
      >
        <div class="d-flex align-items-center gap-2">
          <span>❓</span>
          <div>
            <p class="mb-0 fw-semibold">FAQ</p>
            <span class="text-body-secondary small">Frequently asked questions about CronoView.</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>