"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

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
  // py-py_default px-[20px] lg:px-[64px]
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 min-h-screen px-[20px] lg:px-[64px] bg-gradient-to-b from-custom-start to-custom-end">
      <div className="text-white md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 px-0 py-0 md:py-4 flex flex-col justify-center gap-3">
        <h2
          ref={textRef1}
          className={`text-3xl md:text-6xl font-bold leading-tight transition-all duration-1000
${isText1InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Customize your tickets, tents and festival experience now.
        </h2>
        <Link
          href="/tickets"
          ref={buttonRef1}
          className={`self-start transition-all duration-1000 delay-200
${isButton1InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button variant="forsiden" size="lg" className="mt-4">
            Buy tickets
          </Button>
        </Link>
      </div>
      <div className="text-white md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-5 px-0 py-0 md:py-4 flex flex-col justify-center items-end text-right gap-3">
        <h2
          ref={textRef2}
          className={`text-3xl md:text-6xl font-bold leading-tight transition-all duration-1000
${isText2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Learn about music, events and a lot more at Foo Fest 2025.
        </h2>
        <Link
          href="/about"
          ref={buttonRef2}
          className={`self-end transition-all duration-1000 delay-200
${isButton2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button variant="forsiden" size="lg" className="mt-4 mb-10">
            Read more
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ParallaxAboutComponent;
