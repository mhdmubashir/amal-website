import axios from "axios";
import { EventData } from "../../types";
import { apiBase } from "../const_service";

const apiClient = axios.create({
  baseURL: apiBase,
});

export const eventService = {
  getEvents: async (params?: { limit?: number; page?: number }): Promise<EventData[]> => {
    const response = await apiClient.get("/events/public", { params });
    return response.data['data'];
  },
};
