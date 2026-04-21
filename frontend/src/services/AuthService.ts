// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

const API_URL = import.meta.env.VITE_API_URL as string;

export class AuthService {
  static async login(email: string, password: string): Promise<boolean> {
    try {
      const { data } = await axios.post<UserInterface>(`${API_URL}/auth/login`, {
        email,
        password,
      });
      useUserStore().user = data;
      return true;
    } catch {
      return false;
    }
  }

  static async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const { data } = await axios.post<UserInterface>(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      useUserStore().user = data;
      return true;
    } catch {
      return false;
    }
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
