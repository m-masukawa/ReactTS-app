// 共通ルールの定義

export type Language = "ja" | "en";

export type InquiryStatus = "pending" | "in_progress" | "completed";

export const inquiryStatusLabel: Record<Language, Record<InquiryStatus, string>> = {
  ja: { pending: "未対応", in_progress: "対応中", completed: "完了" },
  en: { pending: "Pending", in_progress: "In Progress", completed: "Completed" }
};

export type Inquiry = {
  id: number;
  titleJa: string;
  titleEn: string;
  contentJa: string;
  contentEn: string;
  requesterJa: string;
  requesterEn: string;
  status: InquiryStatus;
  created_at: string;
};

export type InquiryCreateInput = {
  title: string;
  content: string;
  requester: string;
};