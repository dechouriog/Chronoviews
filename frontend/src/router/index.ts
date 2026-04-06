import { createRouter, createWebHistory } from 'vue-router';
 
import LoginView from '@/views/LoginView.vue';
import TasksView from '@/views/TasksView.vue';
import StatisticsView from '@/views/StatisticsView.vue';
import SettingsView from '@/views/SettingsView.vue';
import AdminView from '@/views/AdminView.vue';
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login', layout: 'auth' } },
    { path: '/tasks', name: 'tasks', component: TasksView, meta: { title: 'Time Tracker' } },
    { path: '/statistics', name: 'statistics', component: StatisticsView, meta: { title: 'Statistics' } },
    { path: '/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
    { path: '/admin', name: 'admin', component: AdminView, meta: { title: 'Admin' } },
  ],
});
 
export default router;