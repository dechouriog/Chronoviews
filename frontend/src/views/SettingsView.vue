// Por Diego Chourio
<script setup lang="ts">

// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';
import { SettingsService } from '@/services/SettingsService';

import type { UserInterface } from '@/interfaces/UserInterface';
import type { Language, TimeFormat } from '@/services/SettingsService';

const router = useRouter();

const user = ref<UserInterface | null>(AuthService.getAuthenticatedUser());
const selectedLanguage = ref<Language>(SettingsService.getLanguage());
const selectedTimeFormat = ref<TimeFormat>(SettingsService.getTimeFormat());

const showClearConfirm = ref<boolean>(false);
const savedMessage = ref<boolean>(false);

function handleSavePreferences(): void {
  SettingsService.setLanguage(selectedLanguage.value);
  SettingsService.setTimeFormat(selectedTimeFormat.value);
  savedMessage.value = true;
  setTimeout(() => { savedMessage.value = false; }, 2500);
}

function handleClearHistory(): void {
  SettingsService.clearHistory();
  showClearConfirm.value = false;
  router.go(0);
}

function handleLogout(): void {
  AuthService.logout();
  router.push({ name: 'login' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Settings</h2>
      <p class="text-gray-400 mt-1">Manage your account and preferences</p>
    </div>

    <div class="max-w-2xl space-y-6">

      <!-- profile -->
      <div class="bg-gray-900 rounded-xl border border-gray-800">
        <div class="px-6 py-4 border-b border-gray-800">
          <h3 class="text-base font-semibold text-white">Profile</h3>
          <p class="text-gray-500 text-sm mt-0.5">Your account information</p>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold flex-shrink-0">
              {{ user ? getInitials(user.name) : 'U' }}
            </div>
            <div>
              <p class="text-white font-semibold text-lg">{{ user?.name ?? '—' }}</p>
              <p class="text-gray-400 text-sm">{{ user?.email ?? '—' }}</p>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                :class="user?.role === 'admin'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'"
              >
                {{ user?.role ?? '—' }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p class="text-gray-500 text-xs mb-1">Total Tracked Time</p>
              <p class="text-white font-semibold">
                {{ user ? `${(user.totalTrackedTime / 3600000).toFixed(1)}h` : '0h' }}
              </p>
            </div>
            <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p class="text-gray-500 text-xs mb-1">Tasks Created</p>
              <p class="text-white font-semibold">{{ user?.tasksCount ?? 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- preferences -->
      <div class="bg-gray-900 rounded-xl border border-gray-800">
        <div class="px-6 py-4 border-b border-gray-800">
          <h3 class="text-base font-semibold text-white">Preferences</h3>
          <p class="text-gray-500 text-sm mt-0.5">Customize your experience</p>
        </div>
        <div class="p-6 space-y-6">

          <!-- language -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-3">Language</label>
            <div class="flex gap-3">
              <button
                @click="selectedLanguage = 'en'"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
                :class="selectedLanguage === 'en'
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'"
              >
                🇺🇸 English
              </button>
              <button
                @click="selectedLanguage = 'es'"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
                :class="selectedLanguage === 'es'
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'"
              >
                🇨🇴 Español
              </button>
            </div>
          </div>

          <!-- time format -->
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-3">Time Format</label>
            <div class="flex gap-3">
              <button
                @click="selectedTimeFormat = '24h'"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
                :class="selectedTimeFormat === '24h'
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'"
              >
                24h — 14:30
              </button>
              <button
                @click="selectedTimeFormat = '12h'"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
                :class="selectedTimeFormat === '12h'
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'"
              >
                12h — 2:30 PM
              </button>
            </div>
          </div>

          <!-- save button -->
          <div class="flex items-center gap-3 pt-2">
            <button
              @click="handleSavePreferences"
              class="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-lg transition duration-200 text-sm"
            >
              Save Preferences
            </button>
            <span
              v-if="savedMessage"
              class="text-green-400 text-sm flex items-center gap-1.5"
            >
              <i class="fas fa-circle-check"></i>
              Saved successfully
            </span>
          </div>
        </div>
      </div>

      <!-- danger zone -->
      <div class="bg-gray-900 rounded-xl border border-red-900/50">
        <div class="px-6 py-4 border-b border-red-900/50">
          <h3 class="text-base font-semibold text-red-400">Danger Zone</h3>
          <p class="text-gray-500 text-sm mt-0.5">Irreversible actions</p>
        </div>
        <div class="p-6 space-y-4">

          <!-- clear history -->
          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <p class="text-white text-sm font-medium">Clear all history</p>
              <p class="text-gray-500 text-xs mt-0.5">
                Deletes all tracked time and reloads the app with seed data
              </p>
            </div>
            <button
              @click="showClearConfirm = true"
              class="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-medium px-4 py-2 rounded-lg transition duration-200 text-sm flex-shrink-0 ml-4"
            >
              Clear History
            </button>
          </div>

          <!-- confirm clear -->
          <div
            v-if="showClearConfirm"
            class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p class="text-red-400 text-sm font-medium mb-3">
              <i class="fas fa-triangle-exclamation mr-2"></i>
              Are you sure? This action cannot be undone.
            </p>
            <div class="flex gap-3">
              <button
                @click="handleClearHistory"
                class="bg-red-500 hover:bg-red-400 text-white font-medium px-4 py-2 rounded-lg transition duration-200 text-sm"
              >
                Yes, clear everything
              </button>
              <button
                @click="showClearConfirm = false"
                class="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium px-4 py-2 rounded-lg transition duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- logout -->
          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <p class="text-white text-sm font-medium">Sign out</p>
              <p class="text-gray-500 text-xs mt-0.5">Log out of your account</p>
            </div>
            <button
              @click="handleLogout"
              class="bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 font-medium px-4 py-2 rounded-lg transition duration-200 text-sm flex-shrink-0 ml-4"
            >
              <i class="fas fa-right-from-bracket mr-2"></i>
              Sign out
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>