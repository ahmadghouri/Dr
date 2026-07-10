import axiosInstance from "../../../api/axiosInstance";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const sendContactMessage = async (
  data: any,
): Promise<ContactMessage> => {
  const response = await axiosInstance.post("/v1/content/contact", data);
  return response.data;
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const response = await axiosInstance.get("/v1/content/contact");
  return response.data;
};
