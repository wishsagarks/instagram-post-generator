import React from "react";

const FAQ = () => {
  return (
    <div className="flex items-center justify-center h-screen mt-28">
      <div className="bg-white">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="mt-4 mb-8 text-gray-600">
            Instagram Post Generator FAQs
          </p>
          <div className="space-y-2 items-center grid md:grid-cols-3 grid-cols-1 gap-10 max-w-5xl">
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                How does the Instagram Post Generator work?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                The Instagram Post Generator utilizes AI technology to generate
                engaging Instagram post ideas based on your input.
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                Can I customize the generated Instagram posts?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                Yes, you can customize the generated Instagram posts by adding
                your own text, modifying the visuals, and adjusting other
                elements to suit your brand.
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                How does the Instagram Post Generator work?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                The Instagram Post Generator utilizes AI technology to generate
                engaging Instagram post ideas based on your input.
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                Can I use the generated posts for commercial purposes?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                Yes, you are free to use the generated Instagram posts for your
                commercial purposes, such as promoting your products or services
                on Instagram.{" "}
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                How does the Instagram Post Generator work?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                The Instagram Post Generator utilizes AI technology to generate
                engaging Instagram post ideas based on your input.
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                Are there any limitations on the number of posts I can generate?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                There are no limitations on the number of posts you can
                generate. You can create as many Instagram posts as you need to
                enhance your online presence.{" "}
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                Can I schedule the generated posts to be published at a specific
                time?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                The Instagram Post Generator focuses on generating post ideas.
                You can use scheduling tools or Instagram's built-in scheduling
                features to plan and publish the posts at your desired time.{" "}
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                How can I optimize the generated posts for better engagement?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                To optimize your Instagram posts for better engagement, consider
                using relevant hashtags, compelling captions, high-quality
                visuals, and engaging storytelling techniques.
              </p>
            </details>
            <details className="w-full rounded-lg ring-2 ring-purple-600">
              <summary className="px-4 py-6">
                What if I encounter any issues or have additional questions?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
                If you encounter any issues or have further questions, please
                reach out to me through the provided contact information{" "}
              </p>{" "}
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
