// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

const API_URL = 'http://136.115.251.199:3000/api';

export class UserService {
  static getUser(): UserInterface | null {
    return useUserStore().user;
  }

  static async getAllUsers(): Promise<UserInterface[]> {
    const { data } = await axios.get<UserInterface[]>(API_URL);
    return data;
  }

  static async getUserById(id: string): Promise<UserInterface | null> {
    const { data } = await axios.get<UserInterface>(`${API_URL}/${id}`);
    return data;
  }
}