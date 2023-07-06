"use client";

import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motion";
import { SearchIcon } from "@heroicons/react/solid";
function Navbar_rec() {
  return (
    <div className="px-5 ">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`sm:px-16 px-6 py-8 relative`}
      >
        <div className="absolute w-[50%] inset-0 gradient-01" />
        <div className="flex-row flex-around mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <h1 className="text-white font-bold text-4xl pr-1">
                RECRUITERS
              </h1>
              <div className="hidden sm:flex border-2 border-gray-400 px-1 rounded-md items-center ">
                <input
                  type="text"
                  className="text-secondary-white p-1 mr-2 rounded-md focus:outline-none bg-transparent"
                  placeholder="start searching..."
                />
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className=" flex space-x-3 items-center">
                <h1 className="hidden lg:inline cursor-pointer text-sm text-violet-400 flex hover:underline hover:text-violet-500">
                  <a href="/recruitment">Find your new Career</a>
                </h1>
                <div>
                  <button className="hidden md:inline border-2 mr-2 text-xs md:text-sm text-black p-1 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-black transition transform duration-200 ease-out">
                    {" "}
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default Navbar_rec;
