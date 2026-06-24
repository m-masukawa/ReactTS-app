export const autoTranslate = async (text: string): Promise<{ ja: string; en: string }> => {
  if (!text) return { ja: "", en: "" };

  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);

  const sourceLang = hasJapanese ? 'ja' : 'en';
  const targetLang = hasJapanese ? 'en' : 'ja';

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    const translatedText = data[0][0][0];

    if (hasJapanese) {
      return { ja: text, en: translatedText };
    } else {
      return { ja: translatedText, en: text };
    }
  } catch (error) {
    console.error("Google翻訳回路でエラーが発生しました。:", error);
    return hasJapanese 
      ? { ja: text, en: `[ENG LOG] ${text}` }
      : { ja: `【和訳エラー】 ${text}`, en: text };
  }
};