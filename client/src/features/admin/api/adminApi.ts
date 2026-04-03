import axiosInstance from '../../../api/axiosInstance';
import { User } from '../../auth/types';

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/admin/users/${id}`);
};
