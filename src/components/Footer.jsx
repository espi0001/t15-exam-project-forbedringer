"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/foo-fest-logo.webp";
import NavigationLink from "./NavigationLink";
import { Button } from "./ui/Button";

const Footer = () => {
  return (
    //   mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px]
    <footer className="mx-[20px] lg:mx-[64px] py-[64px] flex flex-col lg:flex-row justify-between items-center gap-[40px]">
      <section className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <Image src={Logo} width={35} alt="logo" />
          <h4 className="text-white text-xl m-5 font-semibold">FOO FEST</h4>
        </div>

        <ul className="flex flex-wrap gap-4 justify-center">
          <li>
            <NavigationLink href={"/Tickets"} text={"Lineup"} />
          </li>
          <li>
            <NavigationLink href={"/lineup"} text={"Line-up"} />
          </li>
          <li>
            <NavigationLink href={"/about"} text={"About"} />
          </li>
          <li>
            <NavigationLink href={"/contact"} text={"Contact"} />
          </li>
        </ul>
      </section>

      <hr className="w-full border-t border-gray-300 my-4 lg:hidden" />

      <section id="Footer" className="flex flex-col items-center">
        <h6 className="mb-4 text-center">Subscribe to be the first to know!</h6>
        <form className="flex gap-4 w-full ">
          <input type="email" placeholder="Enter your email..." alt="Email entering form-field" className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300" />
          <Button type="submit" size="lg" alt="Button to click to subscribe with chosen email" variant="secondary" className="focus:ring-2 focus:ring-gray-500">
            Subscribe
          </Button>
        </form>
      </section>
    </footer>
  );
};

export default Footer;
