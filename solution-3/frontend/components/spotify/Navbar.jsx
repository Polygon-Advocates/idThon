import Image from "next/image"
import logoFull from "@assets/spotify/logoFullM.png"
import profile from '@assets/spotify/profile.svg'
import Link from "next/link"

const NavbarSpotify = () => {
  return (
    <nav className=' bg-spotify-black h-20 text-white flex flex-row px-8 items-center justify-between'>
        <Link href="/spotify"><Image src={logoFull} width={300} height={300} alt="logo" className="w-36 max-sm:w-24 cursor-pointer" /></Link>
        <ul className="flex flex-row gap-10 text-lg max-sm:hidden">
            <li className="cursor-pointer mt-1 transform hover:scale-105 hover:text-spotify-green transition-all duration-300 ease-in-out ">Premium</li>
            <li className="cursor-pointer mt-1 transform hover:scale-105 hover:text-spotify-green transition-all duration-300 ease-in-out ">Support</li>
            <li className="cursor-pointer mt-1 transform hover:scale-105 hover:text-spotify-green transition-all duration-300 ease-in-out ">Download</li>
            <li className="w-[2px] h-8 bg-white"></li>
            <li className="flex flex-row gap-4 justify-center items-center cursor-pointer">
                <div><Image src={profile} alt="" width={40} /></div>
                <div className="transform hover:scale-105 hover:text-spotify-green transition-all duration-300 ease-in-out ">Profile</div>
                
            </li>
        </ul>
    </nav>
  )
}

export default NavbarSpotify