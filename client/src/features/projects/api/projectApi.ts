import axiosInstance from "../../../api/axiosInstance";

export interface Project {
  _id: string;
  category: string;
  title: string;
  image: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get("/content/projects");
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await axiosInstance.get(`/content/projects/${id}`);
  return response.data;
};

export const createProject = async (data: FormData): Promise<Project> => {
  const response = await axiosInstance.post("/content/projects", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProject = async (
  id: string,
  data: FormData,
): Promise<Project> => {
  const response = await axiosInstance.put(`/content/projects/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/content/projects/${id}`);
};
