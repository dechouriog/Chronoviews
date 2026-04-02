import { useUserStore } from '@/stores/userstore';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

export class UserService {
  static getUser(): UserInterface | undefined {
    return useUserStore().user ?? undefined;
  }

  static setUser(user: CreateUserDTO): void {
    const id = crypto.randomUUID();
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