import React from "react";
import Hero from "@/components/Hero";
import ParallaxAboutComponent from "@/components/ParallaxAboutComponent";
import FooFestPosterComp from "@/components/FooFestPosterComp";

export const metadata = {
  title: "Foo Fest | Home",
  description: "Welcome to Foo Fest 2025 - Your ultimate festival experience.",
};

export default function Home() {
  return (
    <div className="">
      <Hero alt="Photo by Samu Lopez, from Unsplash FREE" />
      <ParallaxAboutComponent />
      <FooFestPosterComp />
    </div>
  );
}
