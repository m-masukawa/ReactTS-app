import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Language } from "../types/inquiry";
import type { User } from "../types/auth";
import { inquiryApi } from "../api/inquiries";

type MyPageProps = {
  user: User;
  lang: Language;
  onBack: () => void;
  onUpdateSuccess: (updatedUser: User) => void;
};

export const MyPage = ({ user, lang, onBack, onUpdateSuccess }: MyPageProps) => {
  const [username, setUsername] = useState<string>(user.name);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
  (user as { avatarUrl?: string | null }).avatarUrl || null
);
  const t = lang === "ja" ? {
    title: "プロファイル変更",
    nameLabel: "ユーザーネーム (コードネーム)",
    avatarLabel: "アバター画像",
    selectFile: "ファイルを選択",
    saveBtn: "プロファイル更新を実行",
    backBtn: "コントロールセンターへ戻る",
    updating: "システム更新中...",
    success: "プロファイルデータを同期しました。"
  } : {
    title: "PROFILE CONFIG",
    nameLabel: "USER NAME (CODENAME)",
    avatarLabel: "AVATAR",
    selectFile: "SELECT FILE",
    saveBtn: "EXECUTE PROFILE UPDATE",
    backBtn: "RETURN TO COMMAND CENTER",
    updating: "UPDATING SYSTEM...",
    success: "Profile data synchronized."
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!username.trim()) return;
    
    try {
      const updatedData = await inquiryApi.updateProfile({
        name: username,
        avatarUrl: previewUrl 
      });

      alert(t.success);
      onUpdateSuccess(updatedData); 
    } catch (err) {
      console.error(err);
      alert("プロファイルの更新に失敗しました。");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", background: "rgba(18, 11, 36, 0.6)", border: "1px solid #6332c2" }}>
      <h2 style={{ color: "#00ffff", borderBottom: "2px solid #7a3bf5", paddingBottom: "10px", fontFamily: "monospace", letterSpacing: "2px" }}>
        {t.title}
      </h2>

      <div style={{ marginTop: "25px", display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          <label style={{ display: "block", color: "#bfa3f0", fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }}>{t.avatarLabel}</label>
          <div className="user-avatar-wrapper" style={{ width: "80px", height: "80px", border: "2px solid #00ffff" }}>
            <div className="user-avatar-glow" style={{ boxShadow: "0 0 15px #00ffff" }}></div>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span className="user-avatar-char" style={{ fontSize: "24px", color: "#00ffff" }}>OP</span>
            )}
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <input 
            type="file" 
            accept="image/*" 
            id="avatar-input" 
            onChange={handleImageChange} 
            style={{ display: "none" }} 
          />
          <label htmlFor="avatar-input" className="btn-lang-toggle" style={{ padding: "8px 16px", cursor: "pointer", fontSize: "12px", border: "1px solid #00ffff" }}>
            {t.selectFile}
          </label>
        </div>
      </div>

      <div style={{ marginTop: "25px" }}>
        <label style={{ display: "block", color: "#bfa3f0", fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }}>{t.nameLabel}</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%", padding: "10px", background: "#120b24", border: "1px solid #6332c2",
            color: "#fff", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", outline: "none",
            boxShadow: "inset 0 0 5px rgba(122, 59, 245, 0.5)"
          }}
        />
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={handleSave} style={{ flex: 1 }}>{t.saveBtn}</button>
        <button onClick={onBack} style={{ background: "#120b24", borderColor: "#29184a", fontSize: "12px" }}>{t.backBtn}</button>
      </div>
    </div>
  );
};