import axios from "axios";
import { StudentAchievement } from "../../types";
import { apiBase, apiBaseForImage } from "../const_service";

const apiClient = axios.create({
    baseURL: apiBase,
});

export const studentAchievementService = {
    getStudentAchievements: async (params?: { limit?: number; page?: number }): Promise<StudentAchievement[]> => {
        const response = await apiClient.get("/student_achievements/public", { params });
        // Map API response to StudentAchievement[]
        return (response.data['data'] || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            date: item.date,
            createdAt: item.createdAt,
            // Ensure imageUrl is a full URL and does not duplicate /api
            imageUrl: item.imageUrl.startsWith("http")
                ? item.imageUrl
                : apiBaseForImage + item.imageUrl,
        }));
    },
};
