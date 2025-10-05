import api from './api';
import { LoginResponse, User } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
  async getMe(): Promise<User> {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
  },
  saveToken(token: string) {
    localStorage.setItem('token', token);
  },
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getToken(): string | null {
    return localStorage.getItem('token');
  },
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};