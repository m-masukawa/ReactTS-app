//最親コンポーネント

import { useEffect, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";
import { InquiryAboutPage } from "./pages/InquiryAboutPage";
import { useAuth } from "./hooks/useAuth";
import { inquiryApi } from "./api/inquiries";
import type { Inquiry, InquiryStatus, Language } from "./types/inquiry";
import type { User } from "./types/auth";
import axios from 'axios';
import eoImage from './assets/eo.png';

type Page = "list" | "detail" | "about" | "create";
type AuthMode = "login" | "register";

type InquiryPageProps = {
  user: User;
  onLogout: () => void;
};

function InquiryPage({ user, onLogout }: InquiryPageProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>("ja");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchInquiries = async () => {
    try {
      const data = await inquiryApi.getAll();
      setInquiries(data);
    } catch (err) {
      console.error("データ取得に失敗しました:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeCommandCenter = async () => {
      setIsLoading(true);
      try {
        const data = await inquiryApi.getAll();
        if (isMounted) {
          setInquiries(data);
        }
      } catch (err) {
        console.error("データ取得に失敗しました:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeCommandCenter();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
    try {
      await inquiryApi.updateStatus(id, status);
      fetchInquiries();
    } catch (err) {
      console.error(err);
      alert("ステータスの更新に失敗しました。");
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    try {
      await inquiryApi.delete(id);
      setSelectedId(null);
      setCurrentPage("list");
      fetchInquiries();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          alert('削除には管理者権限が必要です');
          return;
        }
      }

      console.error(err);
      alert("削除に失敗しました。");
    }
  };

  const handleAdd = async (input: {
    titleJa: string;
    titleEn: string;
    contentJa: string;
    contentEn: string;
    requesterJa: string;
    requesterEn: string;
  }) => {
    try {
      await inquiryApi.create(input);
      setCurrentPage("list");
      await fetchInquiries();
    } catch (err) {
      console.error(err);
      alert("新規登録に失敗しました。");
    }
  };

  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  const t = {
    ja: { navList: "一覧", navCreate: "新規登録", navAbout: "作品概要", title: "コマンドセンター", loading: "通信中...", logout: "ログアウト" },
    en: { navList: "LIST", navCreate: "NEW INQUIRY", navAbout: "ABOUT EO", title: "COMMAND CENTER", loading: "LOADING...", logout: "LOGOUT" }
  }[language];

  return (
    <div className="eo-main-container">
      {/* ナビゲーションバーの調整 */}
      <nav className="eo-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="eo-nav-links">
          <button onClick={() => { setSelectedId(null); setCurrentPage("list"); }}>{t.navList}</button>
          <button onClick={() => { setSelectedId(null); setCurrentPage("create"); }}>{t.navCreate}</button>
          <button onClick={() => { setSelectedId(null); setCurrentPage("about"); }}>{t.navAbout}</button>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

          <button onClick={onLogout} className="btn-logout">{t.logout}</button>
          
          <button onClick={() => setLanguage(language === "ja" ? "en" : "ja")} className="btn-lang-toggle">
            We are here to change the world!
          </button>
        </div>
      </nav>

      <h1 
        style={{ 
          backgroundImage: `url(${eoImage})`,
          backgroundSize: '120px auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900
        }} 
        className="text-white text-3xl text-center bg-transparent tracking-wider" 
      >
        {t.title}
      </h1>

      {isLoading ? (
        <div style={{ color: "#00ffff", textAlign: "center", marginTop: "2rem" }}>{t.loading}</div>
      ) : (
        <main>
{currentPage === "list" && (
  <InquiryListPage inquiries={inquiries}
    onSelectInquiry={handleSelectInquiry}
    onDeleteInquiry={handleDeleteInquiry}
    lang={language}
    user={user} />
)}
          {currentPage === "detail" && selectedId !== null && (
            <InquiryDetailPage inquiries={inquiries}
              selectedId={selectedId}
              onBack={handleBack}
              onUpdateStatus={handleUpdateStatus}
              onDeleteInquiry={handleDeleteInquiry}
              lang={language} />
          )}
          {currentPage === "create" && (
            <InquiryCreatePage onAdd={handleAdd}
              onBack={handleBack}
              lang={language} />
          )}
          {currentPage === "about" && (
            <InquiryAboutPage lang={language} />
          )}
        </main>
      )}
    </div>
  );
}

function App() {
  const { user, isLoggedIn, isLoading, login, register, logout } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  if (isLoading) {
    return <div style={{ color: "#00ffff", textAlign: "center", marginTop: "5rem" }}>LOADING AUTH SYSTEM...</div>;
  }

  if (!isLoggedIn) {
    if (authMode === "register") {
      return (
        <RegisterForm
          onRegister={register}
          onSwitchToLogin={() => setAuthMode("login")}
        />
      );
    }
    
    return (
      <div>
        <LoginForm onLogin={login} />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button type="button" onClick={() => setAuthMode("register")} style={{ background: "none", border: "none", color: "#00ffff", cursor: "pointer", textDecoration: "underline" }}>
            Create an Account (アカウント作成)
          </button>
        </div>
      </div>
    );
  }

  return <InquiryPage user={user!} onLogout={logout} />;
}

export default App;