"use client";
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";

// Custom hook for intersection observer
function useInView(options = { threshold: 0.1 }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { ...options }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, inView];
}

const ParallaxAboutComponent = () => {
  const [textRef1, isText1InView] = useInView();
  const [buttonRef1, isButton1InView] = useInView();
  const [textRef2, isText2InView] = useInView();
  const [buttonRef2, isButton2InView] = useInView();

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 min-h-screen p-5 md:p-10 bg-gradient-to-b from-custom-start to-custom-end">
      <div className="md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 p-5 md:p-8 flex flex-col justify-start">
        <p 
          ref={textRef1}
          className={`mt-10 text-2xl md:text-6xl mb-6 font-bold transition-all duration-1000 
            ${isText1InView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'}`}
        >
          Be the first to know about announcements, music, events, partners and a lot more at Foo Fest 2025.
        </p>
        <Link 
          href="/about" 
          ref={buttonRef1}
          className={`self-start transition-all duration-1000 delay-200
            ${isButton1InView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'}`}
        >
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-800 hover:text-white transition-colors">
            Read more
          </button>
        </Link>
      </div>
      <div className="md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-5 p-5 md:p-8 flex flex-col justify-end items-end text-right">
        <p 
          ref={textRef2}
          className={`text-2xl md:text-6xl mb-6 font-bold mt-10 md:mt-20 transition-all duration-1000 
            ${isText2InView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'}`}
        >
          Customize your tickets, tents and festival experience now.
        </p>
        <Link 
          href="/tickets" 
          ref={buttonRef2}
          className={`self-end transition-all duration-1000 delay-200
            ${isButton2InView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'}`}
        >
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-800 hover:text-white transition-colors">
            Buy tickets
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ParallaxAboutComponent;