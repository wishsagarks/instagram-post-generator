import React, { useEffect, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { motion } from "framer-motion";
import {
  BsArrowRight,
  BsArrowUpRight,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <Parallax pages={4}>
        <ParallaxLayer
          offset={0}
          speed={0.8}
          className="bg-yellow-200 flex md:flex-row flex-col items-center px-10 relative justify-between"
        >
          <ul className="absolute z-30 top-0 rounded-full mt-7 flex font-semibold text-gray-600 justify-center md:gap-10 gap-5 py-3 md:text-md text-xs">
            <li
              className="cursor-pointer md:font-medium font-regular"
              onClick={() => {
                router.push("/faq");
              }}
            >
              FAQs
            </li>
            <li
              className="cursor-pointer md:font-medium font-regular"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              Pricing
            </li>
            <li
              className="cursor-pointer md:font-medium font-regular md:block hidden"
              onClick={() => {
                router.push("/contributors");
              }}
            >
              Contributors
            </li>
            <li
              className="cursor-pointer md:font-medium font-regular"
              onClick={() => {
                router.push("/linkedin");
              }}
            >
              Get Started
            </li>
          </ul>
          <div className="flex flex-col md:gap-10 gap-24 md:mt-0 mt-32 md:items-start items-center">
            <div className="flex flex-row items-center gap-2 rounded-full px-3 py-1 md:text-sm text-xs leading-6 text-gray-800 ring-1 ring-gray-900/10 hover:ring-gray-900/20 w-fit cursor-pointer">
              Read the Latest Updates
              <BsArrowRight />
            </div>
            <div className="flex flex-col gap-3 md:text-start text-center">
              <h1 className="md:text-7xl text-3xl font-bold text-[#18241a]">WishCodes</h1>
              <span className="md:text-xl text-xs text-gray-900 ml-2">
                Changing the way you write your content
              </span>
            </div>
            <button className="w-fit px-5 py-2 bg-green-950 text-slate-100 drop-shadow-md md:text-xl text-xs">
              Find Out How
            </button>
          </div>
          <Image
            src="./photo1.jpg"
            alt="lp-photo"
            className="md:w-1/2 w-96 h-auto rounded-full drop-shadow-xl md:mb-0 mb-20"
          />
          <motion.img
            animate={{
              rotate: -360, // Rotate 360 degrees
            }}
            transition={{
              duration: 25, // Rotation duration in seconds
              repeat: Infinity,
              ease: "linear", // Linear easing
            }}
            src="./circle.svg"
            alt="circle"
            className="w-64 md:w-1/2 h-auto absolute md:right-10 md:top-14 bottom-14"
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.6}
          className="flex items-center justify-center text-5xl flex-col gap-10 md:bg-transparent bg-insta-bg md:px-0 px-5"
        >
          <Image
            src="./insta-bg.png"
            alt="stories"
            className="absolute -z-10 md:w-full md:h-[95vh] hidden md:block"
          />
          <h2 className="text-slate-950 md:text-slate-3 font-semibold glassmorphism px-5 py-5 md:text-5xl text-3xl text-center ">
            Into well-scripted Stories
          </h2>
          <button
            className="text-sm w-fit px-5 bg-slate-200 py-4 hover:bg-slate-50 drop-shadow-md"
            onClick={() => {
              router.push("/stories");
            }}
          >
            <div className="flex items-center justify-center gap-2">
              Create a Story
              <BsArrowUpRight />
            </div>
          </button>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={0.5}
          className=" flex items-center justify-between text-5xl bg-blue-900 px-10 h-fit "
        >
          <div className="flex flex-col gap-10">
            <BsLinkedin className="text-slate-200" />
            <h2 className="text-slate-200 max-w-xl font-semibold md:text-6xl text-3xl">
              Into optimized LinkedIn posts
            </h2>
            <button
              className="text-sm w-fit px-3 bg-slate-200 py-2 hover:bg-slate-50"
              onClick={() => {
                router.push("/linkedin");
              }}
            >
              <div className="flex gap-1 items-center text-left">
                Generate a LinkedIn Post
                <BsArrowUpRight />
              </div>
            </button>
          </div>
          <Image src="./linkedin.jpg" alt="linkedin" className="h-[120vh] md:block hidden" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={3}
          speed={0.02}
          className=" flex items-center justify-center text-5xl md:bg-[#9f4bff]"
        >
          <Image
            src="./insta1.jpg"
            alt="instagram"
            className="h-[100vh] absolute -left-28 top-0 -z-10 md:block hidden"
          />
          <div className="flex flex-col items-center gap-10 px-5">
            <BsInstagram className="text-slate-50" />
            <h2 className="text-center text-slate-50 max-w-xl font-semibold glassmorphism px-5 py-3 md:text-5xl text-xl">
              Into catchy Instagram captions and music recommendations
            </h2>
            <button
              onClick={() => {
                router.push("/instagram");
              }}
            >
              <div className="text-sm flex flex-row items-center gap-2 drop-shadow-md w-fit px-5 py-2 hover:bg-slate-50 bg-slate-200 text-left">
                Generate an Instagram Post
                <BsArrowUpRight />
              </div>
            </button>
          </div>
          <Image
            src="./insta2.jpg"
            alt="instagram"
            className="h-[100vh] absolute -right-20 bottom-0 -z-10 md:block hidden"
          />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Hero;
