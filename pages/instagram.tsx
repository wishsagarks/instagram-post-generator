import { useEffect, useState, useRef } from "react";
import { Post } from "@/components/Post";
import { Ranking } from "@/components/Ranking";
import { RankResponse } from "@/lib/linkedin-algorithm";
import handleInstagramPrompt from '../functions/insta'

import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/InstaDropDown";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Instagram() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("One-liner caption");

  useEffect(() => {
    const rankResponse: RankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handleInstagramPrompt(vibe, post);
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
      <main>
        <Navbar activeLink="Instagram"/>
        <section className="py-10 lg:py-20">
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                  Instagram Post Generator 🚀
                </h1>
                <p className="mt-3 mb-10 text-center">
                  See how your post performs and generate a better one with AI.
                  Time to go viral.
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
                              dangerouslySetInnerHTML={{
                                __html: optimizedPost,
                              }}
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
