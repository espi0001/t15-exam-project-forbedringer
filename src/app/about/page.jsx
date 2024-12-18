"use client";
import Link from "next/link";
import React, { useState, memo } from "react";
import { Radio, Flag, MapPin, ChevronDown, ChevronUp, Music, Calendar, Globe, CreditCard, Shield } from "lucide-react";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";
import ContactHero from "@/images/dominic-hampton-unsplash.avif";
import Head from "next/head";

const FAQItem = memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-less_black_color: py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <span className="text-step_text_large font-semibold text-black_color">{question}</span>
        {isOpen ? <ChevronUp className="text-black_color" /> : <ChevronDown className="text-black_color" />}
      </button>
      {isOpen && <p className="mt-4 text-black_color">{answer}</p>}
    </div>
  );
});

FAQItem.displayName = "FAQItem";

const AboutPage = () => {
  const faqItems = [
    {
      question: "What is Foo Fest?",
      answer: "Foo Fest is an immersive music festival celebrating diverse genres and creating transformative experiences that connect artists and audiences.",
    },
    {
      question: "When and Where?",
      answer: "Our annual festival takes place in late summer, bridging urban and natural landscapes to create a unique musical journey.",
    },
    {
      question: "Ticket Information",
      answer: "We offer various ticket tiers, including early bird, standard, VIP, and group packages. Tickets go on sale six months before the event.",
    },
    {
      question: "What to Expect",
      answer: "Multiple stages, cutting-edge sound systems, art installations, local food vendors, and a community-driven atmosphere that goes beyond traditional music festivals.",
    },
  ];

  return (
    <div className="">
      <Head>
        <title>Foo Fest | About</title>
        <meta name="description" content="Learn more about Foo Fest, its mission, and its story." />
      </Head>
      {/* Hero Image Section */}
      <HeaderBillede billede={ContactHero} />

      <section className="mx-mx_default lg:mx-mx_lg py-py_default lg:py-py_lg">
        <HeaderText h1="FOO FEST" text="FAQ, story & where to find us!" />
        <div className="flex flex-col lg:flex-row gap-6 mb-[40px] lg:mb-[80px]">
          <article>
            <h2 className="text-center lg:text-start mb-4 text-black_color">Our Origin</h2>
            <p>Founded in 2018, Foo Fest emerged from a collective passion for transformative musical experiences. We craft moments that resonate beyond the festival grounds.</p>
            <br />
            <p>Through captivating performances, immersive installations, and a vibrant community, Foo Fest creates an unforgettable atmosphere for music lovers of all ages.</p>
            <p>Each year, we bring together an eclectic mix of global artists, cutting-edge technology, and sustainable practices to deliver a festival experience that redefines boundaries.</p>
            <br />
            <p>At Foo Fest, it’s not just about the music — it’s about creating memories, fostering connections, and celebrating creativity in all its forms.</p>
            {/* <p className="">Whether you're dancing under the stars, exploring interactive art, or simply soaking in the vibe, Foo Fest is a journey that stays with you long after the last note fades.</p> */}
          </article>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8995.02701944774!2d12.608297727198243!3d55.69321666128957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465252d6a56b2f2b%3A0xcaa2e01fe561b055!2sRefshale%C3%B8en%2C%20Copenhagen!5e0!3m2!1sen!2sdk!4v1734337472155!5m2!1sen!2sdk" width="1000" height="450" style={{ border: 0 }} loading="lazy" className="max-w-full"></iframe>
        </div>

        <div className="max-w-4xl mx-auto mb-[40px] lg:mb-[80px]">
          <h3 className="font-bold mb-6 text-black_color text-center">Frequently Asked Questions</h3>
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {[
            { icon: Music, title: "Lineup", desc: "World-class artists across multiple genres", link: "/lineup" },
            { icon: Calendar, title: "Schedule", desc: "Detailed performance schedule released monthly", link: "/schedule" },
            { icon: Globe, title: "Sustainability", desc: "Committed to eco-friendly festival practices", link: "#" },
            { icon: CreditCard, title: "Payments", desc: "Secure online transactions and flexible options", link: "#" },
            { icon: Shield, title: "Safety", desc: "Comprehensive security and medical support", link: "#" },
          ].map((info, index) => (
            <div key={index} className="text-center hover:scale-105 transition-transform">
              <Link className="block" href={info.link}>
                <info.icon className="mx-auto h-12 w-12 text-black_color mb-4" />
                <h3 className="text-xl font-bold text-black_color mb-2">{info.title}</h3>
                <p className="text-step_text_regular text-black_color">{info.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
