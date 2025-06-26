import axios from "axios";
import { StaffAchievement } from "../../types";
import { apiBase, apiBaseForImage } from "../const_service";

const apiClient = axios.create({
    baseURL: apiBase,
});

export const staffAchievementService = {
    getStaffAchievements: async (params?: { limit?: number; page?: number }): Promise<StaffAchievement[]> => {
        const response = await apiClient.get("/staff_achievements/public", { params });
        // Map API response to StaffAchievement[]
        return (response.data['data'] || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            staffName: item.staffName,
            designation: item.designation,
            department: item.department,
            description: item.description,
            createdAt: item.createdAt,
            // Ensure imageUrl is a full URL and does not duplicate /api
            imageUrl: item.imageUrl.startsWith("http")
                ? item.imageUrl
                : apiBaseForImage + item.imageUrl,
        }));
    },
};
