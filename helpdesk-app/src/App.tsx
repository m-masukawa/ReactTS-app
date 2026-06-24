//最親コンポーネント
import { useEffect, useState } from "react";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";
import { InquiryAboutPage } from "./pages/InquiryAboutPage";
import { inquiryApi } from "./api/inquiries";
import type { Inquiry, InquiryCreateInput, InquiryStatus, Language } from "./types/inquiry";


function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [currentPage, setCurrentPage] = useState<"list" | "detail" | "about" | "create">("list");
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
      console.error(err);
      alert("削除に失敗しました。");
    }
  };

  const handleAdd = async (input: InquiryCreateInput) => {
    try {
      await inquiryApi.create(input);
      setCurrentPage("list");
      fetchInquiries();
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
    ja: { navList: "一覧", navCreate: "新規登録", navAbout: "作品概要", title: "ヘルプデスク", loading: "通信中..." },
    en: { navList: "LIST", navCreate: "NEW INQUIRY", navAbout: "ABOUT EO", title: "COMMAND CENTER", loading: "LOADING..." }
  }[language];

  return (
    <div className="eo-main-container">
      <nav className="eo-nav">
        <div className="eo-nav-links">
          <button onClick={() => { setSelectedId(null); setCurrentPage("list"); }}>{t.navList}</button>
          <button onClick={() => { setSelectedId(null); setCurrentPage("create"); }}>{t.navCreate}</button>
          <button onClick={() => { setSelectedId(null); setCurrentPage("about"); }}>{t.navAbout}</button>
        </div>
        <div>
          <button onClick={() => setLanguage(language === "ja" ? "en" : "ja")} className="btn-lang-toggle">
            We are here to change the world!
          </button>
        </div>
      </nav>

      <h1>{t.title}</h1>

      {isLoading ? (
        <div style={{ color: "#00ffff", textAlign: "center", marginTop: "2rem" }}>{t.loading}</div>
      ) : (
        <main>
          {currentPage === "list" && (
            <InquiryListPage inquiries={inquiries}
              onSelectInquiry={handleSelectInquiry}
              onDeleteInquiry={handleDeleteInquiry}
              lang={language} />
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

export default App;