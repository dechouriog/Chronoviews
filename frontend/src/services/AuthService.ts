import { useUserStore } from '@/stores/userstore';
import { useAuthStore } from '@/stores/authstore';
import { authSeeder } from '@/stores/authseeder';

import type { UserInterface } from '@/interfaces/UserInterface';

export class AuthService {
  static getAllUsers(): UserInterface[] {
    return [...authSeeder, ...useAuthStore().registeredUsers];
  }

  static login(email: string, password: string): boolean {
    const match = AuthService.getAllUsers().find(
      (user: UserInterface) => user.email === email && user.password === password,
    );

    if (!match) return false;

    useUserStore().user = match;
    return true;
  }

  static register(name: string, email: string, password: string): boolean {
    const exists = AuthService.getAllUsers().some(
      (user: UserInterface) => user.email === email,
    );

    if (exists) return false;

    const newUser: UserInterface = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      role: 'user',
      totalTrackedTime: 0,
      tasksCount: 0,
    };

    useAuthStore().registeredUsers.push(newUser);
    useUserStore().user = newUser;
    return true;
  }

  static logout(): void {
    useUserStore().user = null;
  }

  static getAuthenticatedUser(): UserInterface | null {
    return useUserStore().user;
  }

  static isAuthenticated(): boolean {
    return useUserStore().user !== null;
  }

  static isAdmin(): boolean {
    return useUserStore().user?.role === 'admin';
  }
}