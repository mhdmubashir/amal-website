import axios from "axios";
import { apiBase, API_DEPARTMENTS, apiBaseForImage } from "../const_service";
import { DepartmentData, PaginatedResponse } from "../../types";
import { parsePaginatedResponse } from "../helper/pagination_helper";

const apiClient = axios.create({
  baseURL: apiBase,
});

export const departmentService = {
  getDepartments: async (params?: { limit?: number; page?: number; search?: string }): Promise<PaginatedResponse<DepartmentData>> => {
    const response = await apiClient.get(API_DEPARTMENTS, { params });
    const parsed = parsePaginatedResponse<DepartmentData>(response);
    parsed.items = (parsed.items || []).map((item: any) => ({
      ...item,
      imageUrl: item.imageUrl?.startsWith("http")
        ? item.imageUrl
        : apiBaseForImage + item.imageUrl,
    }));
    return parsed;
  },
  getDepartment: async (id: string): Promise<DepartmentData> => {
    const response = await apiClient.get(`${API_DEPARTMENTS}/${id}`);
    const data = response?.data?.data || {};
    return {
      ...data,
      imageUrl: data.imageUrl?.startsWith("http")
        ? data.imageUrl
        : apiBaseForImage + data.imageUrl,
    };
  },
};
