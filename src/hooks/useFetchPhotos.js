import { useEffect, useState } from 'react'

const URL = 'https://picsum.photos/v2/list?limit=30'

// Fetches 30 photos on mount. Returns { photos, loading, error }.
// On failure, `error` holds a message and `photos` stays empty.
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        setPhotos(await res.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort() // cleanup if component unmounts mid-request
  }, [])

  return { photos, loading, error }
}
