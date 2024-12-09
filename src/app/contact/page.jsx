"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactHero from "@/images/andre-benz-unsplash.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main aria-labelledby="page-title">
      <div className="bg-[_255,_255,_255] relative w-full h-screen">
        <Image 
          src={ContactHero} 
          alt="Vibrant music festival crowd with colorful lights and energy" 
          aria-describedby="hero-description"
          layout="fill" 
          objectFit="cover" 
          priority={true} 
          className="z-0" 
        />
        
        <div id="hero-description" className="sr-only">
          Background image of a dynamic music festival scene representing the energy of Foo Fest
        </div>
 
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div 
            className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-xl"
            role="region"
            aria-labelledby="contact-form-title"
          >
            <div className="bg-red-800 text-white p-8 flex flex-col justify-center">
              <h2 id="contact-form-title" className="text-3xl font-bold mb-6">Get in touch!</h2>
              <div className="space-y-4">
                <div className="flex items-center" aria-label="Email Contact">
                  <Mail className="mr-4" size={24} aria-hidden="true" />
                  <p>contact@foofest.com</p>
                </div>
                <div className="flex items-center" aria-label="Phone Contact">
                  <Phone className="mr-4" size={24} aria-hidden="true" />
                  <p>(+45) 12345678</p>
                </div>
                <div className="flex items-center" aria-label="Location">
                  <MapPin className="mr-4" size={24} aria-hidden="true" />
                  <p>Guldbergsgade 29N, Music Land, CPH 54321</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                aria-labelledby="form-heading"
              >
                <h3 id="form-heading" className="sr-only">Contact Form</h3>
                <fieldset className="space-y-6">
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
                      aria-required="true"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                      aria-describedby="name-requirements"
                    />
                    <p id="name-requirements" className="sr-only">
                      Name is required. Please enter your full name.
                    </p>
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
                      aria-required="true"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                      aria-describedby="email-requirements"
                    />
                    <p id="email-requirements" className="sr-only">
                      Email is required. Please enter a valid email address.
                    </p>
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
                      aria-required="true"
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-black"
                      aria-describedby="message-requirements"
                    />
                    <p id="message-requirements" className="sr-only">
                      Message is required. Please enter your message.
                    </p>
                  </div>
                </fieldset>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-red-800 transition-colors"
                    aria-label="Send Contact Form"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;