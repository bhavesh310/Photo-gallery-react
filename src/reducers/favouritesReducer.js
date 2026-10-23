const STORAGE_KEY = 'gallery:favourites'

export const ACTIONS = { TOGGLE: 'TOGGLE_FAVOURITE' }

// Lazy initialiser: reads persisted ids once, safely.
export function initFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function saveFavourites(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable — ignore */
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}
