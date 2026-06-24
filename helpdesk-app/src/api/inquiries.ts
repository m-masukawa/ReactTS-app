import { api } from '../lib/api'
import type { Inquiry, InquiryCreateInput, InquiryStatus } from '../types/inquiry'

export const inquiryApi = {
  getAll: async (status?: string): Promise<Inquiry[]> => {
    const params = status && status !== 'all' ? { status } : {}
    const response = await api.get<Inquiry[]>('/api/inquiries', { params })
    return response.data
  },
  create: async (input: InquiryCreateInput): Promise<Inquiry> => {
    const response = await api.post<Inquiry>('/api/inquiries', input)
    return response.data
  },
  updateStatus: async (id: number, status: InquiryStatus): Promise<Inquiry> => {
    const response = await api.put<Inquiry>(`/api/inquiries/${id}`, { status })
    return response.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/inquiries/${id}`)
  },
}