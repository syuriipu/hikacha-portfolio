// サイトで使っている写真（Unsplash License・無料素材）と自作イラスト。差し替えるときは public/media/photos/ に画像を置き、ここを書き換えます。
// 元データは大きいので、長辺2000px前後のWebPに縮小してから置いてください。
export const photos = {
  contact: {
    src: 'media/photos/contact-stationery.webp', width: 2000, height: 833,
    alt: 'セージグリーンの机に、白い便箋と黄色い封筒、シダの葉と小花が並んでいる',
    caption: 'WRITING DESK — 便箋を一枚、選ぶところから。',
    credit: 'micheile henderson', url: 'https://unsplash.com/photos/a-group-of-objects-on-a-surface-8DkO_U8iB2o',
  },
  journal: {
    src: 'media/photos/journal-letters.webp', width: 2000, height: 833,
    alt: '古い本の上に、切手とリボンで束ねた手紙、花びらとユーカリの葉が置かれている',
    caption: 'LETTERS & RECORDS — 記録は、未来の自分への手紙。',
    credit: 'Olga Shashkina', url: 'https://unsplash.com/photos/a-close-up-of-an-envelope-with-flowers-on-it-jjwL6YjIo94',
  },
  lab: {
    src: 'media/photos/lab-blank-notebook.webp', width: 2000, height: 833,
    alt: '木のテーブルに置かれた白紙のスケッチブックとペン',
    caption: 'A BLANK PAGE — 白紙のページに、最初の種をまく。',
    credit: 'Kelly Sikkema', url: 'https://unsplash.com/photos/a-notepad-pen-and-cup-of-coffee-on-a-wooden-table-Lo6OIm82gTs',
  },
  // ここから下は自分で描いたイラスト（url を空にすると「Illustration: 〜」と表示されます）
  standing: {
    src: 'media/art/standing.webp', width: 688, height: 1500,
    alt: '袴姿で刀を背負い、棒付きキャンディを持って笑うキャラクターの立ち絵',
    caption: 'ORIGINAL CHARACTER',
    credit: 'hikacha', url: '',
  },
}
