"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactHero from "@/images/andre-benz-unsplash.jpg";

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
    <div className="relative text-gray-700">
 
      <div className="relative h-[300px] w-full">
        <Image
          src={ContactHero}
          alt="Vibrant music festival crowd with colorful lights and energy"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 z-10 bg-black/50"></div>
      </div>


      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          <div className="text-center">
            <h1 className="text-5xl font-black text-black mb-4">Contact us</h1>
            <p className="text-xl text-gray-700">
              We’re here to help.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
            <div className="space-y-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <Mail className="mb-2 h-6 w-6 text-black" />
                <p className="text-gray-700">contact@foofest.com</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <Phone className="mb-2 h-6 w-6 text-black" />
                <p className="text-gray-700">(+45) 12345678</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <MapPin className="mb-2 h-6 w-6 text-black" />
                <p className="text-gray-700">
                  Refshaleøen, CPH S
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-red-800 transition-colors"
              >
                Send message!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
