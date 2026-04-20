// Por Diego Chourio
<script setup lang="ts">

// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';

const router = useRouter();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

async function handleRegister(): Promise<void> {
  errorMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.';
    return;
  }

  isLoading.value = true;

  const success = await AuthService.register(name.value, email.value, password.value);

  isLoading.value = false;

  if (!success) {
    errorMessage.value = 'An account with this email already exists.';
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
        <h2 class="text-white text-2xl font-bold mb-1">Create an account</h2>
        <p class="text-gray-400 text-sm mb-8">Start tracking your time today</p>

        <form @submit.prevent="handleRegister" class="space-y-5">

          <!-- name -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-2" for="name">
              Full Name
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

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
              placeholder="Min. 6 characters"
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <!-- confirm password -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-2" for="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Repeat your password"
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
              <i class="fas fa-spinner fa-spin mr-2"></i>Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>

        </form>

        <!-- link to login -->
        <p class="text-center text-gray-500 text-sm mt-6">
          Already have an account?
          <RouterLink
            to="/login"
            class="text-green-400 hover:text-green-300 font-medium transition duration-200"
          >
            Sign in
          </RouterLink>
        </p>

      </div>

      <!-- footer -->
      <p class="text-center text-gray-600 text-xs mt-6">
        ChronoView · EAFIT · Ingeniería de Software para Aplicaciones Web
      </p>

    </div>
  </div>
</template>