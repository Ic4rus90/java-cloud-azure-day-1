import { Note } from './note'

export interface User {
    id?: number;
    username: string;
    email: string;
    notes?: Note[];
  }
  