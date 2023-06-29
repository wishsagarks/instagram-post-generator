import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>WishCodes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="See how your post performs against Instagram algorithm and generate a better post with AI."
        />
        <meta property="og:site_name" content="Instagram-booster.vercel.app" />
        <meta
          property="og:description"
          content="See how your post performs against Instagram algorithm and generate a better post with AI."
        />
        <meta
          property="og:title"
          content="Instagram Post Booster with ChatGPT"
        />
        <meta name="Instagram:card" content="summary_large_image" />
        <meta
          name="Instagram:title"
          content="Real Instagram Algorithm Rank Validator"
        />
        <meta
          name="Instagram:description"
          content="See how your post performs against the official open-source Twitter algorithm."
        />
        <meta
          property="og:image"
          content="https://real-twitter-algorithm.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://real-twitter-algorithm.vercel.app/og-image.png"
        />
      </Head>

      <main className={`bg-[#333333] h-[100vh]`}>
          <div>
          <Hero />
          </div>
          <div className="flex flex-col gap-3 items-center">
          <span className="text-white py-10 md:text-7xl text-4xl md:max-w-full max-w-sm md:font-thin font-semibold text-center">Transforming your prompts</span>
          </div>
      </main>
    </>
  );
}
