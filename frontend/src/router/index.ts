import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import TasksView from '@/views/TasksView.vue';
import TasksCreateView from '@/views/TasksCreateView.vue';
import GoalsView from '@/views/GoalsView.vue';
import StatisticsView from '@/views/StatisticsView.vue';
import SettingsView from '@/views/SettingsView.vue';
import AdminView from '@/views/AdminView.vue';
import AdminUsersView from '@/views/AdminUsersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login', layout: 'auth' } },
    { path: '/register', name: 'register', component: RegisterView, meta: { title: 'Register', layout: 'auth' } },
    { path: '/tasks', name: 'tasks', component: TasksView, meta: { title: 'Tasks' } },
    { path: '/tasks/create', name: 'tasks.create', component: TasksCreateView, meta: { title: 'Create Task' } },
    { path: '/goals', name: 'goals', component: GoalsView, meta: { title: 'Goals' } },
    { path: '/statistics', name: 'statistics', component: StatisticsView, meta: { title: 'Statistics' } },
    { path: '/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
    { path: '/admin', name: 'admin', component: AdminView, meta: { title: 'Admin' } },
    { path: '/admin/users', name: 'admin.users', component: AdminUsersView, meta: { title: 'Admin — Users' } },
  ],
});

export default router;