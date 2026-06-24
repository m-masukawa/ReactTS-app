# 🚀 EO Helpdesk & Command Center (React + TypeScript + Vite)

『キャプテンEO（Captain EO）』の世界観をベースに構築された、多言語対応の宇宙船ヘルプデスク・コマンドセンターシステムです。
単なるCRUDアプリケーションに留まらず、実務レベルのフォーム管理、厳格な型定義、そして1980年代のポップカルチャーへのリスペクトを融合させた芸術的SPA（Single Page Application）として設計されています。

---

## 🌌 作品概要とプロジェクトテーマ

本作は1986年に制作されたディズニーパークの伝説的4Dアトラクション『キャプテンEO』をモチーフにしています。
「武力ではなく、音楽と愛によって敵を変化させる」というマイケル・ジャクソンの平和思想や、ジョージ・ルーカス、フランシス・フォード・コッポラらが結集した1980年代のサイバー・SFカルチャー特有のネオンカラーをCSSによって具現化しています。

---

## 🛠️ 搭載機能（Features）

1. **多言語動的切り替え（Global Language Switcher）**
   * 「We are here to change the world!」ボタンをトリガーに、UIテキストだけでなく、宇宙ログのデータ（日・英個別保持）や、バリデーションエラーメッセージまでを一瞬で切り替えます。
2. **リアルタイム絞り込み＆ソート（Reactive Filter & Sort）**
   * 宇宙ログのステータス（未対応 / 対応中 / 完了）ごとのリアルタイム件数集計、および「日付順（最新順）」「ステータス優先度順（Pending最優先）」の複合データ加工ロジックを実装。
3. **堅牢なフォームバリデーション（RHF + Zod Combo）**
   * `React Hook Form` による非制御コンポーネントベースの高速な状態管理と、`Zod` スキーマによる厳格な文字数チェック（最低1文字以上の必須入力制御）を同期。
4. **キャプテンEO特設解説エリア（Deep Dive Page）**
   * ルーティングライブラリに依存せず、Reactの単一方向データフロー（Stateの出し分け）を用いて、作品の背景・テーマ・豆知識を文語体で詳細に解説する特設画面を搭載。

---

## 📂 ディレクトリ構造とコンポーネント設計（Architecture）

本プロジェクトは**「単一方向データフロー」**と**「責務の分離」**を意識し、実際の環境に即して以下のようにコンポーネントおよび手動ドキュメントのレイヤーを分割しています。

```text
src
├── 📁 components              # 描画と表示の責務に特化したピュアコンポーネント
│   ├── 📄 InquiryTable.tsx        # 一覧の枠組み（ループ処理）
│   ├── 📄 InquiryRow.tsx          # テーブルの1行（詳細遷移・削除トリガー）
│   └── 📄 StatusBadge.tsx         # ステータスバッジ（ネオンカラー・翻訳辞書バインド）
├── 📁 docs                    # 技術仕様・自習用ドキュメント（手動構築）
│   ├── 📄 01_InquiryRow.md
│   ├── 📄 02_InquiryTable.md
│   ├── 📄 03_StatusBadge.md
│   ├── 📄 04_InquiryAboutPage.md
│   ├── 📄 05_InquiryCreatePage.md
│   ├── 📄 06_InquiryDetailPage.md
│   ├── 📄 07_InquiryListPage.md
│   ├── 📄 08_inquiry_ts.md
│   └── 📄 09_App.tsx.md
├── 📁 pages                   # 状態や固有ロジックを持つ大枠の画面コンポーネント
│   ├── 📄 InquiryAboutPage.tsx    # 作品概要画面（多言語テキストアーカイブ）
│   ├── 📄 InquiryCreatePage.tsx   # 登録画面（React Hook Form + Zodバリデーション）
│   ├── 📄 InquiryDetailPage.tsx   # 詳細画面（単一データ検索・ステータス更新）
│   └── 📄 InquiryListPage.tsx     # 一覧画面（絞り込み・ソートの派生データ生成）
├── 📁 types                   # アプリ全体の型定義とドメインルール
│   └── 📄 inquiry.ts              # ログデータ構造、ステータス、言語、共通翻訳辞書
├── 📄 App.css
├── 📄 App.tsx                 # アプリケーションの最高司令塔（状態の一元管理・リレー）
└── 📄 index.css               # キャプテンEOの世界観を定義したグローバルスタイル

## 🚀 テクノロジー・スタック（Tech Stack）

* **Vite**: フロントエンド超高速ビルドツール
* **React (TypeScript)**: UIライブラリ / 静的型付けによるバグの未然防止
* **React Hook Form**: フォーム状態管理・再レンダリング最適化
* **Zod**: スキーマ駆動型バリデーションライブラリ
* **@hookform/resolvers**: RHFとZodのデータブリッジ

---

## 🛸 開発環境の起動方法（Setup）

依存パッケージをインストールし、ローカル開発サーバーを起動します。

```bash
# パッケージのインストール
npm install

# 開発用ローカルサーバーの起動
npm run dev