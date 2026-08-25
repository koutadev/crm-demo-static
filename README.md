# crm-sales 静的デモ

営業・売上管理システム **[crm-sales](https://github.com/koutadev/crm-sales)** の画面を、
そのまま静的サイトとして書き出したものです（ポートフォリオ用）。

**公開先： https://crm-demo-static-snowy.vercel.app**

- 表示されている会社名・担当者名・金額は**すべて架空のダミーデータ**です（実在の個人・企業とは関係ありません）
- 静的サイトのため、**保存・出力・検索などサーバが必要な操作は動作しません**（押すと「このデモでは動作しません」と表示されます）

## ページ

| ファイル | 画面 | 見どころ |
| --- | --- | --- |
| `dashboard.html` | ダッシュボード | 当月売上・見込みの KPI、月次推移・担当者別のグラフ、パイプライン |
| `deals.html` | 商談一覧 | 絞り込みに連動するサマリとステータス別の内訳バー、期間フィルタ、保存ビュー |
| `deals-kanban.html` | 商談カンバン | ステータスを列にしたパイプライン。列ヘッダーに件数と税込金額 |
| `deal.html` | 商談詳細 | 金額カード・次アクション・タブ（概要／明細／活動）・**税率別の内訳** |
| `customer.html` | 顧客詳細 | 会社情報と取引金額サマリ、担当者／商談／活動のタブ |
| `masters.html` | マスタ管理 | マスタのハブ画面 |

`index.html` はダッシュボードへの入口です。

## 書き出し方（再現手順）

本体（crm-sales）の実画面 HTML を取得してローカル化しています。手作業はありません。

```bash
# crm-sales 側で
docker compose up -d
npm run build                      # アセットを最新に
php artisan migrate:fresh --seed   # デモデータを整地（任意）

python3 bin/export-static-demo.py  # → ../crm-demo-static へ書き出し
```

本体の画面を直したら、このコマンドを流し直すだけでデモが追随します。
書き出し対象のページや、デモ用の注記・無効化の挙動は
`crm-sales/bin/export-static-demo.py` に定義してあります。

## ローカルで確認する

```bash
python3 -m http.server 4173
# → http://localhost:4173
```

## デプロイ（Vercel）

ビルド不要の静的サイトです。リポジトリのルートをそのまま配信します。

```bash
vercel --prod
```

Vercel の画面から取り込む場合は、Framework Preset を **Other**、
Build Command と Output Directory は空のままにしてください。
