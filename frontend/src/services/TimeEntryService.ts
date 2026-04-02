import { useTimeEntryStore } from '@/stores/timeentrystore';
import type { TimeEntryInterface } from '@/interfaces/TimeEntryInterface';
import type { CreateTimeEntryDTO } from '@/dtos/CreateTimeEntryDTO';

export class TimeEntryService {
  static getTimeEntries(): TimeEntryInterface[] {
    return useTimeEntryStore().timeEntries;
  }

  static getTimeEntriesByTaskId(taskId: string): TimeEntryInterface[] {
    return useTimeEntryStore().timeEntries.filter(
      (entry: TimeEntryInterface) => entry.taskId === taskId,
    );
  }

  static createTimeEntry(entry: CreateTimeEntryDTO): void {
    const id = crypto.randomUUID();
    useTimeEntryStore().timeEntries.push({ id, ...entry });
  }

  static deleteTimeEntry(id: string): void {
    const store = useTimeEntryStore();
    store.timeEntries = store.timeEntries.filter(
      (entry: TimeEntryInterface) => entry.id !== id,
    );
  }

  static getTotalDurationByTaskId(taskId: string): number {
    return TimeEntryService.getTimeEntriesByTaskId(taskId).reduce(
      (total: number, entry: TimeEntryInterface) => total + entry.duration,
      0,
    );
  }
}