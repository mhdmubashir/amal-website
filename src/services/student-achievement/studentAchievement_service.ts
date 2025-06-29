import axios from "axios";
import { PaginatedResponse, StudentAchievement } from "../../types";
import { apiBase, apiBaseForImage } from "../const_service";
import { parsePaginatedResponse } from "../helper/pagination_helper";

const apiClient = axios.create({
    baseURL: apiBase,
});

export const studentAchievementService = {
    getStudentAchievements: async (params?: { limit?: number; page?: number; search?: string }): Promise<PaginatedResponse<StudentAchievement>> => {
        const response = await apiClient.get("/student_achievements/public", { params });
        const parsed = parsePaginatedResponse<StudentAchievement>(response);
        parsed.items = (parsed.items || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            date: item.date,
            createdAt: item.createdAt,
            imageUrl: item.imageUrl?.startsWith("http")
                ? item.imageUrl
                : apiBaseForImage + item.imageUrl,
        }));
        return parsed;
    },
};
