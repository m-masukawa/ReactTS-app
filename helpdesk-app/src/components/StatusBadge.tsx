//ステータスバッジ
import { type InquiryStatus, inquiryStatusLabel, type Language } from "../types/inquiry";

type StatusBadgeProps = {
  status: InquiryStatus;
  lang: Language;
};

export const StatusBadge = ({ status, lang }: StatusBadgeProps) => {
  const classMap: Record<InquiryStatus, string> = {
    pending: "badge-pending",
    in_progress: "badge-progress",
    completed: "badge-completed",
  };

  return <span className={classMap[status]}>【{inquiryStatusLabel[lang][status]}】</span>;
};