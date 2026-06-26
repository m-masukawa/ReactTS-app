// 一覧画面
import { useState } from "react";
import type { Inquiry, InquiryStatus, Language } from "../types/inquiry";
import type { User } from "../types/auth";
import { InquiryTable } from "../components/InquiryTable";

type FilterValue = InquiryStatus | "all";
type SortValue = "date" | "status";

type InquiryListPageProps = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
  onDeleteInquiry: (id: number) => void;
  lang: Language;
  user: User;
};

export const InquiryListPage = ({ inquiries, onSelectInquiry, onDeleteInquiry, lang, user }: InquiryListPageProps) => {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sortBy, setSortBy] = useState<SortValue>("date");

  const countAll = inquiries.length;
  const countPending = inquiries.filter((i) => i.status === "pending").length;
  const countInProgress = inquiries.filter((i) => i.status === "in_progress").length;
  const countCompleted = inquiries.filter((i) => i.status === "completed").length;

  const filteredInquiries = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      const priority: Record<InquiryStatus, number> = { pending: 1, in_progress: 2, completed: 3 };
      return priority[a.status] - priority[b.status];
    }
  });

  const t = lang === "ja" ? {
    sub: "ステータス絞り込み:", all: "すべて", pending: "未対応", progress: "対応中", completed: "完了",
    match: "該当件数:", total: "件 / 全体:", unit: "件", empty: "該当する問い合わせはありません。",
    sortSub: "並び替え:", sortDate: "日付順 (最新順)", sortStatus: "ステータス順",
    userRole: "ログイン中のオペレーター", userStatus: "オンライン"
  } : {
    sub: "FILTER BY STATUS:", all: "ALL", pending: "PENDING", progress: "IN PROGRESS", completed: "COMPLETED",
    match: "MATCHED:", total: "ITEMS / TOTAL:", unit: "ITEMS", empty: "No transmissions found in this sector.",
    sortSub: "SORT BY:", sortDate: "DATE (NEWEST)", sortStatus: "STATUS PRIORITY",
    userRole: "LOGGED IN OPERATOR", userStatus: "ONLINE"
  };

  const getButtonClass = (targetFilter: FilterValue) => {
    return filter === targetFilter ? { backgroundColor: "#7a3bf5", fontWeight: "bold" } : undefined;
  };

  const getSortButtonStyle = (targetSort: SortValue) => {
    const isActive = sortBy === targetSort;
    return {
      padding: "6px 12px", marginRight: "8px", cursor: "pointer",
      backgroundColor: isActive ? "#da70d6" : "#120b24", color: "#fff",
      border: "1px solid #6332c2",
      fontSize: "12px"
    };
  };

  return (
    <div>
      <div style={{ 
        marginTop: "15px", 
        paddingBottom: "15px",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <div>
          <span style={{ marginRight: "10px", fontSize: "14px", color: "#00ffff", fontWeight: "bold" }}>{t.sortSub}</span>
          <button onClick={() => setSortBy("date")} style={getSortButtonStyle("date")}>{t.sortDate}</button>
          <button onClick={() => setSortBy("status")} style={getSortButtonStyle("status")}>{t.sortStatus}</button>
        </div>

        <div className="user-status-panel" style={{ margin: 0 }}>
          <div className="user-avatar-wrapper">
            <div className="user-avatar-glow"></div>

    {(user as any).avatarUrl ? (
      <img 
        src={(user as any).avatarUrl} 
        alt="avatar" 
        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
      />
    ) : (
      <span className="user-avatar-char">OP</span> 
    )}

          </div>
          
          <div className="user-info">
            <span className="user-tag">{t.userRole}</span>
            <span className="user-name" style={{ color: "#00ffff" }}>{user.name}</span>
          </div>
          <div className="system-pulse">
            <span className="pulse-dot"></span>
            {t.userStatus}
          </div>
        </div>
      </div>

      <div 
        className="eo-filter-panel" 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          gap: "10px", 
          width: "100%",
          borderTop: "1px solid #29184a", 
          paddingTop: "15px",
          marginBottom: "15px"
        }}
      >
        <span className="eo-filter-title" style={{ whiteSpace: "nowrap" }}>{t.sub}</span>
        <button onClick={() => setFilter("all")} style={getButtonClass("all")}>{t.all} ({countAll})</button>
        <button onClick={() => setFilter("pending")} style={getButtonClass("pending")}>{t.pending} ({countPending})</button>
        <button onClick={() => setFilter("in_progress")} style={getButtonClass("in_progress")}>{t.progress} ({countInProgress})</button>
        <button onClick={() => setFilter("completed")} style={getButtonClass("completed")}>{t.completed} ({countCompleted})</button>
      </div>

      <p className="eo-filter-info">
        {t.match} <strong>{sortedInquiries.length}</strong> {t.unit} {t.total} {inquiries.length} {t.unit}
      </p>

      {filteredInquiries.length === 0 ? (
        <p style={{ color: "#7a3bf5", fontStyle: "italic", marginTop: "20px" }}>{t.empty}</p>
      ) : (
        <InquiryTable inquiries={sortedInquiries} onSelect={onSelectInquiry} onDelete={onDeleteInquiry} lang={lang} />
      )}
    </div>
  );
};