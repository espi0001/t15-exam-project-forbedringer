"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactHero from "@/images/jodie-walton-unsplash-1.avif";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="">
      <HeaderBillede billede={ContactHero} />

      <section className="mx-[20px] lg:mx-[64px] p-6 ">
        <Card className="w-full max-w-6xl mx-auto mb-10">
          <HeaderText h1="Contact us" text="We’re here to help." />
          {/* grid grid-cols-1 md:grid-cols-2 gap-8 */}
          <div className="flex justify-center">
            {/* <article className="space-y-6 text-center md:text-left">
              <ContactInformation icon={<Mail />} link="mailto:contact@foofest.com" linktext="contact@foofest.com" />
              <ContactInformation icon={<Phone />} link="tel:+1234567890" linktext="(+45) 12345678" />
              <ContactInformation icon={<MapPin />} link="#" linktext="Refshaleøen, CPH S" />
            </article> */}

            <form onSubmit={handleSubmit} className="space-y-6 w-[560px]">
              <div>
                <Label htmlFor="name">Full name</Label> {/* Label for navn */}
                <Input id="name" name="name" placeholder="Jane Foo" required className="mt-1 placeholder:text-grey_color" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Full name</Label> {/* Label for navn */}
                <Input
                  id="email"
                  name="email"
                  placeholder="janefoo@email.com"
                  required
                  className="mt-1 placeholder:text-grey_color"
                  value={formData.email} // Kontrolleret værdi
                  onChange={handleChange} // Opdater formData
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label> {/* Label for navn */}
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md bg-transparent border border-input shadow-sm px-3 py-1 text-black_color"
                  value={formData.message} // Kontrolleret værdi
                  onChange={handleChange} // Opdater formData
                />
              </div>
              <Button type="submit" size="lg" alt="Button to click to subscribe with chosen email" variant="footer" className="w-full focus:ring-2 focus:ring-black-500">
                Submit
              </Button>
            </form>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Contact;
