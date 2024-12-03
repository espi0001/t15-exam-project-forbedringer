import Image from "next/image";
import React from 'react';
import Nav from './components/Nav';
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="">
      <Nav />
      <Hero alt="Photo by Samu Lopez, from Unsplash FREE" />
      <Footer />
    </main>
  );
}
