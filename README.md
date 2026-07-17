# LAWLAWA 流流社無袖上衣展示網站

手機優先的靜態商品展示頁，包含七款印花配色、背面圖案說明與 DT261 版型資訊。

## 專案結構

- `public/index.html`：頁面內容與語意結構
- `public/css/styles.css`：響應式版面與視覺樣式
- `public/js/app.js`：配色切換、滑動與鍵盤互動
- `public/images/`：商品設計稿與版型說明圖
- `public/_headers`：Cloudflare Pages 安全與快取標頭

## 本機預覽

使用任一靜態網站伺服器，將網站根目錄指定為 `public`。

## Cloudflare Pages

- Framework preset：None
- Build command：留空
- Build output directory：`public`
- Production branch：`main`
