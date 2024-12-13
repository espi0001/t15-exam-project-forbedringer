import React from "react";
import Link from "next/link";
const ContactInformation = ({ icon, link, linktext }) => {
  return (
    <div className="flex gap-4 items-center md:items-start">
      {/* Klon elementet for at tilføje yderligere klasser eller ændringer */}
      {React.cloneElement(icon, { className: "mb-2 h-6 w-6 text-black_color" })}
      {/* <Mail className="mb-2 h-6 w-6 text-black_color" /> */}
      <Link href={link} className="text-gray-700 text-step_p">
        {linktext}
      </Link>
    </div>
  );
};

export default ContactInformation;
