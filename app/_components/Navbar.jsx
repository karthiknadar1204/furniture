// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import { Menu, X, Heart, ShoppingCart, Search } from 'lucide-react';
// import { ArrowDown } from 'lucide-react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// // const predefinedCategories = [
// //   { id: 1, name: 'Bedroom', subcategories: ['Wardrobe', 'Bed-side Table', 'Bed', 'Dresser', 'Mattress'] },
// //   { id: 2, name: 'Living Room', subcategories: ['Sofa', 'Sofa-cum-bed', 'Multi-utility Cabinet', 'Center Table', 'Bookshelf'] },
// //   { id: 3, name: 'Dining', subcategories: ['Kitchen Cabinet', 'Dining Table'] },
// //   { id: 4, name: 'Office', subcategories: ['Office Table', 'Office Chair', 'Study Table', 'Bookshelf', 'Filing Cabinet'] },
// // ];

// const predefinedCategories = [
//   { id: 1, name: 'Bedroom', subcategories: [{ id: 1, name: 'Wardrobe' }, { id: 2, name: 'Bed-side Table' }, { id: 3, name: 'Bed' }, { id: 4, name: 'Dresser' }, { id: 5, name: 'Mattress' }] },
//   { id: 2, name: 'Living Room', subcategories: [{ id: 6, name: 'Sofa' }, { id: 7, name: 'Sofa-cum-bed' }, { id: 8, name: 'Multi-utility Cabinet' }, { id: 9, name: 'Center Table' }, { id: 10, name: 'Bookshelf' }] },
//   { id: 3, name: 'Dining', subcategories: [{ id: 11, name: 'Kitchen Cabinet' }, { id: 12, name: 'Dining Table' }] },
//   { id: 4, name: 'Office', subcategories: [{ id: 13, name: 'Office Table' }, { id: 14, name: 'Office Chair' }, { id: 15, name: 'Study Table' }, { id: 16, name: 'Bookshelf' }, { id: 17, name: 'Filing Cabinet' }] },
// ];


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-white shadow-md w-full z-10">
//       <div className="container mx-auto px-6 py-9 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Image src="/next.svg" alt="Logo" width={100} height={100} />
//         </div>
//         {/* Menu Links */}
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <a href='#'>Product Categories  <ArrowDown /></a>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuGroup>
//                 {predefinedCategories.map(category => (
//                   <DropdownMenuSub key={category.id}>
//                     <DropdownMenuSubTrigger>
//                       {category.name}
//                     </DropdownMenuSubTrigger>
//                     <DropdownMenuPortal>
//                       <DropdownMenuSubContent>
//                         {category.subcategories.map(subcategory => (
//                           <DropdownMenuItem key={subcategory}>
//                             <Link href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}/${category.id}`}>
//                               {subcategory}
//                             </Link>
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuSubContent>
//                     </DropdownMenuPortal>
//                   </DropdownMenuSub>
//                 ))}
//               </DropdownMenuGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800">Media</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
//         </div>
//         {/* Icons */}
//         <div className="hidden md:flex space-x-4 items-center">
//           <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//           <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//           <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//         </div>
//         {/* Hamburger Icon */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//         {/* Dashboard Button for Admin */}
//         <Link href={'/admin'}>
//           <Button>DashBoard</Button>
//         </Link>
//       </div>
//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Home</a>
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Product Categories</a>
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Projects</a>
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Media</a>
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">About Us</a>
//             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800">Contact Us</a>
//             <div className="flex justify-around py-3">
//               <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//               <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//               <Search className="text-gray-600 hover:text-gray-800 cursor-pointer" />
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Heart, ShoppingCart, Search } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
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

const predefinedCategories = [
  { id: 1, name: 'Bedroom', subcategories: [{ id: 1, name: 'Wardrobe' }, { id: 2, name: 'Bed-side Table' }, { id: 3, name: 'Bed' }, { id: 4, name: 'Dresser' }, { id: 5, name: 'Mattress' }] },
  { id: 2, name: 'Living Room', subcategories: [{ id: 6, name: 'Sofa' }, { id: 7, name: 'Sofa-cum-bed' }, { id: 8, name: 'Multi-utility Cabinet' }, { id: 9, name: 'Center Table' }, { id: 10, name: 'Bookshelf' }] },
  { id: 3, name: 'Dining', subcategories: [{ id: 11, name: 'Kitchen Cabinet' }, { id: 12, name: 'Dining Table' }] },
  { id: 4, name: 'Office', subcategories: [{ id: 13, name: 'Office Table' }, { id: 14, name: 'Office Chair' }, { id: 15, name: 'Study Table' }, { id: 16, name: 'Bookshelf' }, { id: 17, name: 'Filing Cabinet' }] },
];

const Navbar = () => {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a href='#'>Product Categories  <ArrowDown /></a>
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
        <Link href={'/admin'}>
          <Button>DashBoard</Button>
        </Link>
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
