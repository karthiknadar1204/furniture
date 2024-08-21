import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-black py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-1 sm:col-span-1 md:col-span-1 relative">
          <h3 className="text-sm font-bold mb-4">Address</h3>
          <p className="text-sm">123 Main St</p>
          <p className="text-sm">City, Country</p>
          <p className="text-sm">Postal Code</p>
          <hr className="absolute h-full left-1/2 top-0 transform -translate-x-1/2 bg-gray-300 bg-opacity-50 w-0.5" />
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 relative">
          <h3 className="text-sm font-bold mb-4">Resources</h3>
          <ul>
            <li><a href="#" className="block text-sm py-1">Privacy Policy</a></li>
            <li><a href="#" className="block text-sm py-1">Terms and Conditions</a></li>
            <li><a href="#" className="block text-sm py-1">Refund and Return Policy</a></li>
            <li><a href="#" className="block text-sm py-1">Shipping Policy</a></li>
            <li><a href="#" className="block text-sm py-1">Warrant Policy</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 relative">
          <h3 className="text-sm font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" className="block text-sm py-1">Shop</a></li>
            <li><a href="#" className="block text-sm py-1">Blog</a></li>
            <li><a href="#" className="block text-sm py-1">Order Tracking</a></li>
            <li><a href="#" className="block text-sm py-1">Contact us</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 relative">
          <h3 className="text-sm font-bold mb-4">Need Help</h3>
          <ul>
            <li><a href="#" className="block text-sm py-1">Link 11</a></li>
            <li><a href="#" className="block text-sm py-1">Link 12</a></li>
            <li><a href="#" className="block text-sm py-1">Link 13</a></li>
            <li><a href="#" className="block text-sm py-1">Link 14</a></li>
            <li><a href="#" className="block text-sm py-1">Link 15</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between px-4 ml-10">
        <div className="flex items-center">
          <Image src={'/logo.jpeg'} alt="Logo" width={100} height={100}/>
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="hidden md:flex space-x-2">
          <Link href="#" className="text-sm py-1 px-2 bg-opacity-50">Shop</Link>
          <hr className="border-l border-gray-300 bg-opacity-50 h-4 my-auto" />
          <Link href="#" className="text-sm py-1 px-2 bg-opacity-50">Blog</Link>
          <hr className="border-l border-gray-300 bg-opacity-50 h-4 my-auto" />
          <Link href="#" className="text-sm py-1 px-2 bg-opacity-50">Order Tracking</Link>
          <hr className="border-l border-gray-300 bg-opacity-50 h-4 my-auto" />
          <Link href="#" className="text-sm py-1 px-2 bg-opacity-50">Contact us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
