// サイトに載せている自作イラスト。差し替えるときは public/media/art/ に画像（長辺1000〜1400px前後のWebP）を置き、ここを書き換えます。
// bg は絵のまわりの余白の色（上→下のグラデーション）。余白には絵をぼかしたものも重なります（背景が単色の絵は blur: false で単色だけに）。
export const photos = {
  contact: {
    src: 'media/art/angel-pink.webp', width: 900, height: 1200,
    alt: '花びらが舞う中、ピンクのドレスで振り返る天使の女の子',
    caption: 'ILLUSTRATION',
    credit: 'hikacha', bg: ['#fff8f8', '#efc0d5'],
  },
  journal: {
    src: 'media/art/angel-apples.webp', width: 1400, height: 979,
    alt: 'リンゴを手に持ち、リンゴのかごを抱えた、輪と羽のある天使',
    caption: 'ILLUSTRATION',
    credit: 'hikacha', bg: ['#e5dce7', '#cbc0db'],
  },
  lab: {
    src: 'media/art/sketch-elle-maid.webp', width: 979, height: 1100,
    alt: '角のあるメイド姿のエルが、大きな鎌を振りかぶるらくがき',
    caption: 'SKETCH — エル',
    credit: 'hikacha', bg: ['#e9fff7', '#e9fff7'], blur: false,
  },
  standing: {
    src: 'media/art/standing.webp', width: 688, height: 1500,
    alt: '袴姿で刀を背負い、棒付きキャンディを持って笑う葛城の立ち絵',
    caption: '葛城',
    credit: 'hikacha',
  },
}
