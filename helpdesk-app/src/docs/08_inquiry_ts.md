# inquiry.ts（型定義・共通データ）に関する疑問と回答メモ

### Q1. `export type Language = "ja" | "en";` は何をしている？
**A.** **アプリ全体で使用できる言語の選択肢を「`"ja"`（日本語）か `"en"`（英語）のどちらか2択」へと制限するルールを定義している。**
このように文字列を直接指定する形を「リテラル型」と呼び、これ以外の適当な文字（例えば `"fr"` や `"cn"` など）を代入しようとすると、TypeScriptがコンパイルエラーとして即座に弾いてくれるようになる。

---

### Q2. `export type InquiryStatus = "pending" | "in_progress" | "completed";` は何をしている？
**A.** **宇宙ログが持つことができるステータスの状態を、厳密に3つの文字列のいずれかに制限するルールを定義している。**
* `pending` ➔ 未対応
* `in_progress` ➔ 対応中
* `completed` ➔ 完了
システム内でステータスを扱う際、スペルミス（例：`pendng` などの打ち間違い）があればコードを書いた瞬間にエディタが赤波線で警告してくれるため、バグを未然に100%防ぐことができる。

---

### Q3. `export const inquiryStatusLabel: Record<Language, Record<InquiryStatus, string>> = { ... };` は何？
**A.** **Q1の言語（`Language`）とQ2のステータス（`InquiryStatus`）を掛け合わせ、画面に表示するための具体的な「翻訳テキスト」を保持している共通の辞書データである。**
* `Record<Language, ...>` ➔ 「最初の鍵は言語（jaかen）ですよ」という意味。
* `Record<InquiryStatus, string>` ➔ 「その中にある次の鍵はステータスで、最終的に文字（string）が返ってきますよ」という意味。
* **データの構造：**
  * `inquiryStatusLabel["ja"]["pending"]` ➔ 「未対応」
  * `inquiryStatusLabel["en"]["completed"]` ➔ 「Completed」
この辞書データを1箇所にまとめて公開（`export`）しておくことで、`StatusBadge` などの色々な部品からいつでもこの翻訳を呼び出せるようになっている。

---

### Q4. `export type Inquiry = { ... }` は何を表している？
**A.** **このヘルプデスクシステムにおける、宇宙ログ（問い合わせデータ）1件分が保持すべき「すべてのデータ項目と形」を定めた、最もコアとなる設計図である。**
* `id: number` ➔ ログの識別番号（数字）。
* `titleJa: string`, `titleEn: string` ➔ あなたが多言語対応のために拡張してくれた、日本語と英語それぞれのタイトル枠（文字列）。
* `contentJa: string`, `contentEn: string` ➔ 日本語と英語それぞれの本文（文字列）。
* `requesterJa: string`, `requesterEn: string` ➔ 日本語と英語それぞれの投稿者名（文字列）。
* `status: InquiryStatus` ➔ Q2で決めた3種類のうち、いずれかのステータスが入る指定。
* `created_at: string` ➔ ログが作られた日時（`1986-09-12T09:00:00Z` などの文字列）。

---

### Q5. `export type InquiryCreateInput = { ... }` は何のために必要なの？
**A.** **新規登録画面（`InquiryCreatePage`）の入力フォームから収集する、「必要最低限の入力項目」を定めた設計図である。**
Q4の `Inquiry` はIDや日付、日・英すべてのデータが必要だが、ユーザーがフォームで入力するのは「タイトル（`title`）」「内容（`content`）」「投稿者（`requester`）」の3つだけで、しかもこの時点では日・英に分かれていない。
そのため、「フォームから受け取るデータは、このシンプルな3つの文字だけだよ」という専用の形を定義し、React Hook Form や Zod のバリデーションの基準として使用している。