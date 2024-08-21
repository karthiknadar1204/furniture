// import React from 'react';
// import Image from 'next/image';
// import { MoveRight } from 'lucide-react';

// const ImageGallery = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div key={index} className="relative overflow-hidden group">
//             <Image
//               src="/Sofa.jpg"
//               alt={`Sofa ${index + 1}`}
//               width={650}
//               height={750}
//               className="transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
//             />
//             <div className="absolute top-0 left-0 p-6 text-white text-2xl font-bold">
//               <div>Living Room <br /> Furniture</div>
//               <div className="flex items-center mt-2 text-red-700">
//                 Shop Now
//                 <MoveRight className="text-red-700 ml-2" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;












import React from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';

const ImageGallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="relative overflow-hidden group">
            <Image
              src={`/bedroom_${index + 1}.jpeg`}
              alt={`Bedroom ${index + 1}`}
              width={650}
              height={750}
              className="transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
            <div className="absolute top-0 left-0 p-6 text-white text-2xl font-bold">
              <div>Bedroom Furniture</div>
              <div className="flex items-center mt-2 text-red-700">
                Shop Now
                <MoveRight className="text-red-700 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
