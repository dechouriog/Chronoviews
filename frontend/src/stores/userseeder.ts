import type { UserInterface } from '@/interfaces/UserInterface';

export const userSeeder: UserInterface = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
  totalTrackedTime: 0,
  tasksCount: 0,
};