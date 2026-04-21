// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

const API_URL = import.meta.env.VITE_API_URL as string;

export class UserService {
  static getUser(): UserInterface | null {
    return useUserStore().user;
  }

  static async getAllUsers(): Promise<UserInterface[]> {
    const { data } = await axios.get<UserInterface[]>(`${API_URL}/users`);
    return data;
  }

  static async getUserById(id: string): Promise<UserInterface | null> {
    const { data } = await axios.get<UserInterface>(`${API_URL}/users/${id}`);
    return data;
  }
}
