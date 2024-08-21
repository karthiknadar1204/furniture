import React from 'react';

const ExtraImages = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around p-4">
      <div className="w-full md:w-1/3 p-2">
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/7Bbev7V6lj4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full md:w-1/3 p-2">
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/mjPtSgfk-hY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full md:w-1/3 p-2">
        <iframe
          width="100%"
          height="200"
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
