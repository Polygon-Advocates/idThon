"use client"
import Image from "next/image"
import { useState } from "react"
import bg from "@assets/spotify/bg.svg"
import NavbarSpotify from "@components/spotify/Navbar"
import Notification from "@components/spotify/Notification"
import PolygonIDVerifier from "@components/Polygon/PolygonIDVerifier"
import VcGatedDapp from "@components/Polygon/VcGatedDapp"

const Verify = () => {

  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center gap-4 z-[-9999]">
        <Image src={bg} alt="bg" width={1920} className="w-screen h-screen object-cover" />
      </div>
      <NavbarSpotify/>
      
      <div>
        { provedAccessBirthday? <VcGatedDapp /> : 
        <div className="w-full h-[800px] flex flex-col items-center justify-center gap-10">
          <div className="border-spotify-green rounded-xl border-2 p-5 px-8 gap-10 bg-spotify-green/40 pb-10 flex flex-col items-center justify-center">
          <h2 className="text-black font-semibold text-4xl">Verify you are a student</h2>
        <PolygonIDVerifier
          publicServerURL={
            process.env.REACT_APP_VERIFICATION_SERVER_PUBLIC_URL
          }
          localServerURL={
            process.env.REACT_APP_VERIFICATION_SERVER_LOCAL_HOST_URL
          }
          credentialType={"KYCAgeCredential"}
          issuerOrHowToLink={
            "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
          }
          onVerificationResult={setProvedAccessBirthday}
        /> 
        </div>
        </div>
        }
      </div>
      

    </>
  )
}

export default Verify