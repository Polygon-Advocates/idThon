import Image from "next/image"
import bg from "@assets/spotify/bg.svg"
import NavbarSpotify from "@components/spotify/Navbar"
import Notification from "@components/spotify/Notification"
import MainBody from "@components/spotify/MainBody"

const Spotify = () => {
  return (
    <>
      <Notification/>
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center gap-4 z-[-9999]">
        <Image src={bg} alt="bg" width={1920} className="w-screen h-screen object-cover" />
      </div>
      <NavbarSpotify/>
      <MainBody/>
    </>
  )
}

export default Spotify