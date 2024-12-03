'use client'
import Image from "next/image";
import React from 'react';
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import { Radio, Flag, MapPin } from 'lucide-react';
import AboutHeroImage from '../images/gabriel-benois-unsplash.jpg';
const aboutPage = () => {
    return ( 
    <main className="relative">
      <Image
        src={AboutHeroImage}
        alt="Hero background for about-page, by Gabriel Benois"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <Nav />
      <div className="min-h-screen text-gray-300 py-12 px-4 relative z-10"> 
        <div className="max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden mt-60">
          <div className="text-center p-8 bg-black/80">
            <h1 className="text-5xl font-black text-white mb-4">
              FOO FEST
            </h1>
            <p className="text-xl text-gray-300">
              Where music transcends boundaries
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 p-8 bg-black/80">
            <div className="text-center">
              <Radio className="mx-auto h-16 w-16 text-white" />
              <h3 className="mt-4 text-xl font-bold text-white">Sound Waves</h3>
              <p className="text-gray-300">
                Curated musical journeys across genres
              </p>
            </div>

            <div className="text-center">
              <Flag className="mx-auto h-16 w-16 text-white" />
              <h3 className="mt-4 text-xl font-bold text-white">Experience</h3>
              <p className="text-gray-300">
                Immersive festival landscape and community
              </p>
            </div>

            <div className="text-center">
              <MapPin className="mx-auto h-16 w-16 text-white" />
              <h3 className="mt-4 text-xl font-bold text-white">Location</h3>
              <p className="text-gray-300">
                Epic venue bridging urban and natural spaces
              </p>
            </div>
          </div>
          <div className="p-8 bg-black/80">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Origin</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2018, Foo Fest emerged from a collective passion for transformative musical experiences.
            </p>
            <p className="text-gray-300">
              We craft moments that resonate beyond the festival grounds.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-30"> 
        <Footer />
      </div>
    </main>
    );
}

export default aboutPage;
