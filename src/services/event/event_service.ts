import axios from "axios";
import { EventData, PaginatedResponse } from "../../types";
import { apiBase } from "../const_service";
import { parsePaginatedResponse } from "../helper/pagination_helper";

const apiClient = axios.create({
  baseURL: apiBase,
});

export const eventService = {
  getEvents: async (params?: { limit?: number; page?: number; search?: string }): Promise<PaginatedResponse<EventData>> => {
    const response = await apiClient.get("/events/public", { params });
    return parsePaginatedResponse<EventData>(response);
  },
};
