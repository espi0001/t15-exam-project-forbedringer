"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/foo-fest-isometric-black-logo.svg";
import NavigationLink from "./NavigationLink";
import { Button } from "./ui/Button";

const Footer = () => {
  return (
    //   mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px]
    <footer className="mx-[20px] lg:mx-[64px] py-[64px] flex flex-col justify-between gap-[10px] font-medium">
      <section className="flex lg:flex-col justify-between ml-48 mb-12">
        <div className="flex items-center gap-1">
          <Image src={Logo} width={65} alt="logo" />
          {/* <h4 className="text-white text-xl m-5 font-semibold">FOO FEST</h4> */}
          <h6 className="mb-4 text-[5rem] font-bold ml-8">Be the first to know!</h6>
        </div>
        <form className="flex gap-4 w-full">
          <input type="email" placeholder="Enter your email..." alt="Email entering form-field" className="w-1/4 px-4 py-2 rounded-full border border-black text-black focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300" />
          <Button type="submit" size="xl" alt="Button to click to subscribe with chosen email" variant="footer" className="focus:ring-2 focus:ring-black-500">
            Subscribe
          </Button>
        </form>
      </section>

      <hr className="w-full border-t border-gray-300 my-4" />

      <section id="Footer" className="flex justify-between text-[1rem]">
        <p className="text-[1rem]">© 2024 Foo Fest</p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavigationLink href={"/Tickets"} text={"Tickets"} />
          </li>
          <li>
            <NavigationLink href={"/lineup"} text={"Lineup"} />
          </li>
          <li>
            <NavigationLink href={"/about"} text={"About"} />
          </li>
          <li>
            <NavigationLink href={"/contact"} text={"Contact"} />
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
