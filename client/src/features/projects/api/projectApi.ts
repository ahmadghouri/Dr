import axiosInstance from "../../../api/axiosInstance";

export interface Project {
  _id: string;
  category: string;
  title: string;
  image: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get("/v1/content/projects");
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await axiosInstance.get(`/v1/content/projects/${id}`);
  return response.data;
};

export const createProject = async (data: FormData): Promise<Project> => {
  const response = await axiosInstance.post("/v1/content/projects", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProject = async (
  id: string,
  data: FormData,
): Promise<Project> => {
  const response = await axiosInstance.put(`/v1/content/projects/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/content/projects/${id}`);
};
