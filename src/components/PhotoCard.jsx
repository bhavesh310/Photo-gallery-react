import { memo, useState } from 'react'

function PhotoCard({ photo, isFav, onToggle, index }) {
  const [loaded, setLoaded] = useState(false) // visual only: image fade-in

  return (
    <article
      className="card3d glass animate-rise group overflow-hidden rounded-3xl"
      style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {!loaded && <div className="skeleton absolute inset-0" />}
        <img
          src={`https://picsum.photos/id/${photo.id}/600/750`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-[900ms] group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-80 transition group-hover:opacity-100" />

        <button
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFav}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition hover:scale-110 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-90"
        >
          {isFav && <span key={`ping-${isFav}`} className="ring-ping absolute inset-0 rounded-full ring-2 ring-rose-400" />}
          <svg
            key={String(isFav)}
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${isFav ? 'animate-pop fill-rose-500 stroke-rose-500' : 'fill-none stroke-white'}`}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition duration-500 group-hover:translate-y-0">
          <p className="truncate text-lg font-bold text-white drop-shadow">{photo.author}</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Photo #{photo.id}</p>
        </div>
      </div>
    </article>
  )
}

export default memo(PhotoCard)
