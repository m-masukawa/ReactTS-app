//テーブルの1行
import type { Inquiry, Language } from "../types/inquiry";
import { StatusBadge } from "./StatusBadge";

type InquiryRowProps = {
  inquiry: Inquiry;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  lang: Language; 
};

export const InquiryRow = ({ inquiry, onSelect, onDelete, lang }: InquiryRowProps) => {
    const deleteLabel = lang === "ja" ? "削除" : "ABORT";
  return (
    <tr>
      <td>{inquiry.id}</td>
      <td>
        <button onClick={() => onSelect(inquiry.id)}>
          {lang === "ja" ? inquiry.titleJa : inquiry.titleEn}
        </button>
      </td>
      <td>
        <StatusBadge status={inquiry.status} lang={lang} />
      </td>
      <td>{lang === "ja" ? inquiry.requesterJa : inquiry.requesterEn}</td>
      <td>{inquiry.created_at.split("T")[0]}</td>
      <td>
        <button
          onClick={() => {
            if (
              confirm(
                lang === "ja"
                  ? "このログを消去しますか？"
                  : "Abort this transmission?",
              )
            ) {
              onDelete(inquiry.id);
            }
          }}
          style={{
            background: "linear-gradient(135deg, #ff007f, #8b0042)",
            borderColor: "#ff007f",
            padding: "4px 10px",
            fontSize: "12px",
          }}
          >
          {deleteLabel}
        </button>
      </td>
    </tr>
  );
};