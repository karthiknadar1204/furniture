"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';
import { checkUserRole } from '@/utils/UserUtils';
import { Architects_Daughter } from 'next/font/google';

const architectsDaughter = Architects_Daughter({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const predefinedCategories = [
  { id: 1, name: 'Bedroom', subcategories: [{ id: 1, name: 'Wardrobe' }, { id: 2, name: 'BedsideTable' }, { id: 3, name: 'Bed' }, { id: 4, name: 'Dresser' }, { id: 5, name: 'Mattress' }] },
  { id: 2, name: 'LivingRoom', subcategories: [{ id: 6, name: 'Sofa' }, { id: 7, name: 'Sofacumbed' }, { id: 8, name: 'Multi-utility Cabinet' }, { id: 9, name: 'Center Table' }, { id: 10, name: 'Bookshelf' }] },
  { id: 3, name: 'Dining', subcategories: [{ id: 11, name: 'Kitchen Cabinet' }, { id: 12, name: 'Dining Table' }] },
  { id: 4, name: 'Office', subcategories: [{ id: 13, name: 'Office Table' }, { id: 14, name: 'Office Chair' }, { id: 15, name: 'Study Table' }, { id: 16, name: 'Bookshelf' }, { id: 17, name: 'Filing Cabinet' }] },
];

const Navbar = () => {
  const { session } = useSession();
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
            <Image src="/logo.jpeg" alt="Logo" width={80} height={80} className='rounded-full' />
          </Link>
          <div className="ml-6">
            <div className={`text-3xl font-bold ${architectsDaughter.className}`}>URBAN FURNITURE</div>
            <div className="text-sm font-bold ml-2 w-84 font-serif">EXCLUSIVE INDIAN FURNITURE</div>
          </div>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="font-medium text-black font-bold">Home</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a href="#" className="flex items-center font-medium text-black font-bold">
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
          <a href="#" className="font-medium text-black font-bold">Projects</a>
          <a href="#" className="font-medium text-black font-bold">Media</a>
          <a href="#" className="font-medium text-black font-bold">About Us</a>
          <Link href="/contact" className="font-medium text-black font-bold">Contact Us</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
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
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">
                  Product Categories <ChevronDown className="ml-1" />
                </a>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuGroup className="mr-48 mt-1">
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
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">Projects</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">Media</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">About Us</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-black font-bold">Contact Us</Link>
            <div className="flex justify-between items-center py-3">
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
