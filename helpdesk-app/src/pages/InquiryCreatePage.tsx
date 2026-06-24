//登録画面
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Language } from "../types/inquiry";
import { autoTranslate } from "../utils/translator";

type InquiryCreateInputAll = {
  titleJa: string;
  titleEn: string;
  contentJa: string;
  contentEn: string;
  requesterJa: string;
  requesterEn: string;
};

type InquiryCreatePageProps = {
  onAdd: (input: InquiryCreateInputAll) => void;
  onBack: () => void;
  lang: Language;
};

const createInquirySchema = (lang: Language) => z.object({
  title: z.string().min(1, { 
    message: lang === "ja" ? "※タイトルを入力してください" : "※Subject is required" 
  }),
  content: z.string(),
  requester: z.string().min(1, { 
    message: lang === "ja" ? "※投稿者名を入力してください" : "※Crew name is required" 
  }),
});

type InquiryFormValues = z.infer<ReturnType<typeof createInquirySchema>>;

export const InquiryCreatePage = ({ onAdd, onBack, lang }: InquiryCreatePageProps) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<InquiryFormValues>({
    resolver: zodResolver(createInquirySchema(lang)),
    mode: "onChange",
    defaultValues: { title: "", content: "", requester: "" }
  });

  const onSubmit = async (data: InquiryFormValues) => {
    const titleData = await autoTranslate(data.title);
    const contentData = await autoTranslate(data.content);
    const requesterData = await autoTranslate(data.requester);

    const payload: InquiryCreateInputAll = {
      titleJa: titleData.ja,
      titleEn: titleData.en,
      contentJa: contentData.ja,
      contentEn: contentData.en,
      requesterJa: requesterData.ja,
      requesterEn: requesterData.en,
    };

    onAdd(payload);
  };

  const t = lang === "ja" 
    ? { back: "← 一覧へ戻る", head: "新規問い合わせ", title: "タイトル", content: "内容", req: "投稿者名", submit: "登録する", required: "*必須" }
    : { back: "← BACK TO BRIDGE", head: "NEW TRANSMISSION", title: "SUBJECT", content: "DETAILS", req: "CREW NAME", submit: "TRANSMIT", required: "*REQ" };

  return (
    <div className="eo-card">
      <button onClick={onBack} style={{ marginBottom: "15px" }}>{t.back}</button>
      <h2>{t.head}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="eo-form">
        <div className="eo-form-group">
          <label className="eo-form-label">{t.title} <span className="eo-required-badge">{t.required}</span></label>
          <input type="text" {...register("title")} />
          {errors.title && <p className="eo-error-text">{errors.title.message}</p>}
        </div>
        <div className="eo-form-group">
          <label className="eo-form-label">{t.content}</label>
          <textarea {...register("content")} />
        </div>
        <div className="eo-form-group">
          <label className="eo-form-label">{t.req} <span className="eo-required-badge">{t.required}</span></label>
          <input type="text" {...register("requester")} />
          {errors.requester && <p className="eo-error-text">{errors.requester.message}</p>}
        </div>
        <button type="submit" disabled={!isValid}>{t.submit}</button>
      </form>
    </div>
  );
};