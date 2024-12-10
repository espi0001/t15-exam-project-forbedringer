import Link from "next/link";

const ParallaxAboutComponent = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 min-h-screen p-5 md:p-10 bg-gradient-to-b from-custom-start to-custom-end">
      <div className="md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 p-5 md:p-8 flex flex-col justify-start">
        <p className="mt-10 text-2xl md:text-6xl mb-6 font-bold">
          Be the first to know about announcements, music, events, partners and a lot more at Foo Fest 2025.
        </p>
        <Link href="/about" className="self-start">
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-800 hover:text-white transition-colors">
            Read more
          </button>
        </Link>
      </div>
      <div className="md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-5 p-5 md:p-8 flex flex-col justify-end items-end text-right">
        <p className="text-2xl md:text-6xl mb-6 font-bold mt-10 md:mt-20">
          Customize your tickets, tents and festival experience now.  
        </p>
        <Link href="/tickets" className="self-end">
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-800 hover:text-white transition-colors">
            Buy tickets
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ParallaxAboutComponent;
