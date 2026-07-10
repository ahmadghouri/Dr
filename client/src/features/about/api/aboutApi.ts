import axiosInstance from "../../../api/axiosInstance";

export interface About {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  stats?: Array<{ label: string; value: string }>;
  features?: Array<{ title: string; description: string }>;
}

export const getAbout = async (): Promise<About> => {
  const response = await axiosInstance.get("/v1/content/about");
  return response.data;
};

export const updateAbout = async (data: FormData): Promise<About> => {
  const response = await axiosInstance.put("/v1/content/about", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
