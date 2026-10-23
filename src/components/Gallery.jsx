import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { ACTIONS, favouritesReducer, initFavourites, saveFavourites } from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites)

  // persist favourites on every change
  useEffect(() => saveFavourites(favourites), [favourites])

  // useCallback: stable function identity, so memoised cards don't re-render needlessly
  const handleSearch = useCallback((e) => setQuery(e.target.value), [])
  const handleToggle = useCallback((id) => dispatch({ type: ACTIONS.TOGGLE, id }), [])

  // useMemo: filter re-runs only when photos/query change, not on heart toggles
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? photos.filter((p) => p.author.toLowerCase().includes(q)) : photos
  }, [photos, query])

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="bar -mx-1 mb-8 flex items-center gap-3 py-3">
        <label className="search glass flex flex-1 items-center gap-3 rounded-full px-5 py-3.5">
          <svg className="h-5 w-5 shrink-0" style={{ stroke: 'var(--mut)' }} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search" value={query} onChange={handleSearch}
            placeholder="Search by author name…" aria-label="Search photos by author"
            className="w-full bg-transparent outline-none placeholder:text-[color:var(--mut)]"
          />
        </label>
        <div className="glass flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold" aria-live="polite">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-rose-500 stroke-rose-500" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
          <span key={favourites.length} className="animate-pop inline-block">{favourites.length}</span>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-6 py-32" role="status">
          <div className="orbit" />
          <p className="t-mut tracking-widest">LOADING PHOTOS…</p>
        </div>
      )}

      {error && (
        <div role="alert" className="glass animate-rise mx-auto max-w-md rounded-3xl p-8 text-center">
          <p className="text-lg font-bold text-rose-500">Couldn’t load photos</p>
          <p className="t-mut mt-2 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        filtered.length === 0 ? (
          <p className="t-mut animate-rise py-24 text-center text-lg">No photographers match “{query}”.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((photo, i) => (
              <PhotoCard key={photo.id} photo={photo} index={i}
                isFav={favourites.includes(photo.id)} onToggle={handleToggle} />
            ))}
          </div>
        )
      )}
    </section>
  )
}
