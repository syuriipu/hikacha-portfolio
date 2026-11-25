# JOURNAL記事テンプレート

このフォルダ直下の公開記事と、ローカル専用の `drafts/` 内の記事は `npm run dev` で確認できます。`npm run build` では `draft: true` の記事を読まず、公開ファイルにも含めません。`drafts/` はGit管理対象外なので、公開したくない本文は必ずこちらに置いてください。

```md
---
title: 記事タイトル
slug: url-slug
description: 一覧に表示する短い概要
date: 2026-11-24
updatedAt: 2026-11-25
category: 開発
tags: [Unity, 制作日記]
cover: media/example.webp
featured: false
draft: true
relatedWorks: [yurustudy]
relatedProjects: [colony-of-hearts]
---

## 見出し

本文
```

本文はMarkdownとして安全に表示されます。HTMLやスクリプトは実行されません。
