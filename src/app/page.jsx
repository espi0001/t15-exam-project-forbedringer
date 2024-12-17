import Image from "next/image";
import React from "react";

import Hero from "@/components/Hero";
import FestivalApp from "@/components/FestivalApp";
import ParallaxAboutComponent from "@/components/ParallaxAboutComponent";
import FooFestPosterComp from "@/components/FooFestPosterComp";

export default function Home() {
  return (
    <div className="">
      <Hero alt="Photo by Samu Lopez, from Unsplash FREE" />
      <ParallaxAboutComponent />
      <FooFestPosterComp />
    </div>
  );
}
