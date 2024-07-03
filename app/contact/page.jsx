"use client";

import React, { useState } from "react";

const ContactPage = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, subject, message });
    // Clear form fields after submission if needed
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="flex justify-center items-start p-6">
      {/* Left Content */}
      <div className="max-w-lg mr-8">
        {/* Showroom and Store */}
        <div className="text-3xl font-bold mb-4">Showroom and Store</div>

        {/* Thanking you text */}
        <p className="mb-4">
          Thank you for visiting our showroom and store. We appreciate your
          interest in our products.
        </p>

        {/* Opening Hours */}
        <div className="mb-4">
          <p className="font-bold">Opening Hours</p>
          <p>Monday - Friday: 11:00 am - 7:30 pm</p>
        </div>

        {/* Address and Showroom */}
        <div className="flex mb-4">
          <div className="w-1/2">
            <p className="font-bold">Address</p>
            <p>123 Main Street</p>
            <p>City, State ZIP</p>
            <p>Country</p>
          </div>
          <div className="w-1/2">
            <p className="font-bold">Showroom</p>
            <p>456 Side Avenue</p>
            <p>City, State ZIP</p>
            <p>Country</p>
          </div>
        </div>

        {/* Additional Contact Details */}

        <div className="flex mb-4">
          <div className="w-1/2">
            <p className="font-bold">Contact</p>
            <p>oll-Free: 1-800-123-4567</p>
          </div>
          <div className="w-1/2">
            <p className="font-bold">LandLine</p>
            <p>+1 234 567890</p>
          </div>
        </div>
      </div>

      {/* Right Content - Contact Form */}
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Get in Touch</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Your Email"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={handleSubjectChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Subject of your message"
              required
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
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              rows="4"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-black text-white w-full px-6 py-3 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
