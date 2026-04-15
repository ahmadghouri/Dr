import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendContactMessage, getContactMessages } from '../api/contactApi';
import { toast } from 'react-hot-toast';

export const useSendContact = () => {
  return useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success('Message sent successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send message');
    },
  });
};

export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: getContactMessages,
  });
};
