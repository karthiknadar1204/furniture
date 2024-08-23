// import React from 'react';

// const ExtraImages = () => {
//   return (
//     <div className="flex flex-col p-2 sm:p-4">
//       <div className="w-full mb-4 sm:mb-6">
//         <iframe
//           width="100%"
//           height="300"
//           src="https://www.youtube.com/embed/7Bbev7V6lj4"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="w-full mb-4 sm:mb-6">
//         <iframe
//           width="100%"
//           height="300"
//           src="https://www.youtube.com/embed/mjPtSgfk-hY"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="w-full">
//         <iframe
//           width="100%"
//           height="300"
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
      <div className="w-full mb-4 sm:mb-6 relative">
        <iframe
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
          height="300"
          src="https://www.youtube.com/embed/7Bbev7V6lj4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full mb-4 sm:mb-6 relative">
        <iframe
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
          height="300"
          src="https://www.youtube.com/embed/mjPtSgfk-hY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full relative">
        <iframe
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
          height="300"
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
