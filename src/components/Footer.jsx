"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/images/foo-fest-isometric-black-logo.svg";
import WhiteLogo from "@/images/foo-fest-isometric-white-logo.svg";
import FooterNavigationLink from "./FooterNavigationLinks";
import { Button } from "./ui/button";

const Footer = () => {
  const pathname = usePathname();
  const isIndexPage = pathname === "/";

  return (
    <footer
      className={`
      w-full px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16
      flex flex-col gap-8 
      font-medium 
      ${isIndexPage ? "text-black_color bg-white_color" : "text-white_color bg-black_color"}
    `}
    >
      <section className="flex flex-col lg:flex-row justify-between lg:items-start gap-8">
        <div className="flex flex-col items-center lg:items-start gap-4 lg:mr-8">
          {/* Conditionally render the logo */}
          <Image src={isIndexPage ? Logo : WhiteLogo} width={65} alt="logo" />
          <h6
            className={`
            text-[2rem] sm:text-[3rem] lg:text-[5rem] font-bold text-center lg:text-left
            ${isIndexPage ? "text-black_color" : "text-white_color"}
          `}
          >
            Be the first to know!
          </h6>
        </div>
        <form className="flex flex-col lg:flex-row gap-4 items-center lg:items-start w-full lg:w-auto lg:mt-28">
          <input
            type="email"
            placeholder="Enter your email..."
            alt="Email entering form-field"
            className={`
              w-full sm:w-2/3 lg:w-[300px] px-4 py-2 rounded-full border 
              ${isIndexPage ? "border-black_color text-black_color focus:ring-grey_color" : "border-white_color text-white_color focus:ring-grey_color"}
              focus:outline-none focus:ring-2 transition-all duration-300
            `}
          />
          <Button
            type="submit"
            size="xl"
            alt="Button to click to subscribe with chosen email"
            variant="footer_sort"
            className={`
              px-6 py-2 rounded-full
              ${isIndexPage ? "focus:ring-black-500" : "focus:ring-white-500"}
            `}
          >
            Subscribe
          </Button>
        </form>
      </section>
      <hr className={`w-full border-t ${isIndexPage ? "border-light_grey_color" : "border-grey_color"}`} />
      <section id="Footer" className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 text-center sm:text-left">
        <p className="text-sm sm:text-base">© 2024 Foo Fest</p>
        <ul className="flex flex-wrap justify-center sm:justify-start gap-4">
          {[
            { href: "/tickets", text: "Tickets" },
            { href: "/lineup", text: "Lineup" },
            { href: "/about", text: "About" },
            { href: "/contact", text: "Contact" },
          ].map(({ href, text }) => (
            <li key={href}>
              <FooterNavigationLink
                href={href}
                text={text}
                className={`
          ${isIndexPage ? "text-black_color hover:text-grey_color" : "text-white_color hover:text-grey_color"}
          transition-colors duration-300
        `}
              />
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
