/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobData {
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  skills: string[];
}

export interface UpdateJobData extends Partial<CreateJobData> {}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experienceYears: number;
  score: number;
  invited: boolean;
}