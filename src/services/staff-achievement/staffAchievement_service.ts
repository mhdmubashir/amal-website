import axios from "axios";
import { PaginatedResponse, StaffAchievement } from "../../types";
import { apiBase, apiBaseForImage } from "../const_service";
import { parsePaginatedResponse } from "../helper/pagination_helper";

const apiClient = axios.create({
    baseURL: apiBase,
});

export const staffAchievementService = {
    getStaffAchievements: async (params?: { limit?: number; page?: number; search?: string }): Promise<PaginatedResponse<StaffAchievement>> => {
        const response = await apiClient.get("/staff_achievements/public", { params });
        const parsed = parsePaginatedResponse<StaffAchievement>(response);
        parsed.items = (parsed.items || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            staffName: item.staffName,
            designation: item.designation,
            department: item.department,
            description: item.description,
            createdAt: item.createdAt,
            imageUrl: item.imageUrl?.startsWith("http")
                ? item.imageUrl
                : apiBaseForImage + item.imageUrl,
        }));
        return parsed;
    },
};
