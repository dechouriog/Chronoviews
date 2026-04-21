// Por Diego Chourio

// Internal
import type { UserInterface } from '@/interfaces/UserInterface';

export const authSeeder: UserInterface[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    totalTrackedTime: 0,
    tasksCount: 0,
  },
  {
    id: '2',
    name: 'Standard User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    totalTrackedTime: 0,
    tasksCount: 0,
  },
];