"use client"

import React, { useState } from 'react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDetails = { name, email, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Email sent successfully:', data);
        setStatus('Email sent successfully');
      } else {
        console.error('Error sending email:', data);
        setStatus('Error sending email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error submitting form');
    }

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start p-6">
      {/* Left Content */}
      <div className="max-w-lg lg:mr-8 mb-8 lg:mb-0">
        {/* Showroom and Store */}
        <div className="text-3xl font-bold mb-4">Showroom and Store</div>

        {/* Thanking you text */}
        <p className="mb-4">
          Thank you for visiting our showroom and store. We appreciate your interest in our products.
        </p>

        {/* Opening Hours */}
        <div className="mb-4">
          <p className="font-bold">Opening Hours</p>
          <p>Monday - Friday: 11:00 am - 7:30 pm</p>
        </div>

        {/* Address and Showroom */}
        <div className="flex flex-wrap mb-4">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <p className="font-bold">Address</p>
            <p>123 Main Street</p>
            <p>City, State ZIP</p>
            <p>Country</p>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-bold">Showroom</p>
            <p>456 Side Avenue</p>
            <p>City, State ZIP</p>
            <p>Country</p>
          </div>
        </div>

        {/* Additional Contact Details */}
        <div className="flex flex-wrap mb-4">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <p className="font-bold">Contact</p>
            <p>Toll-Free: 1-800-123-4567</p>
            <p>Email: contact@example.com</p>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-bold">Landline</p>
            <p>+1 234 567890</p>
            <p>Head of Sales: +1 987 654321</p>
          </div>
        </div>
      </div>

      {/* Right Content - Contact Form */}
      <div className="max-w-lg border-2 border-gray-700 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Get in Touch</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 lg:pr-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <div className="w-full lg:w-1/2 lg:pl-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
