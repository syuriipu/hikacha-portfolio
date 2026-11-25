// サイトに載せる中身はぜんぶここ。文章や作品を変えたいときはこのファイルだけ直せばOK。
// 画像・動画は public/media/ に置いて、"media/ファイル名" で指定する。

export const profile = {
  name: 'ひかちゃ',
  tagline: 'ゲームとアプリと、絵をつくっています。',
  about:
    '中学1年でスマホゲームを初めてストアに出してから、アプリ・ゲーム・イラスト・Live2Dを、企画から絵まで一人で通して作ってきました。いまは村の人間関係をシミュレーションするゲームを制作中です。',
  skills: [
    { label: 'Flutter', note: 'アプリ' },
    { label: 'Unity / C#', note: 'ゲーム' },
    { label: 'React', note: 'Web' },
    { label: 'イラスト', note: 'キャラ・背景' },
    { label: 'Live2D', note: 'モデリング' },
    { label: 'AI活用', note: 'LLM・開発支援' },
  ],
}

export const apps = [
  {
    title: 'ゆるすたでぃ',
    year: '2026 · 高校3年生で制作',
    image: null,
    icon: 'media/yurustudy-icon.webp', // 横長の画像がないときはアイコンを中央に表示
    gallery: [
      { src: 'media/apps/yurustudy-home.PNG', alt: '今日の学習目標と記録を表示するホーム画面', label: 'ホーム' },
      { src: 'media/apps/yurustudy-timer-choices.PNG', alt: 'フリーとポモドーロを選べるタイマー画面', label: 'タイマー選択' },
      { src: 'media/apps/yurustudy-pomodoro.PNG', alt: '25分のポモドーロタイマー画面', label: 'ポモドーロ' },
      { src: 'media/apps/yurustudy-records.PNG', alt: '学習時間を振り返る記録画面', label: '学習記録' },
      { src: 'media/apps/yurustudy-finish.PNG', alt: '今日の勉強をねぎらう完了画面', label: '完了画面' },
    ],
    lead: 'がんばりすぎない学習管理アプリ。',
    body: 'ポモドーロ／フリーの2種類のタイマーで勉強時間を記録し、今日・今週・月・累計で振り返れます。タスクごとの目標時間やテーマカラー、フレンド機能も。AIを本格的に開発に取り入れた最初の作品です。',
    tags: ['Flutter', 'AI活用', 'iOS', 'Android'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/jp/app/%E3%82%86%E3%82%8B%E3%81%99%E3%81%9F%E3%81%A7%E3%81%83/id6757830259' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.funeasysoft.yurusutadhi' },
      { label: 'プライバシーポリシー', url: 'https://syuriipu.github.io/yurustudy-privacy-policy/' },
    ],
  },
  {
    title: 'かわいいメモ帳',
    year: '2022 · 中学生',
    image: 'media/memo.webp',
    gallery: [
      { src: 'media/apps/memo-editor.png', alt: '手書き風フォントで機能を紹介するメモ画面', label: 'メモ画面' },
      { src: 'media/apps/memo-list.png', alt: '日付ごとのメモが並ぶ一覧画面', label: 'メモ一覧' },
      { src: 'media/apps/memo-search.png', alt: 'メモを検索している画面', label: '検索' },
      { src: 'media/apps/memo-themes.png', alt: 'ピンクや黒などのテーマを選ぶ画面', label: '着せ替え' },
    ],
    lead: '可愛くてシンプルなメモ帳。',
    body: '自分が欲しい機能を考えながら作った、Flutterで初めてのアプリ。着せ替え・フォント変更・パスワード・フォルダ分けに対応し、リリース後もアンドゥー／リドゥー、検索、バックアップと半年かけて機能を足しました。ミニLTで発表もしました。',
    tags: ['Flutter', 'iOS', 'Android', 'ミニLT登壇'],
    stat: 'Google Play 1,000+ DL',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.funeasysoft.memotyou&hl=ja' },
      { label: 'App Store', url: 'https://apps.apple.com/jp/app/%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84%E3%83%A1%E3%83%A2%E5%B8%B3/id1618169241' },
      { label: '公式サイト・サポート', url: 'https://syuriipu.github.io/hikatya-apps/kawaii-memo/' },
      { label: 'プライバシーポリシー', url: 'https://syuriipu.github.io/hikatya-apps/kawaii-memo/privacy.html' },
    ],
  },
  {
    title: 'おにぎりころころ',
    year: '2021 · 中学1年',
    image: 'media/onigiri.webp',
    lead: '雨の日も、晴れの日も、おにぎりは転がり続ける。',
    body: 'タップでジャンプして障害物をよける、はじめてストアに出したゲーム。ゲーム性よりも、見た目とアニメーションにこだわって作りました。',
    tags: ['ゲーム', 'iOS', 'イラスト'],
    links: [{ label: 'App Store', url: 'https://apps.apple.com/jp/app/%E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A%E3%81%93%E3%82%8D%E3%81%93%E3%82%8D/id1560535500' }],
  },
]

export const wip = {
  title: 'Colony of Hearts',
  status: '制作中',
  lead: '外敵のいない村が、住人どうしの人間関係だけで、静かに崩壊していくコロニーシム。',
  body: 'プレイヤーは神様ではなく住人のひとり。できるのは「話す」「噂を運ぶ」「ついていく」の3つだけ。',
  features: [
    { title: 'AIと自由に会話', text: '住人は自分の視点で知っていることだけを話し、打ち解けるほど本音を見せてくれる。' },
    { title: '噂と関係', text: '聞いた話を誰に伝えるかで、仲直りも決裂も起こせる。噂は村で勝手に広まり、庇った人が次の噂の的になることも。' },
    { title: 'ついていく', text: '誰かのそばで一日を過ごすと、他の住人と関わる場面に居合わせられる。構いすぎると、その子が自分に依存しはじめることも。' },
  ],
  tags: ['Unity', 'C#', 'ローカルLLM（Ollama）'],
  images: [
    { src: 'media/coh-village.webp', alt: '村を歩く住人たち（開発中の画面）' },
    { src: 'media/coh-talk.webp', alt: '住人との会話ウィンドウ（開発中のUI）' },
    { src: 'media/coh-forest.webp', alt: '森のエリア（開発中の画面）' },
  ],
}

export const live2d = [
  { video: 'media/boy', title: 'エル（人間の姿）', note: 'アプリ「エルといっしょ」用に制作 · イラスト＋モデリング' },
  { video: 'media/elle-live2d', title: 'エル', note: 'エルの普段の姿 · アプリ「エルといっしょ」用に制作 · イラスト＋モデリング' },
  { video: 'media/commission', title: '有償依頼', note: '依頼にて制作 · イラスト＋モデリング' },
  { video: 'media/maid', title: 'アプリ宣伝用キャラクター', note: '準備中 · イラスト＋モデリング' },
]

export const illustrations = [
  { src: 'media/autumn.webp', title: '秋の読書', wide: true },
  { src: 'media/fox.png', title: '縁日' },
  { src: 'media/elle.webp', title: 'エル — Campus Festival 2023' },
]

// 連絡先。載せたいものができたら { label: 'X', url: 'https://...' } のように足す
export const contacts = [
  { label: 'GitHub', url: 'https://github.com/syuriipu' },
]

// ABOUTページの内容。年表は確認できる出来事だけを置き、年月が不明なものは年齢の目安だけにしています。
export const aboutData = {
  profile: {
    name: 'ひかちゃ',
    intro: '大学生。アプリ開発、ゲーム制作、イラスト、Live2Dなど、興味の赴くままにいろいろなものを作っています。AIや新しい技術を活用しながら、自分のアイデアを形にすることを楽しんでいます。',
    editorialNote: 'なお、作りたいものが多すぎて時間が足りない模様。',
  },
  journey: [
    { era: '中学1年生', title: 'おにぎりころころを制作', note: 'はじめてストアに出したゲーム。', href: '#/works/onigiri-korokoro', image: 'media/onigiri.webp' },
    { era: '中学生', title: 'かわいいメモ帳を制作・公開', note: 'Flutterで作ったアプリ。', href: '#/works/kawaii-memo', image: 'media/memo.webp' },
    { era: '制作アーカイブ', title: 'エルといっしょを制作', note: 'ChatGPT APIとLive2Dを使ったアプリ。', href: '#/lab/elle-and-you', image: 'media/elle-and-you-icon.png' },
    { era: '高校3年生', title: 'ゆるすたでぃを制作', note: 'がんばりすぎない学習管理アプリ。', href: '#/works/yurustudy', image: 'media/yurustudy-icon.webp' },
    { era: '大学入学後', title: '個人開発とゲーム制作を継続', note: 'アプリ、ゲーム、イラストを行き来しながら制作中。' },
    { era: '現在', title: 'アイデアの庭を育て中', note: 'Colony of Heartsと休日予定アプリを制作・企画中。', href: '#/lab', image: 'media/coh-village.webp' },
  ],
  toolbox: [
    { group: 'アプリ開発', tools: ['Flutter', 'Firebase'] },
    { group: 'ゲーム制作', tools: ['Unity'] },
    { group: 'キャラクター制作', tools: ['Live2D'] },
    { group: 'AI活用', tools: ['ChatGPT', 'Codex'] },
    { group: 'Web制作', tools: ['React', 'Vite'] },
  ],
}

// WORKS一覧・詳細ページ・HOMEで共有する作品カタログ。
// 作品を増やすと、カテゴリ件数とランダム紹介にも自動で反映されます。
export const works = [
  ...apps.map((app, index) => ({
    ...app,
    slug: ['yurustudy', 'kawaii-memo', 'onigiri-korokoro'][index],
    category: index === 2 ? 'GAME' : 'APP',
    yearNumber: [2026, 2022, 2021][index],
    status: '公開済み',
    accent: ['#9aaf9b', '#d6a6b6', '#d8b66f'][index],
    wash: ['#e4ece0', '#f3e5e9', '#f4edd8'][index],
    order: index,
  })),
  ...live2d.map((model, index) => ({
    ...model,
    slug: ['original-character', 'elle-live2d', 'live2d-commission', 'app-character'][index],
    category: 'LIVE2D',
    image: `${model.video}.jpg`,
    gallery: [{ src: `${model.video}.jpg`, alt: model.title, label: model.title }],
    lead: model.note,
    tags: ['イラスト', 'Live2Dモデリング'],
    status: model.note.startsWith('準備中') ? '準備中' : undefined,
    accent: ['#8fa3b1', '#b3a2bd', '#c7a28d', '#9ca98d'][index],
    wash: ['#e2e9e9', '#ece6ed', '#f0e5dd', '#e7ede2'][index],
    order: 10 + index,
  })),
  ...illustrations.map((art, index) => ({
    ...art,
    slug: ['autumn-reading', 'festival-fox', 'elle-campus-festival'][index],
    category: 'ART',
    image: art.src,
    gallery: [{ src: art.src, alt: art.title, label: art.title }],
    lead: 'イラスト作品。',
    tags: ['イラスト'],
    accent: ['#b5a37c', '#a0a6ce', '#c78fa3'][index],
    wash: ['#eee9dc', '#e6e7f1', '#f2e5e9'][index],
    order: 20 + index,
  })),
]

// LAB・HOMEで共有するプロジェクト台帳。visibility が public 以外のものは公開ページに出しません。
// milestones は確認できる節目だけを追加し、日付が未確定なら date を空のままにします。
export const projects = [
  {
    id: 'holiday-planner',
    slug: 'holiday-planner',
    title: '休日予定アプリ（仮）',
    stage: 'SPROUT',
    visibility: 'public',
    description: '休日を、待ち遠しい日に。',
    concept: 'ユーザーの趣味や好みに合わせて休日の過ごし方やお出かけ先を提案し、平日のうちから休日を楽しみにできるようにするアプリ。',
    latestActivity: 'アンケート・インタビュー、コンセプトの整理。',
    nextStep: 'MVPの検討。',
    technologies: [],
    images: [],
    milestones: [],
    relatedWorks: [],
    relatedArticles: ['holiday-planner'],
    accentColor: '#9cab83',
  },
  {
    id: 'colony-of-hearts',
    slug: 'colony-of-hearts',
    title: wip.title,
    stage: 'GROWING',
    visibility: 'public',
    description: wip.lead,
    concept: wip.body,
    features: wip.features,
    latestActivity: '',
    nextStep: '',
    technologies: wip.tags,
    images: wip.images,
    milestones: [],
    relatedWorks: [],
    relatedArticles: ['colony-of-hearts'],
    accentColor: '#718da0',
  },
  {
    id: 'breakfast-gacha',
    slug: 'breakfast-gacha',
    title: '朝食ガチャ',
    stage: 'SEED',
    visibility: 'public',
    description: '今日の朝ごはんを、ガチャ感覚で決められるアプリのアイデア。',
    concept: '朝食を考える面倒さを減らすための、小さなアイデア。',
    technologies: [],
    images: [],
    milestones: [],
    relatedWorks: [],
    relatedArticles: [],
    accentColor: '#d3ad63',
  },
  {
    id: 'menu-by-taste',
    slug: 'menu-by-taste',
    title: '好みに合わせた献立アプリ',
    stage: 'SEED',
    visibility: 'public',
    description: '好きな料理や食材の傾向から、自分に合いそうな献立を提案するアプリのアイデア。',
    concept: '好みから、今日の献立との出会いをつくるためのアイデア。',
    technologies: [],
    images: [],
    milestones: [],
    relatedWorks: [],
    relatedArticles: [],
    accentColor: '#c79885',
  },
  {
    id: 'elle-and-you',
    slug: 'elle-and-you',
    title: 'エルといっしょ',
    stage: 'ARCHIVED',
    visibility: 'public',
    specimenNumber: 'No. 001',
    category: 'アプリ',
    status: '公開終了',
    description: 'ChatGPTのAPIとLive2Dを使用し、キャラクターとの会話を楽しめる、以前App Storeで公開していたアプリ。',
    concept: '過去の創作活動を大切に保存する、標本室の最初の記録。',
    technologies: ['ChatGPT API', 'Live2D'],
    images: [
      { src: 'media/elle-and-you-icon.png', alt: 'エルといっしょのアプリアイコン', group: 'app' },
      { src: 'media/elle-and-you-banner.png', alt: 'エルといっしょのキャラクタービジュアル', group: 'app' },
      { src: 'media/boy.jpg', alt: 'エルの人間の姿として制作したLive2Dモデル', group: 'character' },
      { src: 'media/elle-live2d.jpg', alt: 'エルの普段の姿として制作したLive2Dモデル', group: 'character' },
      { src: 'media/elle-animal-concept.png', alt: '当時作る予定だったケモノバージョンのエル（下書き）', caption: '当時作る予定だったケモノバージョンのエル。', group: 'sketch', sketch: true },
    ],
    milestones: [],
    relatedWorks: ['original-character', 'elle-live2d', 'elle-campus-festival'],
    relatedArticles: [],
    accentColor: '#b58fa0',
  },
]
