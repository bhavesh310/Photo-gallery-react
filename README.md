# Photo Gallery — React Photo Gallery

React + Vite + Tailwind CSS v4. No UI libraries.

## Run
    npm install
    npm run dev

## Structure
- src/hooks/useFetchPhotos.js — custom hook returning { photos, loading, error }
- src/reducers/favouritesReducer.js — useReducer logic + localStorage helpers
- src/components/Gallery.jsx — uses the hook, useReducer, useCallback, useMemo
- src/components/PhotoCard.jsx — card UI
