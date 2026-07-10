import axiosInstance from "../../../api/axiosInstance";

export interface Blog {
  _id: string;
  title: string;
  content?: string;
  summary?: string;
  fullContent?: string;
  image: string;
  author?: string;
  isFeatured?: boolean;
  createdAt: string;
  category?: string;
  tags?: string[];
  quote?: string;
  quoteAuthor?: string;
  quoteAuthorRole?: string;
  points?: string[];
  holisticTitle?: string;
  holisticContent?: string;
}

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await axiosInstance.get('/v1/content/blogs');
  return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await axiosInstance.get(`/v1/content/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data: FormData): Promise<Blog> => {
  const response = await axiosInstance.post("/v1/content/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async (id: string, data: FormData): Promise<Blog> => {
  const response = await axiosInstance.put(`/v1/content/blogs/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/content/blogs/${id}`);
};
