import React from "react";
import Head from "next/head";

import Hero from "@/components/Hero";
import FestivalApp from "@/components/FestivalApp";
import ParallaxAboutComponent from "@/components/ParallaxAboutComponent";
import FooFestPosterComp from "@/components/FooFestPosterComp";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Foo Fest | Home</title>
        <meta name="description" content="Welcome to Foo Fest 2025 - Your ultimate festival experience." />
      </Head>
      <Hero alt="Photo by Samu Lopez, from Unsplash FREE" />
      <ParallaxAboutComponent />
      <FooFestPosterComp />
    </div>
  );
}
