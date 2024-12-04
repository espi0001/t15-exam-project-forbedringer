import Link from "next/link";

const NavigationLink = ({ href, text }) => {
  return (
    <Link href={href} className="text-white relative group">
      {text}
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default NavigationLink;
