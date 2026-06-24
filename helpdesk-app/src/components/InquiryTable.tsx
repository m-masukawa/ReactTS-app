//一覧の枠組み
import type { Inquiry, InquiryStatus, Language } from "../types/inquiry";

type InquiryTableProps = {
  inquiries: Inquiry[];
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  lang: Language;
};

type LaravelInquiryLegacy = {
  requester_ja?: string;
  requester_en?: string;
};

export const InquiryTable = ({
  inquiries,
  onSelect,
  onDelete,
  lang,
}: InquiryTableProps) => {
  const t =
    lang === "ja"
      ? {
          id: "ID",
          title: "タイトル",
          status: "ステータス",
          req: "投稿者",
          date: "日時",
          action: "操作",
          btnDelete: "消去",
        }
      : {
          id: "ID",
          title: "SUBJECT",
          status: "STATUS",
          req: "CREW",
          date: "DATE",
          action: "COMMAND",
          btnDelete: "PURGE",
        };

  const getStatusClass = (status: InquiryStatus) => {
    switch (status) {
      case "pending":
        return "badge-pending";
      case "in_progress":
        return "badge-progress";
      case "completed":
        return "badge-completed";
      default:
        return "";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="eo-main-container">
      {/* 💡 インラインスタイルをすべて撤去し、index.css の純粋な <table> を最優先に */}
      <table>
        <thead>
          <tr>
            <th>{t.id}</th>
            <th>{t.title}</th>
            <th>{t.status}</th>
            <th>{t.req}</th>
            <th>{t.date}</th>
            <th style={{ textAlign: "center" }}>{t.action}</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => {
            const titleJa = inquiry.titleJa ?? "無題";
            const titleEn = inquiry.titleEn ?? titleJa;

            const legacyData = inquiry as Inquiry & LaravelInquiryLegacy;

            const requesterJa = inquiry.requesterJa ?? legacyData.requester_ja ?? "不明";
            const requesterEn = inquiry.requesterEn ?? legacyData.requester_en ?? requesterJa;

            return (
              <tr
                key={inquiry.id}
                onClick={() => onSelect(inquiry.id)}
                style={{ cursor: "pointer" }}
              >
                <td style={{ fontWeight: "bold" }}>{inquiry.id}</td>
                <td>{lang === "ja" ? titleJa : titleEn}</td>
                <td>
                  <span className={getStatusClass(inquiry.status)}>
                    {lang === "ja"
                      ? inquiry.status === "pending"
                        ? "未対応"
                        : inquiry.status === "in_progress"
                          ? "対応中"
                          : "完了"
                      : inquiry.status === "pending"
                        ? "PENDING"
                        : inquiry.status === "in_progress"
                          ? "IN PROGRESS"
                          : "COMPLETED"}
                  </span>
                </td>
                <td>{lang === "ja" ? requesterJa : requesterEn}</td>
                <td style={{ color: "#a37df2", fontSize: "14px" }}>
                  {formatDate(inquiry.created_at)}
                </td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        const message =
                          lang === "ja"
                            ? "このログを消去しますか？"
                            : "Abort this transmission?";

                        if (confirm(message)) {
                          onDelete(inquiry.id);
                        }
                      }}
                      style={{
                        background:
                          "linear-gradient(135deg, #ff66b2 0%, #ff007f 50%, #99004c 100%)",
                        borderColor: "#ff66b2",
                        boxShadow: "0 0 12px rgba(255, 0, 127, 0.6)",
                      }}
                    >
                      {t.btnDelete}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
