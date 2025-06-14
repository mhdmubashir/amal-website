import axios from "axios";
import { apiBase } from "../const_service";
import { EventData } from "../../types";

const apiClient = axios.create({
  baseURL: apiBase,
});

export const eventService = {
  getEvents: async (params?: { limit?: number; page?: number }): Promise<EventData[]> => {
    const response = await apiClient.get("/events", { params });
    return response.data['data'];
  },
};
