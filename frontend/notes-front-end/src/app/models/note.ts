import { User } from './user';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt?: string;
  user?: User;
  userId?: number; // For creating new notes
}
