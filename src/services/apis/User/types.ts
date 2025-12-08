import type { User } from '../schemas';

export type { User };

// Single user response wrapper
export interface UserResponse {
  data: User;
}
