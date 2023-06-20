import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Post } from "@/components/Post";
import { Ranking} from "@/components/Ranking";
import { RankResponse } from "@/lib/linkedin-algorithm";

import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");

  useEffect(() => {
    const rankResponse: RankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Story":
        prompt = `Generate post using this prompt, based on ${post}.  You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. Positive boosts are:

- in each post add emoji
- 200 characters in sentence maximum
- Start each sentecnce from new line and ad numbers in first 2 lines
- add 3 hashtags which 2 are generic and one very specific (at the end) Tags relate to post theme
- add a question at the end of the post to start a discussion. Before the hashtags
- first two lines should be catchy
- Dont add links - links are not good.
- If post copied in the field contain some numbers keep them the same.

Add idea about which image or visual can be added at the end of the post (this text is not counted as part of post)
${post}
---
Generated post length must be more than 800-1200 characters
---
Between each line must be a space
---
Keep all mentions of people in there
---
Start the firs line from smth like: I did smth, In year, I do, Tired of, Sometimes it is just, A path toward, Because this is not,I've been struggling,  (change the begginign depends on the context )
---
Add emoji if it fits
---
It should be a story`;
        break;
      case "Crisp":
        prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated ${post} must follow these conditions and be short, crips and inspiring:
- Post length must be no more than 500 characters. 
- Each sentence length is less than 50 characters. 
- First sentences must start with smth like that : I've spent 5 months, 10 step plan, I made 10000 In, Last January, this January, I was on .. , I created 1000 of, how to get 1000 followers, how to do 1000 of, 10 lessons took me,  15 reasons, 5 days ago, 3 shocking steps, my strategy for  2023, over the past 10 years. (change numbers, generate always new numbers, generate always new beggining). Next sentences should not include numbers and these formulations.  
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, should not include numbers.
---
Each sentence from new line 
---
Add space between each abstract.
---
Show only generated post`;

        break;
      case "List":
        prompt = `Generate a post that is likely to be liked and reposted on LinkedIn, based on ${post}. Your post should follow these conditions:

Post length must be no more than one hundred characters.
Each sentence length is no more than two words.
Post is a list of things.
First sentence must start with one of the following: There are 2 types of, 1 big mistake to avoid, When you..., avoid..., 5 quick tips..., Most companies..., If you don't plan to... (replace the ellipsis with a number).
If the copied post contains numbers, keep them the same.
The next sentences should be generated and should not include numbers.`;

        break;
      case "Unpopular opinion":
        prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
        The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and create an unpopular opinion about the topic:
        - Post length must be less than 200 characters. 
        - Post must contain no more tha 3 sentences 
        - First sentence must start with: Unpopular opinion: 
        ---
        Add space between each abstract.`;
        break;
      case "Case Study":
        prompt = `Generate post using this prompt, based on ${post}. person insert You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and be fullfilling and rigorous and realate to post typed:
- Post must relate to what initially is inserted  
- Post length must be no more than 1000 characters. 
- Each sentence length is less than 200 characters. 
- First sentence of the must start with smth like that, or similar text to one: Pro-tip, These simeple expereiments, Here is one of my biggest learnings from this year, Inside, Being ... does not mean, Earlier this year , This might be the hottest (use similar words) 
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, and contain list, rigorous list, each list point start from emoji
---
Provide the idea for graphics, image, sceme which will fuel these case study post at the end in the brackets
---s
Add space between each abstract.`;
        break;
      default:
        prompt = `Default prompt for optimizing post`;
        break;
    }
    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();
    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let optimizedPost = "";
  
    const readResponse: () => Promise<void> = async () => {
      const { value, done } = await reader.read();
      if (done) {
        setOptimizedPost(optimizedPost);
        setLoading(false);
        return;
      }
  
      optimizedPost += decoder.decode(value);
      await readResponse();
    };
  
    await readResponse();
  };
  
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
        <meta
          property="og:site_name"
          content="Instagram-booster.vercel.app"
        />
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
       
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WishCodes</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

        <section className="py-10 lg:py-20">
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                  Instagram Post Generator 🚀
                </h1>
                <p className="mt-3 mb-10 text-center">
                  See how your post performs and generate a better one with AI. Time to go viral.
                </p>
                <div className="flex flex-col md:flex-row w-full md:space-x-20">
                  <div className="flex md:w-1/2 flex-col">
                    <h2 className="text-xl font-bold">Your Ranking</h2>
                    <div className="pt-1">
                      <Ranking ranking={ranking} />
                    </div>
                    <div className="w-full my-1 mx-auto">
                      <Post
                        post={post}
                        setPost={setPost}
                        media={media}
                        setMedia={setMedia}
                      />
                    </div>
                    <div className="flex mb-5 items-center space-x-3"></div>
                    <div className="block">
                      <DropDown vibe={vibe} setVibe={setVibe} />
                    </div>
                    <div className="my-4">
                      <button
                        disabled={loading}
                        onClick={optimizePost}
                        className="bg-blue-800 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                      >
                        {loading ? (
                          <LoadingDots color="white" style="large" />
                        ) : (
                          "Generate new post"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex md:w-1/2 md:flex-col">
                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      toastOptions={{ duration: 2000 }}
                    />
                    {optimizedPost && (
                      <div className="my-1">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                          <h2 className="text-xl font-bold">
                            Your Generated Post
                          </h2>
                        </div>
                        <div className="max-w-2xl my-4 mx-auto">
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(optimizedPost);
                              toast("Post copied to clipboard", {
                                icon: "📋",
                              });
                            }}
                            key={optimizedPost}
                          >
                            <p
                              className="text-black-700"
                              dangerouslySetInnerHTML={{ __html: optimizedPost }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-auto mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}
