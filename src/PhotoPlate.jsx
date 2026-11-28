import './PhotoPlate.css'

// 雑誌の扉写真のように、細い枠とキャプション・クレジット付きで写真やイラストを載せます。
// variant: band（横長の写真）/ portrait（縦長）/ art（絵をそのまま）/ gallery（絵を切らずに、まわりを背景色で埋める）
export default function PhotoPlate({ photo, variant = 'band', className = '' }) {
  return <figure className={`photo-plate photo-${variant} ${className}`}>
    <div className="photo-frame" style={photo.bg ? { '--frame-bg': `linear-gradient(${photo.bg[0]}, ${photo.bg[1]})`, '--frame-img': photo.blur === false ? 'none' : `url(${import.meta.env.BASE_URL}${photo.src})` } : undefined}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></div>
    <figcaption><span>{photo.caption}</span>{photo.url ? <a href={photo.url} target="_blank" rel="noreferrer">Photo: {photo.credit} / Unsplash</a> : <span>Illustration: {photo.credit}</span>}</figcaption>
  </figure>
}
