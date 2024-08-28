// import React from 'react';

// const ExtraImages = () => {
//   return (
//     <div className="flex flex-col p-2 sm:p-4 overflow-x-hidden">
//       <div className="w-full mb-4 sm:mb-6 relative">
//         <iframe
//           className="w-[calc(100%+20px)] sm:w-full h-48 sm:h-72 mx-auto block"
//           src="https://www.youtube.com/embed/7Bbev7V6lj4"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="w-full mb-4 sm:mb-6 relative">
//         <iframe
//           className="w-[calc(100%+20px)] sm:w-full h-48 sm:h-72 mx-auto block"
//           src="https://www.youtube.com/embed/mjPtSgfk-hY"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="w-full relative">
//         <iframe
//           className="w-[calc(100%+20px)] sm:w-full h-48 sm:h-72 mx-auto block"
//           src="https://www.youtube.com/embed/7Bbev7V6lj4"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default ExtraImages;

import React from 'react';

const ExtraImages = () => {
  return (
    <div className="flex flex-col p-2 sm:p-4 overflow-x-hidden">
      <div className="w-full mb-4 sm:mb-6 relative w-custom-container">
        <iframe
          className="w-[calc(100%+50px)] sm:w-full h-48 sm:h-72 mx-auto block w-custom"
          src="https://www.youtube.com/embed/7Bbev7V6lj4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full mb-4 sm:mb-6 relative w-custom-container">
        <iframe
          className="w-[calc(100%+50px)] sm:w-full h-48 sm:h-72 mx-auto block w-custom"
          src="https://www.youtube.com/embed/mjPtSgfk-hY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full relative w-custom-container">
        <iframe
          className="w-[calc(100%+50px)] sm:w-full h-48 sm:h-72 mx-auto block w-custom"
          src="https://www.youtube.com/embed/7Bbev7V6lj4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ExtraImages;
