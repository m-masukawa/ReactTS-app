import { api } from '../lib/api';
import type { Inquiry, InquiryStatus } from "../types/inquiry";

export type InquiryCreatePayloadAll = {
  titleJa: string;
  titleEn: string;
  contentJa: string;
  contentEn: string;
  requesterJa: string;
  requesterEn: string;
};

export const inquiryApi = {
  getAll: async (): Promise<Inquiry[]> => {
    const response = await api.get<Inquiry[]>('/inquiries');
    return response.data;
  },

  create: async (input: InquiryCreatePayloadAll): Promise<Inquiry> => {
    const response = await api.post<Inquiry>('/inquiries', input);
    return response.data;
  },

  updateStatus: async (id: number, status: InquiryStatus): Promise<Inquiry> => {
    const response = await api.put<Inquiry>(`/inquiries/${id}`, { status });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/inquiries/${id}`);
  },

  updateProfile: async (input: { name: string; avatarUrl: string | null }) => {
    const response = await api.put("/user/profile", input);
    return response.data;
  },
};