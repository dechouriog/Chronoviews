import { useUserStore } from '@/stores/userstore';
import { AuthService } from '@/services/AuthService';

import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

import { generateId } from '@/utils/generateId';

export class UserService {
  static getUser(): UserInterface | null {
    return useUserStore().user;
  }

  static getAllUsers(): UserInterface[] {
    return AuthService.getAllUsers();
  }

  static setUser(user: CreateUserDTO): void {
    const id = generateId();
    useUserStore().user = { id, ...user };
  }

  static updateTotalTrackedTime(milliseconds: number): void {
    const user = useUserStore().user;
    if (!user) return;
    user.totalTrackedTime = milliseconds;
  }

  static updateTasksCount(count: number): void {
    const user = useUserStore().user;
    if (!user) return;
    user.tasksCount = count;
  }
}