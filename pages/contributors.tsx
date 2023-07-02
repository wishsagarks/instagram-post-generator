import React from "react";
import { Tilt } from "react-tilt";
import { Contributor, contributors } from "../contributors";
import Navbar from "@/components/Navbar";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Footer from "@/components/Footer";

interface ContributorCardProps {
  name: string;
  linkedin: string;
  github: string;
  image: string;
}

const ContributorCard = ({
  name,
  linkedin,
  github,
  image,
}: ContributorCardProps) => {
  return (
    <Tilt>
      <div className="h-fit w-full glassmorphism rounded-xl px-10 py-10 flex flex-col items-center gap-3">
        <img
          src={image}
          alt="contributor_image"
          className="h-auto w-48 rounded-xl"
        />
        <h2 className="font-medium capitalize">{name}</h2>
        <div className="flex flex-row gap-10">
          <a href={github} target="_blank">
            <BsGithub className="h-5 w-5" />
          </a>
          <a href={linkedin} target="_blank">
            <BsLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </Tilt>
  );
};

const Contributors = () => {
  return (
    <div className="h-fit min-h-screen">
      <Navbar activeLink="Contributors" />
      <div className="mt-20 flex flex-col items-center pb-10">
        <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
          Contributors
        </h1>
        <div className="flex flex-row gap-10 flex-wrap mt-10 ml-5">
          {contributors.map((c: Contributor) => (
            <div key={c.github} className="w-fit">
              <ContributorCard
                name={c.name}
                linkedin={c.linkedin}
                github={c.github}
                image={c.image}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Contributors;
