import Gallery from './components/Gallery'

export default function App() {
  return (
    <main className="min-h-screen">
      {/* animated aurora background */}
      <div className="blob -left-20 -top-20 h-96 w-96 bg-[#6d5efc]" />
      <div className="blob -right-24 top-1/3 h-[28rem] w-[28rem] bg-[#ff5fa2]" style={{ animationDelay: '-6s' }} />
      <div className="blob bottom-0 left-1/4 h-80 w-80 bg-[#22d3ee]" style={{ animationDelay: '-12s' }} />

      <header className="animate-rise px-4 pb-10 pt-16 text-center sm:pt-24">
        <span className="glass t-mut inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em]">
          Curated visual stories
        </span>
        <h1 className="grad-text mt-6 text-6xl font-black tracking-tighter sm:text-8xl">Photo Gallery</h1>
        <p className="t-mut mx-auto mt-5 max-w-md text-base sm:text-lg">
          Explore photography from creators around the world. Search, browse and keep the ones you love.
        </p>
      </header>

      <Gallery />
    </main>
  )
}
