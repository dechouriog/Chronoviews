import type { TimeEntryInterface } from '@/interfaces/TimeEntryInterface';

export const timeEntrySeeder: TimeEntryInterface[] = [
  {
    id: '1',
    taskId: '1',
    startTime: Date.now() - 7200000,
    endTime: Date.now() - 3600000,
    duration: 3600000,
  },
  {
    id: '2',
    taskId: '1',
    startTime: Date.now() - 3600000,
    endTime: Date.now() - 0,
    duration: 3600000,
  },
  {
    id: '3',
    taskId: '2',
    startTime: Date.now() - 10800000,
    endTime: Date.now() - 7200000,
    duration: 3600000,
  },
  {
    id: '4',
    taskId: '3',
    startTime: Date.now() - 5400000,
    endTime: Date.now() - 3600000,
    duration: 1800000,
  },
  {
    id: '5',
    taskId: '4',
    startTime: Date.now() - 9000000,
    endTime: Date.now() - 6300000,
    duration: 2700000,
  },
];