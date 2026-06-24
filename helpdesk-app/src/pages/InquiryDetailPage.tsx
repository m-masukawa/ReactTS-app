//詳細画面
import type { Inquiry, InquiryStatus, Language } from "../types/inquiry";
import { StatusBadge } from "../components/StatusBadge";

type InquiryDetailPageProps = {
  inquiries: Inquiry[];
  selectedId: number;
  onBack: () => void;
  onUpdateStatus: (id: number, status: InquiryStatus) => void;
  onDeleteInquiry: (id: number) => void;
  lang: Language;
};

export const InquiryDetailPage = ({
  inquiries,
  selectedId,
  onBack,
  onUpdateStatus,
  onDeleteInquiry,
  lang,
}: InquiryDetailPageProps) => {
  const inquiry = inquiries.find((i) => i.id === selectedId);

  if (!inquiry) {
    return <p>Data not found.</p>;
  }

  const t =
    lang === "ja"
      ? {
          back: "← 一覧へ戻る",
          crew: "投稿者：",
          change: "ステータス変更：",
          pending: "未対応",
          progress: "対応中",
          completed: "完了",
          del: "このログを消去する",
        }
      : {
          back: "← BACK TO BRIDGE",
          crew: "CREW: ",
          change: "UPDATE STATUS: ",
          pending: "Pending",
          progress: "In Progress",
          completed: "Completed",
          del: "ABORT LOG",
        };

  return (
    <div className="eo-card">
      <button onClick={onBack} style={{ marginBottom: "15px" }}>
        {t.back}
      </button>

      <div className="eo-card-header">
        <h2>{lang === "ja" ? inquiry.titleJa : inquiry.titleEn}</h2>
        <StatusBadge status={inquiry.status} lang={lang} />
      </div>

      <hr className="eo-divider" />
      <p>
        <strong>{t.crew}</strong>
        {lang === "ja" ? inquiry.requesterJa : inquiry.requesterEn}
      </p>

      <div className="eo-log-box">
        {lang === "ja" ? inquiry.contentJa : inquiry.contentEn}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            {t.change}
          </label>

          <select
            value={inquiry.status}
            onChange={(e) => {
              onUpdateStatus(inquiry.id, e.target.value as InquiryStatus);
              onBack();
            }}
          >
            <option value="pending">{t.pending}</option>
            <option value="in_progress">{t.progress}</option>
            <option value="completed">{t.completed}</option>
          </select>
        </div>

        <button
          onClick={() => {
            const message =
              lang === "ja"
                ? "このログを消去しますか？"
                : "Abort this transmission?";
            if (confirm(message)) {
              onDeleteInquiry(inquiry.id);
            }
          }}
          style={{
            background: "linear-gradient(135deg, #ff007f, #8b0042)",
            borderColor: "#ff007f",
          }}
        >
          {t.del}
        </button>
      </div>
    </div>
  );
};
