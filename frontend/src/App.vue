<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

import { AuthService } from '@/services/AuthService';

const route = useRoute();
const router = useRouter();

const isAuthLayout = computed<boolean>(() => route.meta.layout === 'auth');

const authenticatedUser = computed(() => AuthService.getAuthenticatedUser());

function handleLogout(): void {
  AuthService.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <!-- auth layout: solo RouterView, sin sidebar -->
  <div v-if="isAuthLayout">
    <RouterView />
  </div>

  <!-- default layout: sidebar + header + content -->
  <div v-else class="bg-gray-950 min-h-screen">
    <div class="flex h-screen overflow-hidden">

      <!-- sidebar -->
      <aside class="w-64 bg-gray-900 text-white shadow-lg fixed h-full flex flex-col border-r border-gray-800">
        <div class="p-6 flex-1">
          <div class="flex items-center mb-8">
            <i class="fas fa-clock text-2xl mr-3 text-green-400"></i>
            <span class="font-bold text-xl text-white">CronoView</span>
          </div>

          <nav class="space-y-1">
            <RouterLink
              to="/tasks"
              class="flex items-center px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
              active-class="bg-gray-800 text-green-400"
            >
              <i class="fas fa-clock mr-3"></i>
              <span>Tracker</span>
            </RouterLink>

            <RouterLink
              to="/statistics"
              class="flex items-center px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
              active-class="bg-gray-800 text-green-400"
            >
              <i class="fas fa-chart-bar mr-3"></i>
              <span>Statistics</span>
            </RouterLink>

            <RouterLink
              to="/settings"
              class="flex items-center px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
              active-class="bg-gray-800 text-green-400"
            >
              <i class="fas fa-cog mr-3"></i>
              <span>Settings</span>
            </RouterLink>

            <RouterLink
              v-if="authenticatedUser?.role === 'admin'"
              to="/admin"
              class="flex items-center px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
              active-class="bg-gray-800 text-green-400"
            >
              <i class="fas fa-shield-alt mr-3"></i>
              <span>Admin</span>
            </RouterLink>
          </nav>
        </div>

        <!-- user + logout -->
        <div class="w-full p-6 border-t border-gray-800 mt-auto">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <span class="text-black text-sm font-bold">
                  {{ authenticatedUser?.name?.charAt(0).toUpperCase() ?? 'U' }}
                </span>
              </div>
              <div>
                <p class="text-sm font-semibold text-white">{{ authenticatedUser?.name ?? 'User' }}</p>
                <p class="text-xs text-gray-500">{{ authenticatedUser?.role ?? '' }}</p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-red-400 transition duration-200 p-1"
              title="Logout"
            >
              <i class="fas fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- main content area -->
      <div class="flex-1 flex flex-col overflow-hidden ml-64">

        <!-- top header -->
        <header class="bg-gray-900 border-b border-gray-800">
          <div class="px-6 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold text-white">
              {{ route.meta.title }}
            </h1>
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                <span class="text-black text-sm font-bold">
                  {{ authenticatedUser?.name?.charAt(0).toUpperCase() ?? 'U' }}
                </span>
              </div>
              <span class="text-white text-sm font-medium">{{ authenticatedUser?.name ?? '' }}</span>
            </div>
          </div>
        </header>

        <!-- main content -->
        <main class="flex-1 overflow-y-auto">
          <RouterView />
        </main>
      </div>

    </div>
  </div>
</template>