<template>
  <div>
    <h1 class="h2 mb-2">Welcome to CronoView</h1>
    <p class="text-body-secondary mb-4">A mini time tracking dashboard built with Nuxt.</p>

    <div class="row g-3">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">📝 Blog</h5>
            <p class="card-text text-body-secondary small">
              3 articles about time tracking, productivity and meaningful goals. Rendered as SSG.
            </p>
            <NuxtLink to="/blog" class="btn btn-sm btn-outline-primary">Read articles</NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">✅ Tasks</h5>
            <p class="card-text text-body-secondary small">
              Browse all tasks and their tracked hours, fetched from the Nuxt server layer. Rendered as SSR.
            </p>
            <NuxtLink to="/tasks" class="btn btn-sm btn-outline-primary">View tasks</NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">💡 Tips</h5>
            <p class="card-text text-body-secondary small">
              Productivity tips and frequently asked questions about time tracking. Rendered as CSR.
            </p>
            <NuxtLink to="/tips" class="btn btn-sm btn-outline-primary">Explore tips</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>