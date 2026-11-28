# hikacha. — The Creative Atelier

ゲーム、アプリ、イラスト、制作日記、制作中のアイデアを紹介する個人ポートフォリオサイトです。React + Vite で作られており、GitHub Pages での公開を想定しています。

## 起動と本番確認

必要なものは Node.js 22 以降です。初回のみ依存関係を入れます。

```bash
npm ci
npm run dev
```

表示されたローカルURLを開きます。開発中は JOURNAL の下書きと、左下の **SEASON PREVIEW** が表示されます。

本番用の確認は次のとおりです。

```bash
npm run build
npm run preview
npm run lint
```

`npm run build` は公開用の `dist/` を作ります。`dist/` は Git に追加しません。

## どこを編集するか

| 更新したいもの | 編集する場所 |
| --- | --- |
| WORKS の作品情報 | `src/data.js` の `apps`、`live2d`、`illustrations`、`works` |
| LAB のプロジェクト | `src/data.js` の `projects` |
| ABOUT の自己紹介・年表・道具箱 | `src/data.js` の `aboutData` |
| HOME 表紙・号数 | `src/seasonal.js` の `magazine` |
| 季節・イベントの文言や色 | `src/seasonal.js` の `seasons`、`events` |
| JOURNAL 記事 | `content/journal/*.md` |
| 画像・動画 | `public/media/` 以下 |
| イラスト（CONTACT・JOURNAL・LAB・ABOUT） | `src/photos.js` と `public/media/art/` |
| 問い合わせ先メールアドレス・件名・本文テンプレート | `src/contactConfig.js` |

`public/media/example.webp` を追加した時は、データ側に `media/example.webp` と書きます。画像・動画の品質は不必要に落とさず、作品ごとに適切なファイルを使ってください。

## WORKS を追加・編集する

1. `public/media/` または `public/media/apps/` に素材を置きます。
2. `src/data.js` の該当配列に、名前・紹介文・画像・技術・確認済みリンクを追加します。
3. 一覧、カテゴリ件数、ランダム紹介、HOMEの作品数にも反映したい場合は、`works` に含まれる構成を使います。
4. 年が不明なら `yearNumber` を入れません。URL・実績・制作背景は確認済みのものだけ書きます。

アプリ画面は `gallery` に `{ src, alt, label }` の形で追加します。縦長画像は比率を保ってスマートフォンモックアップに表示されます。

## JOURNAL を追加・公開する

1. `content/journal/article-template.md` を複製します。
2. `slug`、`title`、`description`、`category`、`tags` を編集します。
3. 画像は `public/media/journal/` に置き、`cover: media/journal/ファイル名.jpg` のように書きます。`cover` を空にすると、マスコットのイラスト＋自動で選ばれる色の背景が自動でサムネになります（色は `coverColor: '#dce7eb'` で変更可）。
4. 下書き中は `draft: true` のままにします。`npm run dev` でだけ確認できます。
5. 公開する時は、確認済みの `date` を入力して `draft: false` にします。

`featured: true` を付けた公開記事は JOURNAL の特集になります。指定がなければ最新の公開記事が特集になります。

`npm run build` は下書き記事を生成データから除外するため、下書き本文・画像参照は `dist/` に含まれません。ただし **GitHubリポジトリを公開する場合、リポジトリにコミットした下書きMarkdownは読めます**。公開したくない本文や素材はコミットせず、別の非公開保管場所に置いてください。

## LAB プロジェクトを追加・更新する

`src/data.js` の `projects` が LAB と HOME で共有する台帳です。

- 追加時は `id`、`slug`、`title`、`stage`、`description`、`concept`、`visibility` を設定します。
- `stage` は `SEED`、`SPROUT`、`GROWING`、`BUD`、`BLOOM`、`DORMANT`、`ARCHIVED` です。制作状況が変わった時だけ更新します。季節では変更しません。
- `visibility: 'public'` のものだけ公開ページに出ます。非公開のアイデアや制作メモを公開用のデータに入れないでください。
- 成長記録は `milestones` に `{ date, title, description, stage, image, relatedArticle }` の形で追加します。日付が未確認なら空のままにします。
- 完成作品は `relatedWorks` に WORKS の `slug` を入れて関連付けます。

## 問い合わせ窓口（CONTACT）を編集する

CONTACTページ（`#/contact`）は `src/Contact.jsx`、見た目は `src/Contact.css` です。問い合わせ先の設定は `src/contactConfig.js` にまとめています。

- **メールアドレスを変更する**: `src/contactConfig.js` の `CONTACT_EMAIL` を書き換えます。CONTACTページ、WORKSのアプリ詳細、ABOUT、コピーボタンのすべてに反映されます。
- **件名を変更する**: アプリ用は `appSupportSubject`（`【アプリ名】お問い合わせ`）、制作活動・その他は `inquiries` の `subject` を編集します。
- **本文テンプレートを変更する**: `APP_SUPPORT_BODY` の配列を編集します。件名・本文は `encodeURIComponent` で自動的にURLエンコードされます。
- **問い合わせボタンが出るアプリ**: `src/data.js` の `works` で `status: '公開済み'` かつ `APP` / `GAME` の作品に自動で表示されます。公開を終えたアプリは `status` を変えるとボタンが消えます。

フォームや外部API・バックエンドは使わず、`mailto:` リンクとクリップボードへのコピーだけで動きます。メールアプリが設定されていない環境でも、アドレスをコピーして問い合わせられます。導線はヘッダーの CONTACT、全通常ページのフッター、HOME下部、WORKSの公開済みアプリ詳細、ABOUT にあります（SECRETには置いていません）。

## イラストを差し替える

CONTACT・JOURNAL・LAB・ABOUT に載せている絵は、すべて自作のイラストです（`src/photos.js` にまとめています）。歩くちびキャラは `src/Buddy.jsx`、スプライト画像は `public/media/art/buddy-sprite.webp` です。

1. 絵を長辺1000〜1400px前後の WebP に縮小して `public/media/art/` に置きます。元の大きな画像やPSDはサイトのフォルダに入れないでください。
2. `src/photos.js` の `src`・`width`・`height`・`alt`（絵の説明）・`caption`・`bg`（絵のまわりの余白の色）を書き換えます。
3. 版権キャラクターのファンアートを載せる場合は、その作品のファン活動ガイドラインを確認してください。

## 表紙・季節・イベントを編集する

- 表紙画像、キャプション、号数、発行年: `src/seasonal.js` の `magazine`
- 春夏秋冬の色・文言: `src/seasonal.js` の `seasons`
- お正月、エイプリルフール、ハロウィン、クリスマス: `src/seasonal.js` の `events` と `getEvent`
- SVGの見た目や配置: `src/SeasonShell.jsx`、`src/SeasonIllustrations.css`、`src/SeasonEdgePlacement.css`

季節は日本時間で自動判定されます。開発中だけ **SEASON PREVIEW** から全季節・イベントを切り替えられます。本番ビルドには表示されません。季節の動きを止めるボタンは本番でも表示されます。

## GitHub Pages へ公開する

1. GitHub 上で、このサイト専用のリポジトリを用意します。既存の別サイト用リポジトリは使わないでください。
2. `npm run build && npm run lint` を実行します。
3. GitHub にソースコードを push します。`.github/workflows/deploy-pages.yml` が `main` への push 時にビルド・公開します。
4. リポジトリの **Settings → Pages** で Source を **GitHub Actions** にします。
5. Actions の **Deploy to GitHub Pages** が成功したら、表示されたURLを確認します。

Vite は `base: '/hikacha-portfolio/'` とハッシュルーティングを使っているため、`https://syuriipu.github.io/hikacha-portfolio/` で、作品・記事・LABの詳細ページを再読み込みできます。

OGP画像・canonical・robots.txt・sitemap.xml は上記の公開URLに設定済みです。公開先を変更する場合は `index.html`、`public/robots.txt`、`public/sitemap.xml`、`public/site.webmanifest` を同時に更新してください。サイトマップには HOME と CONTACT（`#/contact`）を載せています。SECRET は通常のナビゲーション・サイトマップには追加せず、ブラウザで開いた時に `noindex,nofollow` を指定します。

## 困ったときの確認順

1. `npm run build` が成功するか確認します。
2. `npm run lint` の結果を確認します。
3. `npm run preview` で本番と同じ `dist/` を確認します。
4. 画像が出ない時は、`public/media/` のファイル名（大文字・小文字を含む）とデータの `media/...` パスを確認します。
5. 記事が出ない時は、Markdown のフロントマター、`slug` の重複、`draft: false`、公開日の有無を確認します。
6. GitHub Pagesでだけ画像が出ない時は、相対パスを `/media/...` ではなく `media/...` にしているか確認します。

## 公開前チェック

- [ ] 下書き・非公開メモ・個人情報をコミットしていない
- [ ] App Store / Google Play / GitHub などの外部リンクを実際に開いた
- [ ] CONTACTのメールリンクでメールアプリが開き、件名・本文が正しく入る／コピーボタンで「コピーしました」と表示される
- [ ] PC・タブレット・スマートフォンで主要ページを確認した
- [ ] `npm run build && npm run lint` が成功した
- [ ] GitHub Pages の公開URLで OGP画像・canonical を再確認した
