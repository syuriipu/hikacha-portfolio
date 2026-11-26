import './PhotoPlate.css'

// 雑誌の扉写真のように、細い枠とキャプション・クレジット付きで写真を載せます。
export default function PhotoPlate({ photo, variant = 'band', className = '' }) {
  return <figure className={`photo-plate photo-${variant} ${className}`}>
    <div className="photo-frame"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></div>
    <figcaption><span>{photo.caption}</span><a href={photo.url} target="_blank" rel="noreferrer">Photo: {photo.credit} / Unsplash</a></figcaption>
  </figure>
}
