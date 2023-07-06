"use client"
import { useState } from "react"

const Notification = () => {

  const [view, setView] = useState(true);

  return (
    view && <div className="w-screen relative bg-spotify-green text-center text-white text-sm flex items-center justify-center">
        <h2 className="max-sm:hidden py-2"> Verify you are a student with new polygonID verification and get exclusive discounts on Spotify Premium!  </h2>
        <h2 className="sm:hidden px-10 py-2"> Get Spotify Student Premium, Verify with polygonID! </h2>
        <div onClick={()=>{setView(prev=>!prev)}} className="hover:scale-110 hover:text-spotify-black cursor-pointer absolute right-4 transform -translate-y-1/2 top-1/2">x</div>
    </div>
  )
}

export default Notification