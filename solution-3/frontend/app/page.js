import Link from "next/link"
import Spotify from "@app/musify/page"

export default function Home() {
  return (
    <main>
      {/* <div className="w-screen min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 flex items-center justify-center gap-4">
        <Link href="/recruitment"><button className="w-52 text-2xl font-bold bg-blue-400/30 rounded-xl px-4 py-2 hover:bg-blue-600/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">Recruitment</button></Link>
        <Link href="/spotify"><button className="w-52 text-2xl font-bold bg-blue-400/30 rounded-xl px-4 py-2 hover:bg-green-500/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">Spotify</button></Link>
      </div> */}
      <Spotify/>
    </main>
  )
}
