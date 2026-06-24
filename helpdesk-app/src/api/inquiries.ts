import axios from "axios";
import type { Inquiry, InquiryStatus } from "../types/inquiry";

export type InquiryCreatePayloadAll = {
  titleJa: string;
  titleEn: string;
  contentJa: string;
  contentEn: string;
  requesterJa: string;
  requesterEn: string;
};

const API_BASE_URL = "http://localhost:8000/api";

export const inquiryApi = {
  getAll: async (): Promise<Inquiry[]> => {
    const response = await axios.get<Inquiry[]>(`${API_BASE_URL}/inquiries`);
    return response.data;
  },

  create: async (input: InquiryCreatePayloadAll): Promise<Inquiry> => {
    const response = await axios.post<Inquiry>(`${API_BASE_URL}/inquiries`, input);
    return response.data;
  },

  updateStatus: async (id: number, status: InquiryStatus): Promise<Inquiry> => {
    const response = await axios.put<Inquiry>(`${API_BASE_URL}/inquiries/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/inquiries/${id}`);
  },
};