// Por Diego Chourio

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export type CreateUserDTO = Omit<UserInterface, 'id'>;