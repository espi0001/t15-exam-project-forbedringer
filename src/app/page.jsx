import Image from "next/image";
import React from 'react';
import Nav from './components/Nav';
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="">
      <Nav />
      <Hero alt="Photo by Gabriel Benois, from Unsplash FREE" />
    </main>
  );
}
