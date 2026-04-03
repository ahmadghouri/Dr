import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register, getProfile } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      queryClient.setQueryData(['user'], data);
      toast.success('Login successful!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      queryClient.setQueryData(['user'], data);
      toast.success('Registration successful!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.removeQueries({ queryKey: ['user'] });
    toast.success('Logged out');
    navigate('/login');
  };
};
