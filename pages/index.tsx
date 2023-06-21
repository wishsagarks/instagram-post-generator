import Head from "next/head";
import Header from '@/components/Header'
import FAQ from "@/components/FAQ";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram Post Generator</title>
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

      <main>
        <div>
          <Header />
          <Feature />
          <FAQ />
        </div>
      </main>
    </>
  );
}
