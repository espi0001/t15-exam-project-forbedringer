"use client";
import React, { useState } from "react";
import Head from "next/head";
import ContactHero from "@/images/jodie-walton-unsplash-1.avif";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
      <Head>
        <title>Foo Fest | Contact</title>
        <meta name="description" content="Get in touch with Foo Fest for any inquiries or support." />
      </Head>

      <HeaderBillede billede={ContactHero} />
      <section className="mx-mx_default lg:mx-mx_lg py-py_default lg:py-py_lg">
        <Card className="w-full max-w-6xl mx-auto mb-10">
          <HeaderText h1="Contact us" text="We’re here to help." />
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="space-y-6 w-[560px]">
              <div>
                <Label htmlFor="name">Full name</Label> {/* Label for navn */}
                <Input id="name" name="name" placeholder="Jane Foo" required className="mt-1 placeholder:text-less_black_color" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label> {/* Label for email */}
                <Input
                  id="email"
                  name="email"
                  placeholder="janefoo@email.com"
                  required
                  className="mt-1 placeholder:text-black_color"
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
