import type { TimeEntryInterface } from '@/interfaces/TimeEntryInterface';
 
export type CreateTimeEntryDTO = Omit<TimeEntryInterface, 'id'>;
 