import Image from "next/image";
import logo from "@assets/spotify/logo1x1.svg";
import Link from "next/link";

const MainBody = () => {
  return (
    <div className="w-screen text-center mt-40 max-sm:mt-28 flex flex-col items-center">
      <h3 className="text-white text-6xl max-sm:text-4xl max-sm:px-8 font-bold mx-auto sm:w-[45rem] leading-tight">
        Verify you are a <span className="text-spotify-green"> College </span>,{" "}
        <span className="text-spotify-green">University</span> or{" "}
        <span className="text-spotify-green">School</span> Student
      </h3>
      <h4 className="text-2xl max-sm:text-lg max-sm:px-8 font-normal text-spotify-gray-light mt-8">
        {" "}
        Get Spotify Premium free for 1 month and after that for ₹59/month only{" "}
      </h4>
      <Link href="/musify/verify">
        <button className="bg-spotify-black py-4 gap-4 max-sm:py-2 rounded-lg flex flex-row items-center justify-center max-sm:mt-5 mt-10 px-6 transform transition-all duration-300 hover:-translate-y-1 hover:border-2 border-spotify-green ease-in-out w-fit">
          <Image src={logo} width={50} alt="" />
          <div className="">
            <div className="text-white text-2xl max-sm:text-xl font-normal">
              Premium
            </div>
            <div className="text-spotify-green text-left text-xs">Student</div>
          </div>
        </button>
      </Link>
      <h4 className="text-sm relative bottom-4 max-sm:text-base max-sm:px-8 font-normal text-white mt-8">
        {" "}
        Powered by polygon{" "}
        <span className="text-purple-500 font-semibold"> PolygonID </span>{" "}
      </h4>
      <h4 className="text-xs max-sm:text-xs max-sm:px-8 font-normal text-spotify-gray-light/70 mt-20 max-sm:mt-8">
        {" "}
        Offer available only to students at an accredited higher education
        institution. Offer not available to users who already tried Premium.
        Spotify Student Discount Offer Terms and conditions apply.{" "}
      </h4>
    </div>
  );
};

export default MainBody;
