"use client";

import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';
import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Heart, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { checkUserRole } from '../../utils/UserUtils';

const Navbar = () => {
  const { session } = useSession();
  const userRole = session ? checkUserRole(session) : null;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="container mx-auto px-6 py-9 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/next.svg" alt="Logo" width={100} height={100} />
        </div>
        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Product Categories</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Media</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
        </div>
        {/* Icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Dashboard Button for Admin */}
        {/* {userRole === 'admin' && ( */}
          <Link href={'/admin'}>
            <Button>DashBoard</Button>
          </Link>
        {/* // )} */}
        <SignedIn>
          <div className='ml-4'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </SignedIn>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Product Categories</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Projects</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Media</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">About Us</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Contact Us</a>
            <div className="flex justify-around py-3">
              <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
