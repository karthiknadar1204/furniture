"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Heart, ShoppingCart, Search } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';
import { checkUserRole } from '@/utils/UserUtils';

const predefinedCategories = [
  { id: 1, name: 'Bedroom', subcategories: [{ id: 1, name: 'Wardrobe' }, { id: 2, name: 'BedsideTable' }, { id: 3, name: 'Bed' }, { id: 4, name: 'Dresser' }, { id: 5, name: 'Mattress' }] },
  { id: 2, name: 'LivingRoom', subcategories: [{ id: 6, name: 'Sofa' }, { id: 7, name: 'Sofacumbed' }, { id: 8, name: 'Multi-utility Cabinet' }, { id: 9, name: 'Center Table' }, { id: 10, name: 'Bookshelf' }] },
  { id: 3, name: 'Dining', subcategories: [{ id: 11, name: 'Kitchen Cabinet' }, { id: 12, name: 'Dining Table' }] },
  { id: 4, name: 'Office', subcategories: [{ id: 13, name: 'Office Table' }, { id: 14, name: 'Office Chair' }, { id: 15, name: 'Study Table' }, { id: 16, name: 'Bookshelf' }, { id: 17, name: 'Filing Cabinet' }] },
];

const Navbar = () => {
  const { session } = useSession();
  console.log("Session object:", session); 
  const userRole = checkUserRole(session);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full z-10 relative">
      <div className="container mx-auto px-6 py-9 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src="/next.svg" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
                Product Categories <ChevronDown className="ml-1" />
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {predefinedCategories.map(category => (
                  <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger>
                      {category.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {category.subcategories.map(subcategory => (
                          <DropdownMenuItem key={subcategory.id}>
                            <Link href={`/category/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}/${category.id}/${subcategory.id}`}>
                              {subcategory.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Media</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          <UserButton />
          {userRole === 'org:admin' && (
            <Link href={'/admin'}>
              <Button>DashBoard</Button>
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">
                  Product Categories <ChevronDown className="ml-1" />
                </a>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuGroup className='mr-48 mt-1'>
                  {predefinedCategories.map(category => (
                    <DropdownMenuSub key={category.id}>
                      <DropdownMenuSubTrigger>
                        {category.name}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-full">
                          {category.subcategories.map(subcategory => (
                            <DropdownMenuItem key={subcategory.id}>
                              <Link href={`/category/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}/${category.id}/${subcategory.id}`}>
                                {subcategory.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Projects</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Media</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">About Us</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Contact Us</Link>
            <div className="flex justify-around py-3">
              <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <UserButton />
              {userRole === 'org:admin' && (
                <Link href={'/admin'}>
                  <Button>DashBoard</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
