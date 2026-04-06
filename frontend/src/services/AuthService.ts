import { useUserStore } from '@/stores/userstore';
import { authSeeder } from '@/stores/authseeder';

import type { UserInterface } from '@/interfaces/UserInterface';

export class AuthService {
  static login(email: string, password: string): boolean {
    const match = authSeeder.find(
      (user: UserInterface) => user.email === email && user.password === password,
    );

    if (!match) return false;

    useUserStore().user = match;
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