<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthService } from '@/services/AuthService';

const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

function handleLogin(): void {
  errorMessage.value = '';
  isLoading.value = true;

  const success = AuthService.login(email.value, password.value);

  isLoading.value = false;

  if (!success) {
    errorMessage.value = 'Invalid email or password.';
    return;
  }

  router.push({ name: 'tasks' });
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- logo -->
      <div class="flex items-center justify-center mb-8 gap-3">
        <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
          <i class="fas fa-clock text-black text-xl"></i>
        </div>
        <span class="text-white text-3xl font-bold">CronoView</span>
      </div>

      <!-- card -->
      <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h2 class="text-white text-2xl font-bold mb-1">Welcome back</h2>
        <p class="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

        <form @submit.prevent="handleLogin" class="space-y-5">

          <!-- email -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-2" for="email">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <!-- password -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-2" for="password">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <!-- error -->
          <div
            v-if="errorMessage"
            class="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
          >
            <i class="fas fa-circle-exclamation text-red-400 text-sm"></i>
            <p class="text-red-400 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition duration-200 text-sm"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin mr-2"></i>Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>

        </form>

        <!-- mock credentials hint -->
        <div class="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p class="text-gray-400 text-xs font-medium mb-2">
            <i class="fas fa-circle-info mr-1"></i> Mock credentials
          </p>
          <div class="space-y-1">
            <p class="text-gray-500 text-xs">
              <span class="text-gray-300">Admin:</span> admin@example.com / admin123
            </p>
            <p class="text-gray-500 text-xs">
              <span class="text-gray-300">User:</span> user@example.com / user123
            </p>
          </div>
        </div>

        <!-- link to register -->
        <p class="text-center text-gray-500 text-sm mt-6">
          Don't have an account?
          <RouterLink
            to="/register"
            class="text-green-400 hover:text-green-300 font-medium transition duration-200"
          >
            Create one
          </RouterLink>
        </p>

      </div>

      <!-- footer -->
      <p class="text-center text-gray-600 text-xs mt-6">
        CronoView · EAFIT · Ingeniería de Software para Aplicaciones Web
      </p>

    </div>
  </div>
</template>