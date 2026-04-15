import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAbout, updateAbout } from '../api/aboutApi';
import { toast } from 'react-hot-toast';

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAbout,
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
      toast.success('About content updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update about content');
    },
  });
};
