# 中小企業 AI 化服務 - 官網企劃與 Cursor 開發指南

> **給 Cursor 的 Prompt 提示詞說明：**
> 請根據以下網站架構、文案與 UI/UX 規範，協助建構一個現代化、具科技感且高轉化率的 AI 服務官網。
> 建議技術棧：Next.js (App Router) + Tailwind CSS + Lucide Icons + Framer Motion。

## 🛠 一、 Cursor 開發總體指令 (System Prompt for Cursor)

1. **設計風格 (Design System)**：

   * **配色方案**：深色/淺色兼具的現代科技風格。主色系使用深藍/靛青 (`#0F172A`, `#1E293B`) 搭配 AI 亮藍/紫光漸層 (`#3B82F6` to `#8B5CF6`)。

   * **視覺元素**：卡片式設計 (Glassmorphism / Border glow)、微互動動畫、數據圖表展示、工作流 (Workflow) 流程圖。

   * **響應式**：全面支援 Desktop、Tablet 與 Mobile。

2. **核心組件需求**：

   * `Navbar`: 包含 Logo、導覽選單、語言切換、CTA 按鈕 (免費諮詢)。

   * `Hero`: 動態漸層背景、大標題、副標題、雙 CTA 按鈕、AI 工作流示意圖展示。

   * `FeatureGrid`: 4 大核心解決方案模組卡片。

   * `WorkflowSteps`: 4 步驟敏捷導入流程圖。

   * `UseCasesSection`: 產業情境分頁切換 (Tabs)。

   * `PricingTable`: 3 階梯式方案比較表 (含 PoC 體驗包)。

   * `DifyChatWidget`: 頁面右下角浮動 AI 客服機器人預留位置。

   * `Footer`: 快速連結、聯絡資訊、社群媒體與法律條款。

## 📄 二、 網站詳細文案與頁面結構 (Site Content)

### 1. 首頁 (Home Page)

#### ▍ Hero 區塊

* **Headline**: 把沉睡的企業資料，變成 24 小時不休息的 AI 數位員工

* **Sub-headline**: 專為中小企業打造的一站式 AI 轉型解決方案 ｜ 自動化工作流 × 企業私有知識庫 × 既有系統 API 無痛升級

* **CTA 1**: 預約 30 分鐘免費 AI 轉型健檢

* **CTA 2**: 體驗 AI 導覽助手 (與頁面 Dify 外掛聯動)

#### ▍ 痛點對決 (Pain Points vs Solutions)

* **痛點 1 (傳統模式)**: 客服人手不足，夜間/假日錯失潛在訂單。
  👉 **AI 方案**: 24/7 私有知識庫客服，精準解答不幻覺，即時接單。

* **痛點 2 (傳統模式)**: 紙本、PDF 單據靠人工 Key-in，費時且易出錯。
  👉 **AI 方案**: 智能 OCR + AI 欄位萃取，自動拋轉入庫。

* **痛點 3 (傳統模式)**: 舊有 ERP/CRM 系統改版昂貴，資料無法自動化。
  👉 **AI 方案**: Dify API 外掛無痛串接，舊系統直接升級 AI 運算。

#### ▍ 4 大核心服務簡介 (Core Solutions)

1. **企業私有知識庫與 AI 客服**：串接 LINE OA / 網站 Widget，打造不幻覺的專屬 AI 專家。

2. **企業營運與 AI 工作流自動化**：行政流程節點化，會議記錄自動提煉與任務派發。

3. **數據資產化與自動清洗貼標**：非結構化對話/商品描述自動轉 JSON 結構化數據。

4. **既有系統與 IoT 設備 AI 賦能**：舊系統 API 外掛升級，IoT 異常數據秒變白話排障指南。

#### ▍ 敏捷導入 4 步驟 (Process)

1. **需求診斷**：評估現有工作流程與資料庫結構。

2. **PoC 概念驗證**：2 週內快速搭建原型，驗證可行性。

3. **系統整合部署**：透過 API / Dify 串接既有 LINE OA 或企業系統。

4. **持續優化維護**：模型校正、知識庫更新與技術支援。

### 2. 服務解決方案頁 (Solutions Page)

#### 模組 A：企業專屬 AI 客服與行銷自動化 (RAG & Engagement)

* **特色**：支援 PDF、Word、Excel 快速導入；向量資料庫檢索（RAG）；多語系即時翻譯；行銷文案自動產出。

* **應用**：LINE 購物助手、官網 24h 智能客服、跨境電商多語系客服。

#### 模組 B：企業營運與工作流自動化 (AI Workflow)

* **特色**：Dify 可視化工作流編排；跨系統 API 串接；智能單據辨識 (OCR)；HR/行政問答助手。

* **應用**：發票/報價單自動入庫、會議語音轉摘要並派發 Trello/Asana 任務。

#### 模組 C：數據資產化與清洗貼標 (Data Assetization)

* **特色**：大量商品自動打標分類；客戶對話意圖萃取；NL2SQL (白話文轉資料庫查詢)。

* **應用**：電商上萬筆商品屬性自動標籤、老闆白話文問財報數據。

#### 模組 D：既有系統與 IoT 設備 AI 升級 (System & IoT AI)

* **特色**：中介層 API 設計；邊緣設備數據解讀；維修手冊 AI 比對。

* **應用**：舊 ERP 系統增強 AI 搜尋、產線 IoT 警報即時推播「白話文故障排除建議」。

### 3. 產業應用場景 (Use Cases)

* **🛒 電商與零售業**：

  * *問題*：商品缺乏 Tag、客服重複回答規格。

  * *解法*：AI 自動批次清洗貼標 + LINE 專屬 RAG 購物顧問。

* **🏭 傳統製造與工業**：

  * *問題*：進出貨單據大量紙本，IoT 警報缺乏即時處置建議。

  * *解法*：單據自動 OCR 辨識入庫 + IoT 結合 AI 維修助理。

* **🏢 專業服務與顧問**：

  * *問題*：諮詢量大、合約條款繁雜。

  * *解法*：AI 自動篩選高潛力客戶 + 合約法規知識庫助理。

### 4. 方案與計費 (Pricing & PoC Page)

| 方案項目 | PoC 輕量體驗包 | 標準 AI 自動化方案 | 企業級深度整合方案 | 
| ----- | ----- | ----- | ----- | 
| **定位** | 快速驗證可行性 | 完整客服/工作流導入 | 跨系統 API / IoT 整合 | 
| **主要內容** | • 單一私有知識庫建置  • LINE OA 或 Web Widget 串接  • 1 條核心流程驗證 | • 完整 Dify AI 工作流部署  • 多渠道串接 (LINE/FB/Web)  • 單據辨識 / 資料自動貼標 | • 既有 ERP/CRM API 深度串接  • IoT / 數據庫 NL2SQL 串接  • 專屬顧問與長期維護 | 
| **交付時程** | 1 \~ 2 週 | 3 \~ 4 週 | 視專案範疇彈性規劃 | 
| **CTA** | \[ 立即申請 PoC \] | \[ 預約方案諮詢 \] | \[ 聯繫架構師 \] | 

### 5. 關於我們 (About Us Page)

#### ▍ 團隊優勢

* **資深系統與網頁開發經驗**：非單純軟體代理，我們具備強大的前端、後端與 API 串接實力。

* **IoT 軟硬整合背景**：熟悉邊緣數據與雲端 AI 結合架構，技術護城河高。

* **Powered by Dify & LLMs**：採用現代化 AI 工作流開發工具，比傳統開發縮短 70% 時間與成本。

## 💻 三、 Dify Web Widget 嵌入規範

請在 HTML `<body>` 結尾處或 Next.js `Layout` 中預留 Dify 客服聊天外掛腳本：

```
<!-- Dify Web Chatbot Widget Embed -->
<script>
 window.difyChatbotConfig = {
  token: 'YOUR_DIFY_EMBED_TOKEN',
  baseUrl: 'https://udify.app'
 }
</script>
<script
  src="https://udify.app/embed.min.js"
  id="YOUR_DIFY_EMBED_TOKEN"
  defer>
</script>

```

## 📝 四、 Cursor 執行指引

1. 複製此 Markdown 檔案內容，存為 `README.md` 或 `spec.md` 放於專案根目錄。

2. 在 Cursor 中按下 `Ctrl+I` 或 `Cmd+I` (Composer)，輸入指令：

   > "請讀取 `spec.md`，並幫我使用 Next.js (App Router) + Tailwind CSS 建構首頁 Hero 區塊與 4 大解決方案卡片組件。"